var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入中间件
var {checkAPP}=require('./util/middleware');
// var {checkAdmin}=require('./util/middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//增加管理员路由
// var adminRouter=require('./routes/admin');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//使用中间件
app.use('/', checkAPP,indexRouter);
app.use('/users', checkAPP,usersRouter);
//使用admin中间件
// app.use('/admin',[checkAPP,checkAdmin],adminRouter);
module.exports = app;
