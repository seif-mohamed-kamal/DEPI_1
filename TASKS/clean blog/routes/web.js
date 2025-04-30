const express= require('express');
const router=express.Router();
const pagecontroller=require('../app/controller/page.controller')
// ROUTES
router.get("/",pagecontroller.index)
router.get("/about",pagecontroller.about)
router.get("/contact",pagecontroller.contact)
router.get("/post",pagecontroller.post)

module.exports=router;