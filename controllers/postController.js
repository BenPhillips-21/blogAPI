const Post = require("../models/posts");
const Comment = require ("../models/comments");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find({}, "title date_published content comments user")
    .sort({ title: 1 })
    .populate("user")
    .populate("comments")
    .exec();

    return res.json(allPosts);
})

exports.post_detail = asyncHandler(async (req, res, next) => {
  const [post] = await Promise.all([
    Post.findById(req.params.id).populate("user").populate("comments").exec(),
  ]);

  if (post === null) {
    const err = new Error("post not found");
    err.status = 404;
    return next(err);
  }

  return res.json(post)
})

exports.post_create_post = [
  (req, res, next) => {
    if (req.body.comments === undefined) {
        console.log(req.body)
        next()
    } else { 
      console.log(req.body)  
      console.log(req.body.comments)
      req.body.comments =
      typeof req.body.comments === "undefined" ? [] : [req.body.comments];
      console.log(req.body.comments)
      next();
    }
  },

  asyncHandler(async (req, res, next) => {

    const post = new Post({
      user: req.body.user,  
      title: req.body.title,
      date_published: req.body.date_published,
      content: req.body.content,
      comments: req.body.comments,
    });

    await post.save();
    return res.json({ success: true, message: "Post saved!"})
  }),
];

exports.post_delete_post = asyncHandler(async (req, res, next) => {
    const [post] = await Promise.all([
    Post.findById(req.params.id).exec(),
  ]);

  if (post === null) {
    res.json("This post does not exist");
  }

    await Post.findByIdAndDelete(req.params.id);
    res.json("Post deleted :)");
})

exports.post_update_post = [
  asyncHandler(async (req, res) => {
    let updatedPost = {};
    if (req.body.title && req.body.content) {
      updatedPost = { 
        title: req.body.title,
        content: req.body.content,
      };
      await Post.findByIdAndUpdate(req.params.id, updatedPost, { new: true });
    } else if (req.body.content !== undefined && req.body.title === undefined) {
      const updateOperation = { content: req.body.content }; 
      await Post.findByIdAndUpdate(req.params.id, updateOperation, { new: true }); 
    } else if (req.body.content === undefined && req.body.title !== undefined) {
      const updateOperation = { title: req.body.title }; 
      await Post.findByIdAndUpdate(req.params.id, updateOperation, { new: true });
    }
    res.json("Post Update Successful");
  })
];