var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var expressJwt = require('express-jwt');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var session = require('express-session'); 
var config=require('./config.json');


//var validator = require('express-validator');


var index = require('./routes/index');                  //for practice
var register = require('./routes/register');            //for practice
var home = require('./routes/home');
var userService = require( './routes/userService');     //for practice

var userControler= require('./routes/userControler');   //for practice


var empService= require('./routes/empService');   //This handle actual insert and find operations
var empServiceMlab= require('./routes/empService-mlab');   //This handle actual insert and find operations for  M-lab
var empControler= require('./routes/empControler');   // Emp Controller to get data into db service
var sendJSON= require('./routes/sendJSON');   //for sending json files.

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

/*app.use('/', function (req, res) {
    return res.redirect('/app');
});*/

app.use('/index', index);

app.use('/register', register);
app.use('/', home);
app.use('/jsonfiles', sendJSON);



app.use('/api/emps', empControler);     // Route to empController




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
