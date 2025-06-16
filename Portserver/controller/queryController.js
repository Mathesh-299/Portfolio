const Queries = require("../model/Query");

exports.addqueires = async (req, res) => {
    try {
        const { Name, Email, Message } = req.body;
        const query = new Queries({ Name, Email, Message });
        await query.save();
        res.status(200).json({ message: "Query Added" });
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
}

exports.getqueires = async (req, res) => {
    try {
        const response = await Queries.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: "Error" })
    }
}


exports.deleteQuery = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Queries.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.status(200).json({ message: " Delete Successfully" });
    } catch (error) {
        res.status(505).json({ message: "Error" });
    }
}