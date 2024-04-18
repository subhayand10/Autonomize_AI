import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css"

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <button className="back-button" onClick={handleBackClick}>
      Back to Home
    </button>
  );
};

export default BackButton;
