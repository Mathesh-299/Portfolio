const jwttoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Project = require("../model/Project");
exports.addproject = async (req, res) => {
    try {
        const { projectName, projectDes, projectLink } = req.body;
        const response = Project.findOne(projectName);
        if (!response) {
            return res.status(400).json({ message: "Project Exists" });
        }

        const project = new Project({ projectName, projectDes, projectLink });
        await project.save();

        res.status(200).json({ message: "Project Saved" });
    } catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
}

exports.getprojects = async (req, res) => {
    try {
        const response = await Project.find();
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ message: "Fetching Error" });
    }
    // try {
    //     const cacheProjects = await redisClient.get("projects");
    //     if (cacheProjects) {
    //         return res.status(200).json(JSON.parse(cacheProjects));
    //     } else {
    //         const projects = await Project.find();
    //         await redisClient.set("projects", JSON.stringify(projects), {
    //             EX: 3600,
    //             NX: true
    //         });
    //         console.log(projects);
    //         return res.status(200).json(projects);
    //     }
    // }
    // catch (error) {
    //     res.status(500).json({ message: "Fetching Error" });
    // }
}


exports.editProject = async (req, res) => {
    const { projectName, projectDes, projectLink } = req.body;
    const projectId = req.params.id;
    try {
        const projectEdit = await Project.findById(projectId);
        if (!projectEdit) return res.status(400).json({ message: "Project not exist" });
        projectEdit.projectDes = projectDes || projectEdit.projectDes;
        projectEdit.projectName = projectName || projectEdit.projectName;
        projectEdit.projectLink = projectLink || projectEdit.projectLink;
        await projectEdit.save();
        res.status(200).json({ message: "Updated Successfully!" })
    } catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
}

exports.deleteProject = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Project.findByIdAndDelete(id);
        if (!response) return res.status(400).json({ message: "Project not exists" });
        res.status(200).json({ message: "Project deleted Successfully" });
    }
    catch (e) {
        res.status(500).json({ message: "Server Error" });
    }
}