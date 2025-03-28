import { useContext } from "react";
import styles from "../styles";
import { TasksContext } from "../../App-v3.1";

function Header() {
  const { version, darkMode, toggleDarkMode } = useContext(TasksContext);
  // let version = "Unknown";
  // if (document.currentScript?.src.includes("App-v1")) version = "v1";
  // else if (document.currentScript?.src.includes("App-v2")) version = "v2";
  // else if (document.currentScript?.src.includes("App-v3")) version = "v3";
  return (
    <header style={styles(darkMode).header}>
      <span style={styles(darkMode).headerText}>
        📔TaskMaster {version}.1 using useContext & useReducer Hook in the
        App-v3.1.js file📝
      </span>
      <button style={styles(darkMode).toggleButton} onClick={toggleDarkMode}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>{" "}
    </header>
  );
}

export default Header;
