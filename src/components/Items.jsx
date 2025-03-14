import Item from "./Item";
import styles from "./styles";
import { useTasks } from "../TasksProvider";

function Items() {
  const { sortedItems } = useTasks();

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
