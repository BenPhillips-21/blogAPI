const Comment = require ("../models/comments");
const Post = require ("../models/posts");

const asyncHandler = require("express-async-handler");

exports.post_create_comment = [
    asyncHandler(async (req, res, next) => {
    let date = Date.now()
    let likeCount = 0
    let likes = []
    const comment = new Comment({
      user: req.user._id, 
      post: req.params.postid,
      date_published: date,
      content: req.body.content,
      likeCount: likeCount,
      likes: likes
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

exports.like_comment = asyncHandler(async (req, res, next) => {
  try {
    let commentToLike = await Comment.find({
      _id: req.params.commentid
    },
    {
      likeCount: 1,
      likes: {
        $elemMatch: { $eq: req.user._id}
      }
    }
  )
  console.log(commentToLike, "comment to like")
  if (commentToLike[0].likes === undefined || commentToLike[0].likes.length == 0 ){
    let result = await Comment.updateOne({
      _id: req.params.commentid,
      likes: {$ne : req.user._id}
    },
    {
      $inc: {likeCount: +1},
      $push: {likes: req.user._id}
    }
  )
  return res.status(200).json({result: result, comment: commentToLike})
} else {
  let result = await Comment.updateOne({
    _id: req.body.commentid,
    likes: req.user._id
  },
  {
    $inc: {likeCount: -1},
    $pull: {likes: req.user._id}
  }
)
return res.status(200).json({result: result, comment: commentToLike})
}
} catch (err) {
    console.log(err)
  }
})

exports.comment_delete = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentid).exec();

  if (comment === null) {
    res.json("This comment does not exist");
    return; 
  }

  await Comment.findByIdAndDelete(req.params.commentid);
  res.json("Comment deleted :)");
});
