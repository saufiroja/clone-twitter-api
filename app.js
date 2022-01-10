require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// IMPORT ROUTERS
const authRouter = require('./routers/auth.routers');
const userRouter = require('./routers/user.routers');
const tweetRouter = require('./routers/tweet.routers');

// DATABASE CONNECTION
require('./database/models/sequelize');

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ROUTER
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', tweetRouter);

// ERROR HANDLING
app.use((err, req, res, next) => {
  const { message, code = 500, error = 'internal server error' } = err;
  return res.status(code).json({
    message,
    code,
    error,
  });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`connect on port ${PORT}`);
});
