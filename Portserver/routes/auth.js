const express = require("express");
const { authentication } = require("../controller/security");
const route = express.Router();

route.post("/adminLogin", authentication);


module.exports = route;