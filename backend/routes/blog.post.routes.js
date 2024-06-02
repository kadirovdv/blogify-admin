const express = require("express");
const authController = require("../controllers/auth.controller");
const adminController = require("../controllers/admin.controller");
const blogPostController = require("../controllers/blog.post.controller");
const hpp = require("hpp");

const router = express.Router();

router.get("/", authController.protect, blogPostController.getAllBlogPosts);

router.post("/create", blogPostController.createBlogPost);

router.delete(
  "/:id",
  authController.protect,
  blogPostController.deleteBlogPost
);

module.exports = router;
