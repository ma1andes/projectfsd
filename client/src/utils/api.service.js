import { fetchWithHeaders } from "./auth.utils";

const API_BASE_URL = "http://127.0.0.1:8000";

export const apiService = {
  // Auth endpoints
  register: async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Registration failed");
      }

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Login failed");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await fetchWithHeaders(`${API_BASE_URL}/logout/`, {
        method: "POST",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  // User endpoints
  getUsers: async () => {
    try {
      const response = await fetchWithHeaders(`${API_BASE_URL}/users/`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Failed to get users");
      }

      return data;
    } catch (error) {
      console.error("Get users error:", error);
      throw error;
    }
  },

  getUser: async (id) => {
    try {
      const response = await fetchWithHeaders(`${API_BASE_URL}/users/${id}/`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Failed to get user");
      }

      return data;
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  },

  // Posts endpoints
  getPosts: async () => {
    try {
      const response = await fetchWithHeaders(`${API_BASE_URL}/posts/`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Failed to get posts");
      }

      return data;
    } catch (error) {
      console.error("Get posts error:", error);
      throw error;
    }
  },

  getPost: async (id) => {
    try {
      const response = await fetchWithHeaders(`${API_BASE_URL}/posts/${id}/`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Failed to get post");
      }

      return data;
    } catch (error) {
      console.error("Get post error:", error);
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      console.log("Sending post data:", JSON.stringify(postData));
      const response = await fetchWithHeaders(`${API_BASE_URL}/posts/`, {
        method: "POST",
        body: JSON.stringify(postData),
      });

      // Try to get the response data even if response is not OK
      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error("Failed to parse response JSON:", e);
      }

      if (!response.ok) {
        console.error("Server error response:", data);
        const errorMessage =
          data?.detail ||
          data?.message ||
          (typeof data === "object"
            ? JSON.stringify(data)
            : "Failed to create post");
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      console.error("Create post error:", error);
      throw error;
    }
  },

  updatePost: async (id, postData) => {
    try {
      const response = await fetchWithHeaders(`${API_BASE_URL}/posts/${id}/`, {
        method: "PUT",
        body: JSON.stringify(postData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.message || "Failed to update post");
      }

      return data;
    } catch (error) {
      console.error("Update post error:", error);
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      const response = await fetchWithHeaders(`${API_BASE_URL}/posts/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || data.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Delete post error:", error);
      throw error;
    }
  },
};
