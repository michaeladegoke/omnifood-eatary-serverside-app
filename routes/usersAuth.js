const express = require("express");
const usersAuth = require("../controllers/userAuthController")
//const { mailAuthentication } = require("../validations/mailvalidation");

const router = express.Router();


router.post("/signup", /*mailAuthentication,*/ usersAuth.signUp);
router.post("/signin", usersAuth.signIn);


module.exports = router;
