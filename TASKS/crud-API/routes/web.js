const express = require('express')
const router = express.Router()
const PageController = require('../app/controllers/page.controller')
const PostController = require('../app/controllers/post.controller')

router.get('/' , PostController.index)

router.get('/create' , PostController.create)
router.post('/store' , PostController.store)

router.get("/post/:id" , PostController.show);

router.get('/post/edit/:id' , PostController.edit);
router.post('/post/update/:id' , PostController.update);

router.get('/post/delete/:id' , PostController.destroy)

router.get('/contact' , PageController.contact)

module.exports = router;