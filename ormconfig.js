if(process.env.APP_ENV == 'dev'){
  module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
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
}else{
  module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,"ssl": true,
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
}
