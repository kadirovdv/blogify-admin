const express = require("express");
const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");
const blogPostController = require("../controllers/blog.post.controller");
const hpp = require("hpp");

const router = express.Router();

router.get("/", blogPostController.getAllBlogPosts);

router.post("/create", blogPostController.createBlogPost)

module.exports = router;