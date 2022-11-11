import React, { useEffect, useState } from 'react';
import './Post.css';
// import '../postComment/PostComment.js';
import CommentForm from '../postCommentForm/CommentForm';
import Comment from '../postComment/PostComment.js';
import LikeButton from '../likeButton/LikeButton';

const Post = ({ post, reload }) => {
  const [show, setShow] = useState(true);

  return (
    <div class="post-card">
      <article data-cy="post" key={post._id}>
        <h1>{post.poster.firstName} {post.poster.lastName}</h1>
        <br></br>
        <img src={post.imageUrls} alt="post-img" margin="20" width="680" />
        {post.message}
        <br></br>
        {/* <button onClick={() => setShow(!show)}>Comments</button> */}
        
        <br></br>
        {show ? (
          <div className="form-container">
            <CommentForm postId={ post._id } reload={ reload } />
            <br></br>
            {post.comments
              .slice(0)
              .reverse()
              .map((comment) => (
                <Comment comment={comment} key={post.id} reload={reload} />
              ))}
          </div>
        ) : null}
      <br></br>
      <LikeButton postId={post._id} />
      <button onClick={() => setShow(!show)}><i class="fa-regular fa-comments"></i> Comments </button>
      </article>
    </div>
  );
};

export default Post;
