import { useState } from "react";
import styles from "./styles";

function Button({ children, type, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  if (type === "add")
    return (
      <button
        style={
          isHovered
            ? { ...styles.submitButton, ...styles.submitButtonHover }
            : styles.submitButton
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
            ? { ...styles.clearButton, ...styles.clearButtonHover }
            : styles.clearButton
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
