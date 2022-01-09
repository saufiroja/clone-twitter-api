require('dotenv').config();
const jwt = require('jsonwebtoken');
const { addDays } = require('date-fns');
const { randomBytes } = require('crypto');
const { RefreshToken } = require('../database/models');
const { readFileSync } = require('fs');

const { JWT_PUBLIC_KEY, JWT_EXPIRES_IN } = process.env;

const genereteAccessToken = (user) => {
  const payload = { id: user.id, isAdmin: user.isAdmin };
  const secret = readFileSync(JWT_PUBLIC_KEY, { encoding: 'utf-8' });

  const token = jwt.sign(payload, secret, {
    expiresIn: parseInt(JWT_EXPIRES_IN),
  });
  return token;
};

const generateRefreshToken = async (userId) => {
  const token = `${userId}.${randomBytes(40).toString('hex')}`;

  return await RefreshToken.create({
    refreshToken: token,
    userId,
    expiredAt: addDays(new Date(), 7),
  });
};

module.exports = { generateRefreshToken, genereteAccessToken };
