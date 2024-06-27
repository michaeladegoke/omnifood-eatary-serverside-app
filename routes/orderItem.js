const express = require("express");
const orderRouter = require("../controllers/orderItemController");


const router = express.Router();


router.get("/getorder", orderRouter.getorderItem);

module.exports = router;