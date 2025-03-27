import { useState } from "react";
import styles from "./styles";

function Button({ children, type, onClick, darkMode }) {
  const [isHovered, setIsHovered] = useState(false);

  if (type === "add")
    return (
      <button
        style={
          isHovered
            ? {
                ...styles(darkMode).submitButton,
                ...styles(darkMode).submitButtonHover,
              }
            : styles(darkMode).submitButton
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </button>
    );

  if (type === "clear")
    return (
      <button
        style={
          isHovered
            ? {
                ...styles(darkMode).clearButton,
                ...styles(darkMode).clearButtonHover,
              }
            : styles(darkMode).clearButton
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    );
}

export default Button;
