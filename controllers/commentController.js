const Comment = require ("../models/comments");
const Post = require ("../models/posts");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res) => {
  return res.json("Bello")
})

exports.post_create_comment = [
    asyncHandler(async (req, res, next) => {

    const comment = new Comment({
      user: req.body.user,  
      post: req.body.post,
      date_published: req.body.date_published,
      content: req.body.content,
    });

    await comment.save();

    Post.findByIdAndUpdate(
    req.body.post,
    { $push: { comments: comment } }, // Use $push to add newValue to the array
    { new: true }
  )
  .then(updatedDocument => {
  if (updatedDocument) {
    console.log('Updated document:', updatedDocument);
    // Do something with the updated document
  } else {
    console.log('No document found with the specified ID.');
  }
})
    return res.json({ success: true, message: "comment saved!"})
  }),
];

exports.comment_delete = asyncHandler(async (req, res, next) => {
    const [comment] = await Promise.all([
    Comment.findById(req.params.id).exec(),
  ]);

  if (comment === null) {
    res.json("This comment does not exist");
  }

    await Comment.findByIdAndDelete(req.params.id);
    res.json("Comment deleted :)");
})

    // const updateOperation = {
    // $pull: { comments: req.params.id }
    // };
    // await Post.findOneAndUpdate({ _id: req.params.id }, updateOperation, { new: true })