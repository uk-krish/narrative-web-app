const express = require('express');
const env = require('dotenv')
const app = express();
const cors = require('cors')
const cookieparser = require('cookie-parser')
const multer = require('multer')
env.config();


app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}))
app.use(express.json());
app.use(cookieparser())
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/upload')
    },
    filename: (req, file, cb) => {
        const oname = file.originalname.replace(/\s+/g, '')
        cb(null, Date.now() + oname)
    }
})

const upload = multer({ storage })
// const upload=multer({dest:'./uploads/'})

app.post('/upload', upload.single('file'), (req, res, next) => {
    const file = req.file;
    res.status(200).json(file.filename)
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/users'))
app.use('/api/post', require('./routes/posts'))




app.listen(process.env.PORT, () => {
    console.log(`Server as started ${process.env.PORT}`);
})
