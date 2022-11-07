//not in use yet

import React from 'react';
import './PostComments.css';

const Comment = ({ post }) => {
  return (
    <div class="post-card">
      <article data-cy="comment" key={comment._id}>
        <p>{comment.text}</p>
        <p>{comment.created}</p>
      </article>
    </div>
  );
};

export default Comment;
