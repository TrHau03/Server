var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
require('./components/category/Model');
var indexRouter = require('./routes/index');
var usersAPIRouter = require('./routes/api/User');
var productAPIRouter = require('./routes/api/Product');
var usersCpanelRouter = require('./routes/cpanel/User');
var productCpanel = require('./routes/cpanel/Product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
mongoose.connect('mongodb://127.0.0.1:27017/Server', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));
//localhost:3000
app.use('/', indexRouter);
//localhost:3000//api/user
app.use('/api/user', usersAPIRouter);
//localhost:3000//api/product
app.use('/api/product', productAPIRouter);
//localhost:3000//cpanel/user
app.use('/cpanel/user', usersCpanelRouter);
//localhost:3000//api/product
app.use('/cpanel/product', productCpanel);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
