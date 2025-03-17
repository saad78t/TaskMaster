import { useState } from "react";
import styles from "../styles";

function Item({ item, onDeleteItem, onToggleItem, onEditItem }) {
  const [hover, setHover] = useState();
  const [newNote, setNewNote] = useState(item.note);
  const [accepted, setAccepted] = useState(false);

  function handleEdit() {
    setNewNote(item.note);
    setAccepted(true);
  }

  function editName() {
    const trimmedNote = newNote.trim();
    if (!trimmedNote) return;
    onEditItem(item.id, trimmedNote);
    setAccepted(false);
  }

  function cancelChanges() {
    setAccepted(false);
    setNewNote(item.note);
  }

  return (
    <div style={styles.item}>
      <li style={styles.listItem}>
        <div style={styles.times}>
          <span>{item.times1}</span>
          <span>{item.times2}</span>
        </div>
        <span style={styles.note}>{item.note}</span>
        <button onClick={() => handleEdit()}>✏️</button>

        {accepted ? (
          <>
            <button onClick={() => editName()}>💾</button>
            <button onClick={() => cancelChanges()}>❌</button>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
          </>
        ) : null}

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
