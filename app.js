const express = require("express");
require("dotenv").config();

const app = express();

const { notFound, errorHandler, asyncHandler } = require("./middlewares/errorhandlers");


const { PORT } = require("./config/config");


require("./operations/routes")(app);
require("./operations/db")(app);




app.use(notFound);
app.use(errorHandler);
app.use(asyncHandler);


app.listen(PORT, () => {
    console.log("monifood Server is running on port : " + PORT);
});








