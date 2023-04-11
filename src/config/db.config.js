require("dotenv").config()
module.exports = {
    dbAdmin : process.env.DB_ADMIN,
    dbPassword: process.env.DB_PASWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME
}