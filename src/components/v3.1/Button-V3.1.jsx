import { useContext, useState } from "react";
import styles from "../styles";
import { TasksContext } from "../../App-v3.1";

function Button({ children, type, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const { darkMode } = useContext(TasksContext);
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
