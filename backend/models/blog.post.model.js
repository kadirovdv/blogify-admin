const mongoose = require("mongoose");

const contentItemSchema = new mongoose.Schema({
  image: { type: [String], required: true },
  headline: { type: String, required: true },
  body: { type: String, required: true },
  link: { type: String },
  quote: { type: String },
  warning: { type: String },
  code: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: [contentItemSchema],
      required: true,
    },
    // author: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Admin",
    //   required: true,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;
