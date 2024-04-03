const Comment = require ("../models/comments");
const Post = require ("../models/posts");
const User = require("../models/user");

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.post_create_comment = [
    asyncHandler(async (req, res, next) => {
    let date = Date.now()
    const comment = new Comment({
      user: req.user._id, 
      post: req.params.postid,
      date_published: date,
      content: req.body.content,
    });

    await comment.save();

    Post.findByIdAndUpdate(
    req.params.postid,
    { $push: { comments: comment } }, 
    { new: true }
  )
  .then(updatedDocument => {
  if (updatedDocument) {
    console.log('Updated document:', updatedDocument);
  } else {
    console.log('No document found with the specified ID.');
  }
})
    return res.json({ success: true, message: "comment saved!"})
  }),
];

exports.comment_delete = asyncHandler(async (req, res, next) => {
    const [comment] = await Promise.all([
    Comment.findById(req.params.commentid).exec(),
  ]);

  if (comment === null) {
    res.json("This comment does not exist");
  }

    await Comment.findByIdAndDelete(req.params.commentid);
    res.json("Comment deleted :)");
})