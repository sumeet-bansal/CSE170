/*
 * GET home page.
 */

exports.view = function(req, res){
	res.render('index');
};

exports.viewAlt = function(req, res){
	res.render('indexAlt');
};