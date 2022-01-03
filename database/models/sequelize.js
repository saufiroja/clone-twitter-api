const { Sequelize } = require('sequelize');

const { DB_NAME, DB_PORT, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  port: parseInt(DB_PORT, 10),
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
  timezone: '+08:00',
});

sequelize.authenticate().then(() => {
  console.log('connect on database');
});

module.exports = { sequelize };
