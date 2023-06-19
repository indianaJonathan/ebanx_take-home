module.exports = {
    async index (req, res) {
        return res.status(200).json({
            message: "Success"
        });
    },
    async create (req, res) {
        const { name } = req.body;
        if (name) return res.status(201).json({
            message: `${name} posted`
        });
        return res.status(400).json({
            message: "The body must have a NAME tag"
        });
    }
}