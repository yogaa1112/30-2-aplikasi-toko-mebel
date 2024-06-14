const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../model/user.js');

const adminLogin = async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email, isAdmin: true });
        if (!user) {
            return res.status(400).json({ success: false, error: "Email atau password salah!" });
        }

        const passCompare = await bcrypt.compare(req.body.password, user.password);
        if (!passCompare) {
            return res.status(400).json({ success: false, error: "Email atau password salah!" });
        }

        const data = {
            user: {
                id: user.id,
                isAdmin: user.isAdmin,
            },
        };

        const token = jwt.sign(data, process.env.SECRET_USER, { expiresIn: '1h' });

        res.json({ success: true, token, url: `${process.env.CLIENT_URL}/admin`});
    } catch (error) {
        res.status(500).json({ success: false, error: "Terjadi kesalahan pada server" });
    }
};

module.exports = adminLogin;