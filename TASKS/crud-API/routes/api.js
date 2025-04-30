const express = require("express");
const router = express.Router();
const PostController = require("../app/controllers/post-controller");

router.get("/posts", PostController.index);
router.get("/posts/:id", PostController.show);
router.post("/posts", PostController.create);
router.put("/posts/:id", PostController.update);
router.delete("/posts/:id", PostController.destroy);

module.exports = router;