// Archivo de configuración del servidor

// Llamamos a las librerías
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

// Configuraciones de Express
// La app correrá en el puerto 3000
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({ secret: 'esto es secreto'}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Passport
require('./config/passport')(passport);

// Routes
require('./config/routes')(app, passport);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('The magic happens on port ' + app.get('port'));
});