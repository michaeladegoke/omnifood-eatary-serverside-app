require("dotenv").config();

const PORT = process.env.PORT
const db = process.env.DB_URI;
const SERVICE = process.env.SERVICE
const USER = process.env.USER
const PASSMAILER = process.env.PASSMAILER

module.exports = {
    PORT,
    db,
    SERVICE,
    USER,
    PASSMAILER
}


