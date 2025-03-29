import { useState } from "react";
import styles from "../styles";

function Item({ item, onDeleteItem, onToggleItem, onEditItem, darkMode }) {
  const [hover, setHover] = useState(false);
  const [newNote, setNewNote] = useState(item.note);
  const [accepted, setAccepted] = useState(false);
  const [readmore, SetReadMore] = useState(false);

  function handleReadMore() {
    SetReadMore((readmore) => !readmore);
  }

  const noteText = readmore ? item.note : `${item.note.slice(0, 5)}...`;

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
    <div style={styles(darkMode).item}>
      <li style={styles(darkMode).listItem}>
        <div>
          <div style={styles(darkMode).times}>
            <span>{item.times1}</span>
            <span>{item.times2}</span>
          </div>
        </div>
        <div style={styles(darkMode).noteContainer}>
          <div style={styles(darkMode).noteWrapper}>
            <span style={styles(darkMode).note}>{noteText}</span>
            <button
              style={styles(darkMode).transparentReadMoreButton}
              onClick={handleReadMore}
            >
              read more
            </button>
          </div>
        </div>

        {accepted ? (
          <>
            <button
              style={styles(darkMode).transparentButton}
              onClick={() => editName()}
            >
              💾
            </button>
            <button
              style={styles(darkMode).transparentButton}
              onClick={() => cancelChanges()}
            >
              ❌
            </button>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
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
