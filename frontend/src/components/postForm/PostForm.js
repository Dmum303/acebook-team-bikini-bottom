import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from './firebase';
import { v4 } from 'uuid';

export default function PostForm(props) {
  // Component state
  const [message, setMessage] = useState('');
  const [hasImage, setHasImage] = useState(false);
  // Feed already resets the token for us.
  const token = window.localStorage.getItem('token');

  // Image upload starts here
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, 'images/');
  const uploadFile = () => {
    setHasImage(true);
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const handleSubmit = async (error) => {
    error.preventDefault()
    
    console.log('here are the imageURls', imageUrls)
    const response = await fetch('/posts', {
      method: 'post',
      body: JSON.stringify({ message: message, imageUrls: imageUrls[imageUrls.length - 1] }),
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
        <button className="upload-post-img-btn" onClick={uploadFile}>
          Add Post
        </button>
      </form>
    </div>
  );
}
