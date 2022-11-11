import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Header from "../header/header";
import FormBar from "../formBar/Formbar";

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const reload = () => {
    if (token) {
      fetch("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setPosts(data.posts);
        });
    }
  };

  useEffect(() => {
    reload();
  }, []);

  if (token) {
    return (
      <>
        <Header navigate={ navigate } title={ 'feed' }/>
        <div id="wrapper">
          <FormBar reload={ reload }/>
          <main>
            <br></br>
            {posts.slice(0).reverse().map((post) => (
              <div class="post-card-container">
                <Post post={post} key={post._id} reload={ reload } />
              </div>
            ))}
          </main>
        </div>
      </>
    );
  } else {
    navigate("/signin");
  }
};

export default Feed;
