import { useTasks } from "../TasksProvider";
import Button from "./Button-V3.2";
import styles from "../components/styles";

function SortingItems() {
  const { clearList, sortBy, dispatch, darkMode } = useTasks();
  return (
    <section style={styles(darkMode).controls}>
      <select
        style={styles(darkMode).select}
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
