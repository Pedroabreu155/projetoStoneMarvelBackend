module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  "entities": [
    process.env.ENTITIES_PATH
  ],
  "migrations": [
    process.env.MIGRATIONS_PATH
  ],
  "cli": {
    "migrationsDir": [
      "./src/database/migrations"
    ]
  }
}
