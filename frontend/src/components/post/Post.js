import React from 'react';
import './Post.css';
// import '../postComment/PostComment.js';
import CommentForm from '../postCommentForm/CommentForm';
import Comment from '../postComment/PostComment.js';

// const arrNow = post.comment

const Post = ({ post }) => {
  const handleClick = () => {
    console.log('Clicked');
    var x = document.getElementById('hideComments');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  };
  return (
    <div class="post-card">
      <article data-cy="post" key={post._id}>
        <br></br>
        {post.message}
        <br></br>
        <button onClick={handleClick}>Comments</button>
        <br></br>
        <div id="hideComments">
          <CommentForm postId={post._id} />
          <br></br>
          {post.comments
            .slice(0)
            .reverse()
            .map((comment) => (
              <Comment comment={comment} key={post.id} />
            ))}
        </div>
      </article>
    </div>
  );
};

export default Post;
