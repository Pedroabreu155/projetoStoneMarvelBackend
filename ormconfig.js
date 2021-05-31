module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5433,
  "username": "postgres",
  "password": "postgres",
  "database": "stone",
  "entities": [
    "./src/models/*ts"
  ],
  "migrations": [
    "./src/database/migrations/*ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
