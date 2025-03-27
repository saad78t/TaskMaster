import styles from "./styles";

function SelectComponent({ value, onChange, darkMode }) {
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
