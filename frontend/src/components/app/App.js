import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React from 'react';
import Feed from '../feed/Feed'
import TestSignUp from '../signupForm/SignUpForm'
import {
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";

// IMPORT: Image upload start
import { useState, useEffect } from "react"; 
import { storage } from "./firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { v4 } from "uuid"
import './App.css'
// IMPORT: Image upload end 

const App = () => {
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

        <Routes>
          <Route path='/posts'  element={<Feed navigate={ useNavigate() }/>}/>
          <Route path='/login'  element={<LoginForm  navigate={ useNavigate() }/>}/>
          <Route path='/signup' element={<SignUpForm navigate={ useNavigate() }/>}/>
          <Route path='/test' element={<TestSignUp />} />{/* This is a test path for testing individual components and should be removed in production.*/}
        </Routes>
      </>
    );
}

export default App;
