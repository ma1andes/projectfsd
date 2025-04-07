import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../app/Context/AuthContext";
import { Button } from "../../shared/ui/Button/Button";
import "./Layout.css";

const Layout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              Tea Blog
            </Link>
            <button
              className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/posts"
                className={`nav-link ${
                  location.pathname === "/posts" ? "active" : ""
                }`}
              >
                Posts
              </Link>
              {isAuthenticated ? (
                <div className="user-section">
                  <Link
                    to="/profile"
                    className={`nav-link ${
                      location.pathname === "/profile" ? "active" : ""
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/create-post"
                    className={`nav-link ${
                      location.pathname === "/create-post" ? "active" : ""
                    }`}
                  >
                    Create Post
                  </Link>
                  <Button variant="outline" size="small" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="auth-buttons">
                  <Link to="/auth">
                    <Button variant="outline" size="small">
                      Login
                    </Button>
                  </Link>
                  <Link to="/reg">
                    <Button variant="primary" size="small">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Tea Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
