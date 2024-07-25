const { getposts, getpost, addpost, deletepost, updatepost }=require('../controllers/post')
const express=require('express');
const router=express.Router();
router.get("/",getposts)
router.get("/:id",getpost)
router.post("/",addpost)
router.delete("/:id",deletepost)
router.put("/:id",updatepost)

module.exports=router;