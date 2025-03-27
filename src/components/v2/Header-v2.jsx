import styles from "../styles";

function Header({ version, darkMode, toggleDarkMode }) {
  // let version = "Unknown";
  // if (document.currentScript?.src.includes("App-v1")) version = "v1";
  // else if (document.currentScript?.src.includes("App-v2")) version = "v2";
  // else if (document.currentScript?.src.includes("App-v3")) version = "v3";
  return (
    <header style={styles(darkMode).header}>
      <span style={styles(darkMode).headerText}>
        📔TaskMaster {version} using useState Hook📝
      </span>
      <button style={styles(darkMode).toggleButton} onClick={toggleDarkMode}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>{" "}
    </header>
  );
}

export default Header;
