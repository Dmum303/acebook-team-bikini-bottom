//This will be the comment form

import { useState } from 'react';

export default function CommentForm(props) {
  // Component state
  const [message, setMessage] = useState('');
  // Feed already resets the token for us.
  const token = window.localStorage.getItem('token');
  const handleSubmit = async (error) => {
    error.preventDefault(); // Prevents default action of refreshing the page

    const response = await fetch('/comments', {
      method: 'post',
      body: JSON.stringify({
        message: message,
        id: props.postId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      console.log('Message couldnt send', json);
    }
    if (response.ok) {
      // If form sent successfully then it resets the input field.
      setMessage('');
      props.reload();
    }
  };

  // Handles value of the text input field.
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  // Actual JSX
  return (
    <div className="post-form-container">
      <form className="create-form-container" onSubmit={handleSubmit}>
      <div className="comment-form-container">
        <label for="comment-text-box"></label>
        <input
          type="text"
          className="comment-text-box"
          onChange={handleChange}
          value={message}
          required
        />
      
        </div>
        <br></br>
        <button class='comment-btn' > Comment </button>
      </form>
    </div>
  );
}
