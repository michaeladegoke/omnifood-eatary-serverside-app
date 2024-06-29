const express = require("express");
const usersRouter = require("../routes/usersAuth");
const menuRouter = require("../routes/eateryMenu");
const orderRouter = require("../routes/orderItem");






module.exports = (app) => {
    // Set CORS headers
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );

        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, DELETE");
            return res.status(200).json({});
        }

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '100mb' }));
    
    const VERSION = "/api/v1";
    
    app.use(`${VERSION}/usersAuth`, usersRouter);
    app.use(`${VERSION}/eateryMenu`, menuRouter);
    app.use(`${VERSION}/orderItem`, orderRouter);


 // Add a route for the root URL
    app.get('/', (req, res) => {
          res.json({ status: true, message: "Welcome to Omnifood API" });
     });

    app.get('/try', (req, res, next) => {
        res.json({ status: true, message: "Welcome to Contacts API" });
    });

    // //Error handling middleware

    
};