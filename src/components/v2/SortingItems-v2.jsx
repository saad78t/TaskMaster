import Button from "../Button";
import styles from "../styles";

function SortingItems({ clearList, sortBy, dispatch }) {
  return (
    <section style={styles.controls}>
      <select
        style={styles.select}
        value={sortBy}
        onChange={(e) => dispatch({ type: "sort", payload: e.target.value })}
      >
        <option value="input">sort by input order</option>
        <option value="note">sort by notes</option>
        <option value="completed">sort by completed</option>
      </select>
      <Button type="clear" onClick={() => clearList()}>
        clear
      </Button>
    </section>
  );
}

export default SortingItems;
