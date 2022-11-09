import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

const imageApp = () => {
    const [imageUpload, setImageUpload] = useState(null); 
    const [imageList, setImageList] = useState([]);
    const imageListRef = ref(storage, "images/")
    const uploadImage = () => {
      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        })
      })
    };
  
    useEffect(() => {
      listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
         getDownloadURL(item).then((url) => {
           setImageList((prev) => [...prev, url]);
         })
        })
      })
    }, [])
      return (
        <>
          <div className="App">
            <input id="img-file" type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}></input> 
             <button id="img-upload-btn" onClick={uploadImage}>Upload Image</button>
              {imageList.map((url) => { 
              return <img id="uploaded-photo" src={url}/>
            })}
        </div>
        </>
      );
  }

export default imageApp;
  


// export default function ImageForm(props) {
//   // Component state
// //   const [message, setMessage] = useState('');
//   // Feed already resets the token for us.
// //   const token = window.localStorage.getItem('token');
// //   const tempId = '636932d263ba38502efa92d1';
//   const handleSubmit = async (error) => {
//     error.preventDefault(); // Prevents default action of refreshing the page

//     const response = await fetch('/comments', {
//       method: 'post',
//       body: JSON.stringify({
//         message: message,
//         id: props.postId,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + token,
//       },
//     });
//     const json = await response.json();
//     if (!response.ok) {
//       console.log('Message couldnt send', json);
//     }
//     if (response.ok) {
//       // If form sent successfully then it resets the input field.
//       setMessage('');
//     }
//   };

//   // Handles value of the text input field.
//   const handleChange = (event) => {
//     setMessage(event.target.value);
//   };
//   // Actual JSX
//   return (
//     <div className="form-container">
//       <form className="create-message-form" onSubmit={handleSubmit}>
//         <label for="text-box">Comment here:</label>
//         <input
//           type="file"
//           className="img-upload"
//           onChange={handleChange}
//           value={message}
//           required
//         />
//         <button>Upload Photo</button>
//       </form>
//     </div>
//   );
// }
