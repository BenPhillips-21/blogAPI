const Comment = require ("../models/comments");
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
      
      date_published: req.body.date_published,
      content: req.body.content,
    });

    await comment.save();
    return res.json({ success: true, message: "comment saved!"})
  }),
];