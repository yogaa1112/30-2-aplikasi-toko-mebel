const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('../model/user.js');

const adminSignup = async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "Email sudah dipakai!" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const admin = new Users({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: true, // Menentukan pengguna sebagai admin
        });

        await admin.save();

        const data = {
            user: {
                id: admin.id,
                isAdmin: admin.isAdmin,
            },
        };

        const token = jwt.sign(data, process.env.SECRET_USER, { expiresIn: '1h' });

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: "Terjadi kesalahan pada server" });
    }
};

module.exports = adminSignup;
