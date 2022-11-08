const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  createdAt: Date,
  profilePicture: {type: String, default: 'https://images.freeimages.com/vhq/images/previews/85b/psd-universal-blue-web-user-icon-392728.jpg'}
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;