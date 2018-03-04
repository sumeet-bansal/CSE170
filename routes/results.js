var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

exports.view = function(req, res) {
	res.render('results', data);
};

exports.generatePlan = function(req, res) {
	prefs = req.query;
	console.log(prefs);
	var db = new sqlite3.Database('./data.db', function() {
		db.serialize(function() {
			var dietary = ' dietary LIKE "%' + prefs.dietary + '%"';
			var location = ' AND college IN (\'' + prefs.location[0] + '\'';
			for (var i = 1; i < prefs.location.length; i++) {
				location += ', \'' + prefs.location[i] + '\''
			}
			location += ')';
			var num = prefs.meals;
			var min = prefs.min;
			var max = prefs.max;
			var price = prefs.price;
			var calories = ' AND calories > ' + min/num + ' AND calories < ' + max/num;
			var random = ' AND _ROWID_ >= (abs(random()) % (SELECT max(_ROWID_) FROM items))';
			var limit = ' LIMIT ' + num;
			sql = 'SELECT * FROM items WHERE' + dietary + location + calories + random + limit;
			console.log(sql);
			var meals = [], sum = 0, budget = 0;
			db.each(sql, function(err, row) {
				console.log(row);
				sum += row.calories;
				budget += row.price;
				row.price = row.price.toFixed(2);
				delete row.dietary;
				delete row.college;
				row.maplink = getMapLink(row.dining_hall);
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

function getMapLink(loc) {
	switch(loc) {
		case 'Foodworx':
			return 'https://goo.gl/maps/pWcSXinwTCQ2';
		case 'Earl\'s':
			return 'https://goo.gl/maps/mfnC7jZGv892';
		case '64 Degrees':
			return 'https://goo.gl/maps/mj7jS2dPE7t';
		case 'Pines':
			return 'https://goo.gl/maps/CK7ycn3qKwG2';
		case 'Cafe Ventanas':
			return 'https://goo.gl/maps/BWL5Bp1J1xo';
		case 'Oceanview':
			return 'https://goo.gl/maps/fm1A8ZhY9L52';
		case 'Roots':
			return 'https://goo.gl/maps/ABDsXoWZj7r';
		case 'Goody\'s':
			return 'https://goo.gl/maps/FiEDAfieYpm';
	}
}