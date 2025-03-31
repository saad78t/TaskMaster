import styles from "../styles";
import { useTasks } from "../../TasksProvider";

function SelectComponent({ value, onChange }) {
  const { darkMode } = useTasks();

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
