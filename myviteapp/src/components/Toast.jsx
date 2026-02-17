// src/components/Toast.jsx
import React, { useEffect } from "react";

const Toast = ({ type = "success", message, onClose }) => {
  // Auto-close after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-blue-300",
    error: "bg-white",
    warning: "bg-white",
    info: "bg-white",
  };

  return (
    <div
      className={`fixed top-25 right-6 px-4 py-3 rounded-lg text-black shadow-lg flex items-center gap-3 animate-slide-in ${colors[type]}`}
    >
      {/* Icon */}
      {type === "success" && <span>✅</span>}
      {type === "error" && <span>❌</span>}
      {type === "warning" && <span>⚠️</span>}
      {type === "info" && <span>ℹ️</span>}

      {/* Message */}
      <span>{message}</span>

      {/* Close button */}
      <button
        onClick={onClose}
        className="ml-2 text-gray-900 hover:text-gray-700 font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
