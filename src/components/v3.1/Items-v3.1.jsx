import { useContext } from "react";
import Item from "./Item-v3.1";
import styles from "../styles";
import { TasksContext } from "../../App-v3.1";

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
