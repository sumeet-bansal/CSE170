var data = require('../data.json');

var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

exports.view = function(req, res) {
	res.render('results', data);
};

exports.generatePlan = function(req, res) {
	prefs = req.query;
	var db = new sqlite3.Database('./test.db', function() {
		db.serialize(function() {
			var dietary = ' dietary LIKE "%' + prefs.dietary + '%"';
			var location = ' AND location LIKE "%' + prefs.location + '%"';
			var num = prefs.meals;
			var min = prefs.min;
			var max = prefs.max;
			var price = prefs.price;
			var calories = ' AND calories > ' + min/num + ' AND calories < ' + max/num;
			sql = 'SELECT * FROM items WHERE' + dietary + location + calories;// + ' ORDER BY NEWID()';//' LIMIT ' + num;
			console.log(sql);
			var meals = [], sum = 0, budget = 0;
			db.each(sql, function(err, row) {
				sum += row.calories;
				budget += row.price;
				delete row.dietary;
				meals.push(row);
			}, function() {
				data = {
					"sum" : sum,
					"budget" : budget,
					"meals" : meals
				}
				console.log(data);
				res.render('results', data);
			});
		});
	});
	db.close();
}