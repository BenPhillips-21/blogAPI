const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CommentSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    post: {type:Schema.Types.ObjectId, ref:'Post'},
    content: { type: String, required: true },
    date_published: { type: Date, required: true },
})

module.exports = mongoose.model("Comment", CommentSchema)