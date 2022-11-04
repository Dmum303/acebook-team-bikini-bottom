const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const PostsController = {
  // return all posts
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  // create new post
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  // Define a comment (linked to post_id, username or user_id and req.body.comment)
  // save comment

  CreateComment: (req, res) => {
    let post_id = req.body.postID;
    Post.findByIdAndUpdate(async (err, post) => {
      post_id,
      { $push: { comments: { text: 'Hi everyone!' } } },
      { new: true },
  function (err, docs) 
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

Post.findByIdAndUpdate(
  post_id,
  { $push: { comments: { text: 'Hi everyone!' } } },
  { new: true },
  function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Updated Post : ', docs);
    }
  }
);

// // comment
// Comment: (req, res) => {
//   let comment = req.body.comment;
//   comment.postedBy = req.body.userId;

//   Post.findByIdAndUpdate(
//     req.body.postId,
//     { $push: { comments: req.body.userId } },
//     { new: true }
//   )
//     .populate('comments.postedBy', '_id name')
//     .populate('postedBy', '_id name')
//     .exec((err, results) => {
//       if (err) {
//         return res.status(400).json({
//           error: err,
//         });
//       } else {
//         res.json(result);
//       }
//     });
// };

// // delete comment
// Comment: (req, res) => {
//   let comment = req.body.comment;

//   Post.findByIdAndUpdate(
//     req.body.postId,
//     { $pull: { comments: { _id: comment._id } } },
//     { new: true }
//   )
//     .populate('comments.postedBy', '_id name')
//     .populate('postedBy', '_id name')
//     .exec((err, results) => {
//       if (err) {
//         return res.status(400).json({
//           error: err,
//         });
//       } else {
//         res.json(result);
//       }
//     });
// };

module.exports = PostsController;
