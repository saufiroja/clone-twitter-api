const { Sequelize } = require('sequelize');

const { DB_NAME, DB_PORT, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  port: parseInt(DB_PORT, 10),
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
  timezone: '+08:00',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 100,
    min: 0,
    idle: 200000,
    acquire: 1000000,
  },
});

sequelize.sync({ force: true }).then(() => {
  console.log('connect on database');
});

module.exports = { sequelize };
