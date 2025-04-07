import React, { useEffect, useState } from "react";
import "./Notification.css";

function Notification({ message, type = "success", duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return <div className={`notification notification-${type}`}>{message}</div>;
}

export default Notification;
