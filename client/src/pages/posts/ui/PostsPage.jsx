import React, { useEffect, useState } from "react";
import { apiService } from "../../../shared/api/api.service";
import { Button } from "../../../shared/ui/Button/Button";
import "./PostsPage.css";

export const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiService.getPosts();
        setPosts(data);
      } catch (err) {
        setError("Failed to load posts");
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="posts-page">
      <h1>Tea Blog</h1>
      <div className="posts-grid">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div className="post-meta">
              <span>Author: {post.author}</span>
              <span>
                Date: {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
            <Button variant="secondary" size="small">
              Read More
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
