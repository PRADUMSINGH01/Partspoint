import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  message: string;
  type: AlertType;
  duration?: number; // Duration in milliseconds (0 = persistent)
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!isVisible) return null;

  const alertStyles = {
    success: "bg-green-50 border-green-400 text-green-700",
    error: "bg-red-50 border-red-400 text-red-700",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-700",
    info: "bg-blue-50 border-blue-400 text-blue-700",
  };

  const iconStyles = {
    success: <FaCheckCircle className="text-green-500 text-xl" />,
    error: <FaTimesCircle className="text-red-500 text-xl" />,
    warning: <FaExclamationTriangle className="text-yellow-500 text-xl" />,
    info: <FaInfoCircle className="text-blue-500 text-xl" />,
  };

  return (
    <div
      className={`fixed z-50 w-full max-w-md transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
      }`}
      style={{ top: "1rem", left: "50%", transform: "translateX(-50%)" }}
    >
      <div
        className={`${alertStyles[type]} border rounded-lg p-4 shadow-lg relative flex items-start`}
      >
        <div className="mr-3 mt-0.5">{iconStyles[type]}</div>
        <div className="flex-1 pr-6">
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close alert"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

// Hook for using alerts in components
export const useAlert = () => {
  const [alert, setAlert] = useState<{
    message: string;
    type: AlertType;
  } | null>(null);

  const showAlert = (message: string, type: AlertType, duration?: number) => {
    setAlert({ message, type });

    if (duration !== 0) {
      setTimeout(() => {
        setAlert(null);
      }, duration || 5000);
    }
  };

  const AlertComponent = () => {
    if (!alert) return null;

    return (
      <Alert
        message={alert.message}
        type={alert.type}
        duration={5000}
        onClose={() => setAlert(null)}
      />
    );
  };

  return { showAlert, AlertComponent };
};

export default Alert;
