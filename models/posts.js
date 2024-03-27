const mongoose = require("mongoose")

const Schema = mongoose.Schema

const PostSchema = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
    title: { type: String, required: true },
    date_published: { type: Date, required: true },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
})

// Virtual for Post URL
PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema)