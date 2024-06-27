require("dotenv").config();

const PORT = process.env.PORT
const db = process.env.DB_URI;
const SERVICE = process.env.SERVICE
const USER = process.env.USER
const PASSMAILER = process.env.PASSMAILER
const JWT = process.env.JWT
const VERSION = process.env.SERVICE

module.exports = {
    PORT,
    db,
    SERVICE,
    USER,
    PASSMAILER,
    JWT,
    VERSION
}


