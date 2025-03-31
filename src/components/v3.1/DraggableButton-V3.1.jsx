import { useContext, useEffect, useReducer } from "react";
import { TasksContext } from "../../App-v3.1";

const initialState = {
  position: { x: 100, y: 100 },
  isDragging: false,
  offset: { x: 0, y: 0 },
  moved: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "mouse/down":
      return {
        ...state,
        isDragging: true,
        moved: false,
        offset: action.payload,
      };
    case "mouse/move":
      return { ...state, moved: true, position: action.payload };
    case "mouse/up":
      return { ...state, isDragging: false };
    default:
      return state;
  }
}

function DraggableButton() {
  const [{ position, isDragging, offset, moved }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { darkMode, toggleDarkMode } = useContext(TasksContext);

  const handleStart = (e) => {
    e.preventDefault();
    const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;

    dispatch({
      type: "mouse/down",
      payload: {
        x: clientX - position.x,
        y: clientY - position.y,
      },
    });
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;

      dispatch({
        type: "mouse/move",
        payload: {
          x: clientX - offset.x,
          y: clientY - offset.y,
        },
      });

      if (e.type === "touchmove") {
        e.preventDefault(); // يمنع التمرير أثناء السحب
      }
    };

    const handleEnd = () => {
      dispatch({ type: "mouse/up" });
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: false }); // لمنع التمرير
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, offset]);

  const handleClick = () => {
    if (!moved) {
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
        touchAction: "none", // لمنع التمرير العفوي أثناء السحب
      }}
      onMouseDown={handleStart}
      onTouchStart={handleStart} // دعم اللمس
      onClick={handleClick}
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DraggableButton;

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
