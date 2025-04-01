import { useEffect, useReducer } from "react";
import { useTasks } from "../../TasksProvider";

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
  const { darkMode, toggleDarkMode } = useTasks();

  const handleStart = (e) => {
    // إزالة e.preventDefault هنا لأننا لا نحتاج إلى منع السلوك الافتراضي عند الضغط فقط
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

      if (e.type === "touchmove" && isDragging) {
        e.preventDefault(); // منع السلوك الافتراضي هنا فقط عند السحب
      }
    };

    const handleEnd = () => {
      dispatch({ type: "mouse/up" });
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove, { passive: false }); // passive: false هنا فقط
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
        touchAction: "none",
      }}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onClick={handleClick}
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DraggableButton;
