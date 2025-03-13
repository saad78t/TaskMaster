import { useContext } from "react";
import styles from "../styles";
import { TasksContext } from "../../App-v3.1";

function Header() {
  const { version } = useContext(TasksContext);
  // let version = "Unknown";
  // if (document.currentScript?.src.includes("App-v1")) version = "v1";
  // else if (document.currentScript?.src.includes("App-v2")) version = "v2";
  // else if (document.currentScript?.src.includes("App-v3")) version = "v3";
  return (
    <div style={styles.header}>
      <p>
        📔TaskMaster {version}.1 using useContext & useReducer Hooks in the
        App-v3.1.js file📝
      </p>
    </div>
  );
}

export default Header;
