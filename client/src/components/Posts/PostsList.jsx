import React, { useEffect, useState } from "react";
import PostsAPI from "./PostsAPi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/Context/AuthContext";
import "./PostsList.css";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await PostsAPI.getPosts();
        if (response && response.data) {
          setPosts(response.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        if (error.message.includes("No authentication token found")) {
          setError("Please log in to view posts");
        } else {
          setError("Failed to load posts. Please try again later.");
        }
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [isAuthenticated]);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        {!isAuthenticated && (
          <div className="auth-actions">
            <button className="auth-button" onClick={() => navigate("/auth")}>
              Log In
            </button>
            <button className="auth-button" onClick={() => navigate("/reg")}>
              Register
            </button>
          </div>
        )}
      </div>
    );
  }

  if (posts.length === 0) {
    return <div className="no-posts">No posts available.</div>;
  }

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>Author: {post.owner}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
