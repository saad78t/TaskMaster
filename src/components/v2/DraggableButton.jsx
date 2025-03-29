/* import React, { useState } from "react";

const DraggableButton = ({ darkMode, toggleDarkMode }) => {
  // Store button location
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight - 100,
  });
  const [isDragging, setIsDragging] = useState(false);

// When the button is pressed (to start dragging)
  const handleMouseDown = (e) => {
    setIsDragging(true);
  };

  // When moving the mouse while pressing
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - 50, // 50 half the button width to center it
        y: e.clientY - 25, // 25 Half the button height to center it
      });
    }
  };

  // When the button is released
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (!isDragging) {
      toggleDarkMode(); // Only execute the switch if there is no pull
    }
  };

  return (
    <button
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        padding: "10px 15px",
        background: darkMode ? "#FFD700" : "#333",
        color: darkMode ? "black" : "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default DraggableButton;
 */

import { useState, useEffect } from "react";

function DraggableButton({ darkMode, toggleDarkMode }) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [moved, setMoved] = useState(false); // Checks if the button has been moved

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setMoved(false); // Reset the movement state
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setMoved(true); // Confirm that the button has moved
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  const handleClick = () => {
    if (!moved) {
      // Allow pressing only if the button is not moved
      toggleDarkMode();
    }
  };

  return (
    <button
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        padding: "10px 15px",
        background: darkMode ? "#FFD700" : "#333",
        color: darkMode ? "black" : "white",
        border: "none",
        borderRadius: "5px",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DraggableButton;
