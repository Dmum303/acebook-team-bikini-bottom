const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const JWT = require("jsonwebtoken");

const postsRouter = require("./routes/posts");
const tokensRouter = require("./routes/tokens");
const usersRouter = require("./routes/users");

const app = express();

// setup for receiving JSON
app.use(express.json())

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {

  let token;
  const authHeader = req.get("Authorization")

  if(authHeader) {
    token = authHeader.slice(7)
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if(err) {
      console.log(err)
      res.status(401).json({message: "auth error"});
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};

// route setup
app.use("/posts", tokenChecker, postsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({message: 'server error'})
});

// IMPORT: Image upload start
// import "frontend/src/index.css"  // May be duplicated 
// import { useState, useEffect } from "react"; 
// import { storage } from "firebase.js";
// import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
// import { v4 } from "uuid"
// IMPORT: Image upload end 

// Image upload code start - added to app code, may need to be a route instead
// function App() {
//   // Send file to Firebase
//   const [imageUpload, setImageUpload] = useState(null); // State 
//   const [imageList, setImageList] = useState([]);
//   const imageListRef = ref(storage, "images/")
//   const uploadImage = () => {
//     if (imageUpload == null) return;
//     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageList((prev) => [...prev, url]);
//       })
//     })
//   };

//   useEffect(() => {
//     listAll(imageListRef).then((response) => {
//       response.items.forEach((item) => {
//        getDownloadURL(item).then((url) => {
//          setImageList((prev) => [...prev, url]);
//        })
//       })
//     })
  
//   }, [])

//   return (
//      <div className="App">
//       <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}></input> 
//       <button onClick={uploadImage}>Upload Image</button>

//       {imageList.map((url) => { 
//         return <img src={url}/>
//       })}
//      </div>
     
//   )
// }

// Image upload code end 
module.exports = app;
