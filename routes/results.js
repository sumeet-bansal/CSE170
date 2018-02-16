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
				row.location = getDiningHall(prefs.location);
				row.maplink = getMapLink(prefs.location);
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

function getDiningHall(loc) {
	switch(loc) {
		case 'Sixth':
			return 'Foodworx';
		case 'Warren':
			return 'Earl\'s';
		case 'Revelle':
			return '64 Degrees';
		case 'Muir':
			return 'Pines';
		case 'Marshall':
			return 'Goody\'s';
		case 'ERC':
			return 'Cafe Ventanas';
	}
}

function getMapLink(loc) {
	switch(loc) {
		case 'Sixth':
			return 'https://goo.gl/maps/pWcSXinwTCQ2';
		case 'Warren':
			return 'https://goo.gl/maps/mfnC7jZGv892';
		case 'Revelle':
			return 'https://goo.gl/maps/mj7jS2dPE7t';
		case 'Muir':
			return 'https://goo.gl/maps/CK7ycn3qKwG2';
		case 'Marshall':
			return 'https://goo.gl/maps/FiEDAfieYpm';
		case 'ERC':
			return 'https://goo.gl/maps/BWL5Bp1J1xo';
	}
}