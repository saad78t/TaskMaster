import Item from "./Item-V3.2";
import styles from "./styles";
import { useTasks } from "../TasksProvider";

function Items() {
  const { sortedItems, darkMode } = useTasks();

  return (
    <section style={styles(darkMode).itemsContainer}>
      <ul>
        {sortedItems?.map((item, i) => (
          <Item item={item} key={i} />
        ))}
      </ul>
    </section>
  );
}

export default Items;
