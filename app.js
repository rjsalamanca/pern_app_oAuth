const express = require('express'),
    es6Renderer = require('express-es6-template-engine'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    indexRouter = require('./routes/index'),
    usersRouter = require('./routes/users'),
    restaurantsRouter = require('./routes/restaurants');


    app = express();

app.engine('html', es6Renderer);
app.set('views','./views');
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantsRouter);

module.exports = app;
