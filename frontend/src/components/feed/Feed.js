import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import PostForm from "../postForm/PostForm";
import FriendsBar from "../friends/FriendsBar";
import Header from "../header/header";

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
        <Header navigate={ navigate } />
        <div id="wrapper">
          <h2>Feed</h2>
          <FriendsBar />
          <main>
            <PostForm reload={reload} />
            <br></br>
            {posts.reverse().map((post) => (
              <div class="post-card-container">
                <Post post={post} key={post._id} />
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
