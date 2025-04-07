import { fetchWithHeaders } from "../../utils/auth.utils";

class PostsAPI {
  static async getPosts() {
    try {
      const response = await fetchWithHeaders("http://127.0.0.1:8000/posts/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return { data: [], error: error.message };
    }
  }

  static async getPost(id) {
    try {
      const response = await fetchWithHeaders(
        `http://127.0.0.1:8000/posts/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.error("Error fetching post:", error);
      return { data: null, error: error.message };
    }
  }
}

export default PostsAPI;
