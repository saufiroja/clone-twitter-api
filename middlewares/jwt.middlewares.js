require('dotenv').config();
const jwt = require('jsonwebtoken');

const { readFileSync } = require('fs');
const { JWT_PUBLIC_KEY, JWT_ALGORITHMS } = process.env;

const veirfyUser = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  try {
    const secret = readFileSync(JWT_PUBLIC_KEY, { encoding: 'utf-8' });
    const result = jwt.verify(token, secret, { algorithms: JWT_ALGORITHMS });
    req.user = result;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'unauthorized',
      code: 401,
      error,
    });
  }
};

module.exports = { veirfyUser };
