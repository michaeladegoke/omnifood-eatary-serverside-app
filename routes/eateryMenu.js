const express = require("express");
const eaterymenu = require("../controllers/eateryMenuController");

const router = express.Router();

router.post("/addmenu", eaterymenu.addMenuDishes);
router.get("/getmenu", eaterymenu.getMenuDishes);

module.exports = router;
