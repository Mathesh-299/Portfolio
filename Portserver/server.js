const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const DB = require("./config/DB");
const port = process.env.PORT || 9000

DB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at ${port}`);
        })
    })
    .catch(()=>{
        console.log("Something wrong....");
    })