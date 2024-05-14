const BlogPost = require("../models/blog.post.model");
const appAsyncHandler = require("../utils/app.async.handler");
const ErrorMessage = require("../utils/error.handler");

exports.getAllBlogPosts = appAsyncHandler(async (request, response, next) => {
  const blogPosts = await BlogPost.find({})

  response.status(200).json({
    success: true,
    count: blogPosts.length,
    blogPosts,
  });
});

exports.createBlogPost = appAsyncHandler(async (request, response, next) => {
  const blogPost = await BlogPost.create({
    ...request.body,
    // author: request.admin._id,
  });

  response.json(200).json({
    success: true,
    blogPost,
  });
});
