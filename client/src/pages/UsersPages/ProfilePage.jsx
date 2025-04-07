import React from "react";
import { useAuth } from "../../app/Context/AuthContext";
import { Navigate } from "react-router-dom";

function ProfilePage() {
  const { user, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {user && (
        <div className="profile-content">
          <div className="profile-item">
            <h3>Username</h3>
            <p>{user.username}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
