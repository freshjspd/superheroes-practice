module.exports = {
  development: {
    username: process.env.DB_USER_DEV || 'postgres',
    password: process.env.DB_PASSWORD_DEV || 'admin',
    database: process.env.DB_NAME_DEV || 'superheroes_dev',
    host: process.env.DB_HOST_DEV || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
