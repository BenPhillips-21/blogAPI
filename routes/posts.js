const express = require("express");
const router = express.Router();
const passport = require('passport');
const { isAdmin, isUserComment } = require('../middleware/authMiddleware');

const post_controller = require("../controllers/postController")
const comment_controller = require("../controllers/commentController")

// GET request for ALL posts
router.get('/', post_controller.index)

// GET request for one post.
router.get("/:id", post_controller.post_detail);

// POST request for creating post.
router.post("/create", passport.authenticate('jwt', {session: false}), isAdmin, post_controller.post_create_post);

// POST request to delete post.
router.post("/delete/:id", passport.authenticate('jwt', {session: false}), isAdmin, post_controller.post_delete_post);

 // POST request to update post.
router.post("/update/:id", passport.authenticate('jwt', {session: false}), isAdmin, post_controller.post_update_post);

// POST request to create comment
router.post('/:postid/comment/create', passport.authenticate('jwt', {session: false}), comment_controller.post_create_comment)

// POST request to delete a comment
router.post("/:postid/comments/delete/:commentid", passport.authenticate('jwt', {session: false}), isUserComment, comment_controller.comment_delete);

// GET request to add like to comment
router.get("/:postid/comments/like/:commentid", passport.authenticate('jwt', {session: false}), comment_controller.like_comment)

module.exports = router;
