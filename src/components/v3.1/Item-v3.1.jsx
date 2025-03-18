import { useContext, useState } from "react";
import styles from "../styles";
import { TasksContext } from "../../App-v3.1";

function Item({ item }) {
  const [hover, setHover] = useState(false);
  const [newNote, setNewNote] = useState(item.note);
  const [editing, setEditing] = useState(false);

  const { onDeleteItem, onToggleItem, editItem } = useContext(TasksContext);

  function handleEdit() {
    setEditing(true);
  }

  function handleSave() {
    editItem(item.id, newNote);
    setEditing(false);
  }

  function discardChanges() {
    setNewNote(item.note);
    setEditing(false);
  }
  return (
    <div style={styles.item}>
      <li style={styles.listItem}>
        <div style={styles.times}>
          <span>{item.times1}</span>
          <span>{item.times2}</span>
        </div>
        <span style={styles.note}>{item.note}</span>

        {editing ? (
          <>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={() => handleSave()}>💾</button>
            <button onClick={() => discardChanges()}>❌</button>
          </>
        ) : (
          <button onClick={() => handleEdit()}>✏️</button>
        )}
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
