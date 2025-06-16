exports.authentication = async (req, res) => {
    const { email, password } = req.body;
    let role = 'user';

    try {
        if (email !== "matheshm2909@gmail.com" || password !== "Admin@123") {
            return res.status(400).json({ message: "Access detained" });
        }

        role = "admin";
        return res.status(200).json({ role, message: "Successfully loggedIn" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Error" });
    }
};
