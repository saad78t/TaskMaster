import { useContext } from "react";
import Item from "./Item";
import styles from "./styles";
import { TasksContext } from "../TasksProvider";

function Items() {
  const { sortedItems } = useContext(TasksContext);

  return (
    <section style={styles.itemsContainer}>
      <ul>
        {sortedItems?.map((item, i) => (
          <Item item={item} key={i} />
        ))}
      </ul>
    </section>
  );
}

export default Items;
