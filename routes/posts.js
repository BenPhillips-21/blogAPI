const express = require("express");
const router = express.Router();
const passport = require('passport');
const { isAdmin, isUserComment } = require('../middleware/authMiddleware');

const post_controller = require("../controllers/postController")
const comment_controller = require("../controllers/commentController")

// Add 'passport.authenticate('jwt', {session: false})' to middleware to protect the route

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

router.post('/:postid/comment/create', passport.authenticate('jwt', {session: false}), comment_controller.post_create_comment)

router.post("/:postid/comments/delete/:commentid", passport.authenticate('jwt', {session: false}), isUserComment, comment_controller.comment_delete);

module.exports = router;
