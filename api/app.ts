//Fymate main api server
//Only serves info and API data
//Does not serve any website components

import express from 'express';
import createError from 'http-errors';
import path from 'path'
import logger from 'morgan'
import authRouter from './routes/auth'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import { Request, Response, NextFunction } from 'express';
import db from './db';
<<<<<<< HEAD

const PORT = process.env.PORT || 3000;
=======
import dotenv from 'dotenv'

if (process.env.NO_ENV === undefined || process.env.NO_ENV === null) {
  console.log("NO_ENV null or undefined, trying to load .env.local");
  const r = dotenv.config({ path: "./.env.local" });

  if (process.env.NODE_ENV !== "production") {
    if (r.error) {
      throw r.error
    }

    console.log(r.parsed)
  }
}

const PORT = process.env.PORT || 10010;
>>>>>>> master
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/auth', authRouter);
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
