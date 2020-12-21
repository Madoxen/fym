//Fymate main api server
//Only serves info and API data
//Does not serve any website components

import express from 'express';
import createError from 'http-errors';
import path from 'path'
import logger from 'morgan'

import usersRouter from './routes/users'
import indexRouter from './routes/index'
import { Request, Response, NextFunction } from 'express';


const PORT = process.env.PORT || 3000;
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler middleware
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(500)
  res.render('error', { error: err })
});


app.listen(PORT);
export default app;
