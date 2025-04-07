import React, { useEffect, useState } from "react";
import PostsAPI from "./PostsAPi";
import { useParams } from "react-router-dom";

function OnePost() {
  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    PostsAPI.getPost(id).then((data) => setPost(data.data));
  }, []);

  return (
    <div>
      {post && (
        <div>
          <h1 style={{ color: "blue", fontSize: "16px" }}>
            {" "}
            {post.title}, id: {post.id}{" "}
          </h1>
          <h3>{post.content}</h3>
        </div>
      )}
    </div>
  );
}

export default OnePost;
