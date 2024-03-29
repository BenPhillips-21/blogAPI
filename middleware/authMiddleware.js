const Comment = require ("../models/comments");
const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.admin === true) {
        next();
    } else {
        res.status(403).json({ error: "Unauthorized" });
    }
});

const isUserComment = asyncHandler(async (req, res, next) => {
    const [comment] = await Promise.all([
    Comment.findById(req.params.commentid).exec(),
  ]);

  if (comment === null) {
    res.json("This comment does not exist");
  }

  if (comment.user._id.toString() === req.user._id.toString() || req.user.admin === true) {
    next()
  } else {
    res.json("You can't do that!")
  }
})

module.exports = { isAdmin, isUserComment };
