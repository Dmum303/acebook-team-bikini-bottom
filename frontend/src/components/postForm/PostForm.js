import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';

export default function PostForm(props) {
  const token = window.localStorage.getItem('token');
  
  const [message, setMessage] = useState('');
  const [imageUpload, setImageUpload] = useState(null);

  const [currentImgUrl, setCurrentImgUrl] = useState('');

  const uploadFile = async () => {
    if (imageUpload == null) return;
    let imageName = `images/${imageUpload.name + v4()}`;
    const imageRef = ref(storage, imageName);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setCurrentImgUrl(url);
      });
    });
  };

  const handleSubmit = async (error) => {
    error.preventDefault()
    await uploadFile();
    
    const response = await fetch('/posts', {
      method: 'post',
      body: JSON.stringify({ message: message, image: currentImgUrl }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
    const json = await response.json();
    if (!response.ok) {
      console.log('Message couldnt send', json);
    }
    if (response.ok) {
      // If form sent successfully then it resets the input field.
      setMessage('');
      setImageUpload(null);
      props.reload();
    }
  };

  // Actual JSX
  return (
    <div class="post-card-container">
      {/* <div className="form-container"> */}
      <form className="create-message-form form" onSubmit={handleSubmit}>
        <label htmlFor="text-box">New Message</label>
        <input
          type="text"
          className="text-box"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          value={message}
          required
        />
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button id="upload-post-img-btn" onClick={uploadFile}>
          Add Post
        </button>
      </form>
    </div>
  );
}
