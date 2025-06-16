const express = require("express");
const { addqueires, getqueires, deleteQuery } = require("../controller/queryController");
const route = express.Router();

route.post("/addQueries", addqueires)
route.get("/getQueries", getqueires);
route.delete("/deleteQueries/:id", deleteQuery);
module.exports = route