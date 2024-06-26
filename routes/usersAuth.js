const express = require("express");
const usersAuth = require("../controllers/userAuthController")

const router = express.Router();


router.post("/signup", usersAuth.signUp);


module.exports = router;
