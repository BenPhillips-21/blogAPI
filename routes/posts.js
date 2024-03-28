const express = require("express");
const router = express.Router();
const passport = require('passport');

const post_controller = require("../controllers/postController")

// Add 'passport.authenticate('jwt', {session: false})' to middleware to protect the route

// GET request for ALL posts
router.get('/', post_controller.index)

// GET request for one post.
router.get("/:id", post_controller.post_detail);

// POST request for creating post.
router.post("/create", post_controller.post_create_post);

// POST request to delete post.
router.post("/delete/:id", post_controller.post_delete_post);

 // POST request to update post.
router.post("/update/:id", post_controller.post_update_post);

module.exports = router;
