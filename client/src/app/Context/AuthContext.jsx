import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  setToken,
  getToken,
  clearToken,
  setLocalUser,
  getLocalUser,
  clearLocalUser,
} from "../../utils/auth.utils";
import { apiService } from "../../utils/api.service";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const localUser = getLocalUser();
    console.log("Initializing auth context with user data:", localUser);
    if (token && localUser) {
      setUser(localUser);
    }
    setLoading(false);
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const register = async (username, email, password) => {
    try {
      const response = await apiService.register(username, email, password);
      if (response.token) {
        setToken(response.token);
        const userData = {
          username: response.username || username,
          id: response.user_id || response.id,
        };
        setLocalUser(userData);
        setUser(userData);
        showNotification("Registration successful!");
        navigate("/auth");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      showNotification(error.message || "Registration failed", "error");
      return false;
    }
  };

  const login = async (username, password) => {
    try {
      const response = await apiService.login(username, password);
      if (response.token) {
        setToken(response.token);
        const userData = {
          username: response.username,
          id: response.user_id,
        };
        setLocalUser(userData);
        setUser(userData);
        showNotification("Login successful!");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      showNotification(error.message || "Login failed", "error");
      return false;
    }
  };

  const logout = () => {
    clearToken();
    clearLocalUser();
    setUser(null);
    showNotification("Logged out successfully!");
    navigate("/");
  };

  const value = {
    user,
    loading,
    notification,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    showNotification,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}
    </AuthContext.Provider>
  );
};
