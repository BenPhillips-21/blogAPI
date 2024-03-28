const express = require("express");
const router = express.Router();
const passport = require('passport');

const comment_controller = require("../controllers/commentController")

router.get('/', comment_controller.index)

router.post('/create', comment_controller.post_create_comment)

router.post("/delete/:id", comment_controller.comment_delete);

module.exports = router;