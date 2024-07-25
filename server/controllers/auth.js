const db = require("../config/db.js")
const con = db();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signin = (req, res) => {
    try {
        const q = "SELECT * FROM user WHERE username=?"
        con.query(q, [req.body.username], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) return res.status(404).json("User not found");
            // Password check
            const ispassword = bcrypt.compareSync(req.body.password, data[0].password);
            if (!ispassword) return res.status(400).json("username or password is incorrect!");
            const token = jwt.sign({ id: data[0].id }, "jwt_secret_key")
            const { password, ...others } = data[0]
            res.cookie("access_token", token, {
                httpOnly: false,
                path: '/', 
                sameSite: 'Lax', 
                secure: false,
                httpOnly: false
            }).status(200).json(others)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json("An internal error occurred");
    }
}
exports.signup = (req, res) => {
    // Check exiting user
    try {
        const q = "SELECT * FROM user WHERE email = ? OR username = ?";

        con.query(q, [req.body.email, req.body.username], (err, data) => {
            if (err) return res.status(500).json(err); // Handle query error
            if (data.length) return res.status(409).json("User already exists!");

            // Hash the password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const insertQuery = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
            const values = [req.body.username, req.body.email, hash];

            con.query(insertQuery, values, (err, data) => {
                if (err) return res.status(500).json(err); // Handle query error
                return res.status(201).json("User has been created!");
            });
        });
    } catch (error) {
        return res.status(500).json("An internal error occurred");
    }


}
exports.logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false,
        path: '/'
    });
    return res.status(200).json("User has been logged out");
}

exports.vertify=(req,res)=>{
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json(false)
    return res.status(200).json(true)
}