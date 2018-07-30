module.exports = {
  "development": {
    "username": null,
    "password": null,
    "database": "outline",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "outline_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_URL,
    "dialect": "postgres"
  }
}
