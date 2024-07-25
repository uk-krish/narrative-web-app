const jwt = require("jsonwebtoken");
const db = require("../config/db.js")
const con = db();

exports.getposts = (req, res) => {
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=? ORDER BY id DESC"  : "SELECT * FROM posts ORDER BY id DESC"
    con.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data);
    })
}
exports.getpost = (req, res) => {
    const q = "SELECT p.id AS pid, u.username, p.title, p.desc, p.img AS postimg,u.img AS uimg, u.id AS uid, p.cat, p.date FROM user u JOIN posts p ON u.id = p.uid WHERE p.id = ?"
    con.query(q, [req.params.id], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err);

        }
        return res.status(200).json(data);
    })
}
exports.addpost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not Authenticated!")
    jwt.verify(token, "jwt_secret_key", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        console.log("TOken is Vaild");
        const q = "INSERT INTO posts(title, `desc`, img, cat, date, uid) VALUES(?)";
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id
        ];
        con.query(q, [values], (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err)
            };
            return res.json("Post has been Created")
        })
    })
}
exports.deletepost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not Authenticated!")
    jwt.verify(token, "jwt_secret_key", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE id=? AND uid=?";
        con.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json(err);
            return res.json("Post has been deleted!")
        })
    })
}
exports.updatepost = (req, res) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(401).json("Not Authenticated!")
    jwt.verify(token, "jwt_secret_key", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const postid = req.params.id;
        const q = "UPDATE  posts SET title=?, `desc`=?, img=?, cat=? WHERE id=? AND  uid=?"
        const values = [req.body.title, req.body.desc, req.body.img, req.body.cat]
        con.query(q, [...values, postid, userInfo.id], (err, data) => {
            if (err) { console.log(err); return res.status(500).json(err) };
            return res.json("Post has been Updated")
        })
    })
}