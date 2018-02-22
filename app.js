
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var hbs = handlebars.create({
	helpers: {
		inc: function(value) { return parseInt(value) + 1; }
	}
});

// example route: var user = require('./routes/user');
var index = require('./routes/index');
var help = require('./routes/help');
var about = require('./routes/about');
var login = require('./routes/login');
var results = require('./routes/results');
var error = require('./routes/error');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);

// Example route
// app.get('/users', user.list);
app.get('/about', about.view);
app.get('/help', help.view);
app.get('/login', login.view);
app.get('/results', results.view);
app.get('/submit', results.generatePlan);
app.get('/error', error.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
