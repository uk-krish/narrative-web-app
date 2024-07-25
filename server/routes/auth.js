const { logout, signin, signup, vertify } = require('../controllers/auth');

const express=require('express');
const router=express.Router();

router.post("/signup",signup)
router.post("/signin",signin)
router.get('/logout',logout)
router.get('/verify',vertify)



module.exports=router;