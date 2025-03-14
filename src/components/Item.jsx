import { useState } from "react";
import styles from "./styles";
import { useTasks } from "../TasksProvider";

function Item({ item }) {
  const [hover, setHover] = useState();
  const { onDeleteItem, onToggleItem } = useTasks();
  return (
    <div style={styles.item}>
      <li style={styles.listItem}>
        <div style={styles.times}>
          <span>{item.times1}</span>
          <span>{item.times2}</span>
        </div>
        <span style={styles.note}>{item.note}</span>
        <input
          style={styles.checkbox}
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggleItem(item.id)}
        />
        <button
          onClick={() => onDeleteItem(item.id)}
          style={
            hover
              ? { ...styles.closeButton, ...styles.closeButtonHover }
              : styles.closeButton
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          &times;
        </button>
      </li>
    </div>
  );
}

export default Item;
