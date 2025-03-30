import { useContext } from "react";
import Button from "./Button-V3.1";
import styles from "../styles";
import { TasksContext } from "../../App-v3.1";

function SortingItems() {
  const { clearList, sortBy, dispatch, darkMode } = useContext(TasksContext);
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
