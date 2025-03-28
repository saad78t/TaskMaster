import { useContext } from "react";
import styles from "../styles";
import { TasksContext } from "../../App-v3.1";

function SelectComponent({ value, onChange }) {
  const { darkMode } = useContext(TasksContext);

  return (
    <select style={styles(darkMode).select} value={value} onChange={onChange}>
      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
        <option value={num} key={num}>
          {num}
        </option>
      ))}
    </select>
  );
}

export default SelectComponent;
