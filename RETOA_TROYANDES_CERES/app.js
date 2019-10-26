/* eslint-disable no-undef,no-unused-vars */
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const followingRouter = require("./routes/following");
const authRouter = require('./routes/auth');
const financialRouter = require("./routes/financial");
const analyticsRouter = require("./routes/analytics");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));
app.use(cors({ origin: "http://localhost:3000" }));

// Routes
app.use("/api", indexRouter);
app.use("/api/following", followingRouter);
app.use('/api/auth', authRouter);
app.use("/api/financial", financialRouter);
app.use('/api/analytics', analyticsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
