import Button from "../Button";
import styles from "../styles";

function SortingItems({ clearList, sortBy, setSortBy, darkMode }) {
  return (
    <section style={styles(darkMode).controls}>
      <select
        style={styles(darkMode).select}
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="input">sort by input order</option>
        <option value="note">sort by notes</option>
        <option value="completed">sort by completed</option>
      </select>
      <Button darkMode={darkMode} type="clear" onClick={() => clearList()}>
        clear
      </Button>
    </section>
  );
}

export default SortingItems;
