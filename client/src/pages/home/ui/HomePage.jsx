import React from "react";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Tea Shop</h1>
      <p>Discover our collection of premium teas from around the world.</p>
      <div className="features">
        <div className="feature">
          <h2>Premium Quality</h2>
          <p>We source only the finest teas from trusted growers.</p>
        </div>
        <div className="feature">
          <h2>Wide Selection</h2>
          <p>Choose from our extensive collection of teas.</p>
        </div>
        <div className="feature">
          <h2>Expert Advice</h2>
          <p>Get recommendations from our tea experts.</p>
        </div>
      </div>
    </div>
  );
};
