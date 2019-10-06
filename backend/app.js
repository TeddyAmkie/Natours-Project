const express = require('express');
const app = express();

app.use(express.json());

// Routes

const userRoutes = require("./routes/users")
const reviewRoutes = require("./routes/reviews")
const tourRoutes = require("./routes/tours")
const bookingRoutes = require("./routes/booking")
const viewRoutes = require("./routes/view")

app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);
app.use('/tours', tourRoutes);
app.use('/booking', bookingRoutes);
app.use('/view', viewRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.error(err.stack);

  return res.json({
    status: err.status,
    message: err.message
  });
});


module.exports = app;