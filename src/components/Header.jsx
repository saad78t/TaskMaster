import styles from "./styles";
import { useTasks } from "../TasksProvider";

function Header() {
  const { version, darkMode, toggleDarkMode } = useTasks();

  return (
    <header style={styles(darkMode).header}>
      <span style={styles(darkMode).headerText}>
        📔TaskMaster {version} using a separate file of useContext & useReducer
        hook which is TasksProvider.js📝{" "}
      </span>
      <button style={styles(darkMode).toggleButton} onClick={toggleDarkMode}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>{" "}
    </header>
  );
}

export default Header;
