import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../app/Context/AuthContext";
import { getToken } from "../../utils/auth.utils";
import "./CreatePostPage.css";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, showNotification, user, logout } = useAuth();
  const navigate = useNavigate();

  // Log user data when component mounts
  useEffect(() => {
    console.log("CreatePostPage user data:", user);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const clearLocalStorageAndRefresh = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (!user || !user.id) {
        console.error("User data is missing ID:", user);
        throw new Error(
          "User ID not available. Please log out and log in again."
        );
      }

      console.log("Creating post with user ID:", user.id);

      const postData = {
        title,
        content,
        owner: user.id,
      };

      console.log("Post data being sent:", postData);

      // Direct fetch call
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch("http://127.0.0.1:8000/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postData),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (e) {
        console.error("Failed to parse response JSON:", e);
      }

      if (!response.ok) {
        console.error("Server response:", response.status, response.statusText);
        console.error("Response data:", responseData);
        throw new Error(
          responseData?.detail ||
            (typeof responseData === "object"
              ? JSON.stringify(responseData)
              : "Failed to create post")
        );
      }

      console.log("Post created successfully:", responseData);

      showNotification("Post created successfully!");
      navigate("/posts");
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err.message || "Failed to create post. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="create-post-container">
      <h1>Create New Post</h1>
      {error && <div className="error-message">{error}</div>}
      {user && !user.id && (
        <div className="error-message">
          User ID is missing. Please log out and log in again to update your
          profile.
          <button onClick={handleLogout} className="logout-button">
            Logout Now
          </button>
        </div>
      )}
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows="10"
            placeholder="Write your post content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Post"}
        </button>
      </form>

      {/* Debug section */}
      <div className="debug-section">
        <h3>Debug Information</h3>
        <p>Current user data:</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <div className="debug-actions">
          <button className="debug-button" onClick={handleLogout}>
            Logout
          </button>
          <button
            className="debug-button"
            onClick={clearLocalStorageAndRefresh}
          >
            Clear LocalStorage & Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;
