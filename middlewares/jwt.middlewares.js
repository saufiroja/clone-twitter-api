require('dotenv').config();
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const { readFileSync } = require('fs');
const { JWT_PUBLIC_KEY, JWT_ALGORITHMS } = process.env;

const veirfyUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];

  if (!token) {
    return next(createError(401, 'unauthorized'));
  }

  try {
    const secret = readFileSync(JWT_PUBLIC_KEY, { encoding: 'utf-8' });
    const result = jwt.verify(token, secret, { algorithms: JWT_ALGORITHMS });
    req.user = result;
  } catch (error) {
    return res.status(401).json({
      message: 'invalid token',
      code: 401,
      error,
    });
  }
  return next();
};

module.exports = { veirfyUser };
