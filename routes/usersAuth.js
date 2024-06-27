const express = require("express");
const usersAuth = require("../controllers/userAuthController")
const { mailAuthentication } = require("../validations/mailvalidation");
//const { otpValidation } = require("../validations/otpvalidation")

const router = express.Router();


router.post("/signup", mailAuthentication, /*otpValidation,*/ usersAuth.signUp);
router.post("/signin", usersAuth.signIn);


module.exports = router;
