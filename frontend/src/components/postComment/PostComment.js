//Not in use
import React from 'react';
import '../post/Post.css';

const Comment = ({ comment }) => {
  return (
    <div class="post-card">
      <article data-cy="comment" key={comment._id}>
        <br></br>
        {comment.text}
        {comment.created}
      </article>
    </div>
  );
};

export default Comment;