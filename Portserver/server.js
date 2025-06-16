const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const DB = require("./config/DB");
const port = process.env.PORT || 9000
const route = require("./routes/project")
DB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at ${port}`);
        })
    })
    .catch(() => {
        console.log("Something wrong....");
    });

app.use('/api/project', require('./routes/project'));
app.use("/api/query", require("./routes/query"));
app.use("/api/auth", require("./routes/auth"));