const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        require: true
    },
    projectDes: {
        type: String,
        require: true
    },
    projectLink: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Project", projectSchema);