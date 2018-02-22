var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

exports.view = function(req, res) {
	res.render('results', data);
};

exports.generatePlan = function(req, res) {
	prefs = req.query;
	var db = new sqlite3.Database('./data.db', function() {
		db.serialize(function() {
			var dietary = ' dietary LIKE "%' + prefs.dietary + '%"';
			var location = ' AND location LIKE "%' + prefs.location + '%"';
			var num = prefs.meals;
			var min = prefs.min;
			var max = prefs.max;
			var price = prefs.price;
			var calories = ' AND calories > ' + min/num + ' AND calories < ' + max/num;
			var sorted = ' ORDER BY calories DESC LIMIT ' + num;
			sql = 'SELECT * FROM items WHERE' + dietary + location + calories + sorted;
			console.log(sql);
			var meals = [], sum = 0, budget = 0;
			db.each(sql, function(err, row) {
				console.log(row);
				sum += row.calories;
				budget += row.price;
				row.price = row.price.toFixed(2);
				delete row.dietary;
				row.maplink = getMapLink(row.location);
				row.location = getDiningHall(row.location);
				meals.push(row);
			}, function() {
				if (meals.length >= num) {
					data = {
						"sum" : sum,
						"budget" : budget.toFixed(2),
						"meals" : meals,
						"prefs" : prefs
					}
					console.log(data);
					res.render('results', data);
				} else {
					console.log("Unable to construct meal plan within given parameters:");
					console.log(prefs);
					res.render('error');
				}
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