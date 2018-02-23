var sections = require('../about-sections.json');

/*
 * GET home page.
 */

exports.view = function(req, res){
	res.render('about', sections);
};