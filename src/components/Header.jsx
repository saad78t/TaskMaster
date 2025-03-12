import styles from "./styles";

function Header({ version }) {
  // let version = "Unknown";
  // if (document.currentScript?.src.includes("App-v1")) version = "v1";
  // else if (document.currentScript?.src.includes("App-v2")) version = "v2";
  // else if (document.currentScript?.src.includes("App-v3")) version = "v3";
  return (
    <div style={styles.header}>
      <p>📔TaskMaster {version} using create-react-app and useState Hook📝</p>
    </div>
  );
}

export default Header;
