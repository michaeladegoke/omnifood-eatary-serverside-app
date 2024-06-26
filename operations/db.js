

const winston = require("winston");
const mongoose = require("mongoose");
require('dotenv').config();

// Configure the logger with at least one transport
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console() // Log to the console
        // You can add more transports here (e.g., file transport)
    ],
});

const db = process.env.DB_URI;
//const { db } = require("../config/config")

mongoose.set("strictQuery", false);

module.exports = function() {
  mongoose.connect(db)
    .then(() => logger.info('omnifood server Db Connected Successfully!'))
    .catch(err => logger.error('Error connecting to Omnifood Db', err));
  
  mongoose.connection.on('reconnected', () => {
    logger.info('omnifood server Db Reconnected Successfully!');
  });
};

