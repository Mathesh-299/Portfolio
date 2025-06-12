const express = require("express");
const router = express.Router();
const { addproject, getprojects, editProject, deleteProject } = require("../controller/projectController");

router.post('/addproject', addproject);
router.get("/all", getprojects);
router.put("/editproject/:id", editProject);
router.delete("/delete/:id", deleteProject);
module.exports = router;