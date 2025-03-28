import { useContext, useState } from "react";
import styles from "../styles";
import { TasksContext } from "../../App-v3.1";

function Item({ item }) {
  const [hover, setHover] = useState(false);
  const [newNote, setNewNote] = useState(item.note);
  const [editing, setEditing] = useState(false);

  const { onDeleteItem, onToggleItem, editItem, darkMode } =
    useContext(TasksContext);

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
    <div style={styles(darkMode).item}>
      <li style={styles(darkMode).listItem}>
        <div style={styles(darkMode).times}>
          <span>{item.times1}</span>
          <span>{item.times2}</span>
        </div>
        <span style={styles(darkMode).note}>{item.note}</span>

        {editing ? (
          <>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button
              style={styles(darkMode).transparentButton}
              onClick={() => handleSave()}
            >
              💾
            </button>
            <button
              style={styles(darkMode).transparentButton}
              onClick={() => discardChanges()}
            >
              ❌
            </button>
          </>
        ) : (
          <div style={styles(darkMode).actionsContainer}>
            <button
              style={styles(darkMode).transparentButton}
              onClick={() => handleEdit()}
            >
              ✏️
            </button>

            <input
              style={styles(darkMode).checkbox}
              type="checkbox"
              checked={item.completed}
              onChange={() => onToggleItem(item.id)}
            />
            <button
              onClick={() => onDeleteItem(item.id)}
              style={
                hover
                  ? {
                      ...styles(darkMode).deleteButton,
                      ...styles(darkMode).deleteButtonHover,
                    }
                  : styles(darkMode).deleteButton
              }
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              &times;
            </button>
          </div>
        )}
      </li>
    </div>
  );
}

export default Item;
