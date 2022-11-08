const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  createdAt: Date,
  imageAddress: {type: String, default: ""}
});



const Post = mongoose.model("Post", PostSchema);

module.exports = Post;