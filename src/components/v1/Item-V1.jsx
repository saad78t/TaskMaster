import { useState } from "react";
import styles from "../styles";
import EditableField from "./EditableField-V1";

function Item({
  item,
  onDeleteItem,
  onToggleItem,
  onEditItem,
  onEditTimes,
  darkMode,
}) {
  const [hover, setHover] = useState(false);
  const [newNote, setNewNote] = useState(item.note);
  const [newTimes1, setNewTimes1] = useState(item.times1);
  const [newTimes2, setNewTimes2] = useState(item.times2);
  const [editingTimes1, setEditingTimes1] = useState(false);
  const [editingTimes2, setEditingTimes2] = useState(false);
  const [editing, setEditing] = useState(false);
  const [readmore, SetReadMore] = useState(false);

  function handleReadMore() {
    SetReadMore((readmore) => !readmore);
  }

  function handleEdit() {
    setNewNote(item.note);
    setEditing(true);
  }

  function editName() {
    const trimmedNote = newNote.trim();
    if (!trimmedNote) return;
    onEditItem(item.id, trimmedNote);
    setEditing(false);
  }

  function cancelChanges() {
    setEditing(false);
    setNewNote(item.note);
  }

  const noteText = readmore ? item.note : `${item.note.slice(0, 5)}...`;

  return (
    <div style={styles(darkMode).item}>
      <li style={styles(darkMode).listItem}>
        <div>
          <div style={styles(darkMode).times}>
            <EditableField
              item={item}
              onEditTimes={onEditTimes}
              value={item.times1}
              newValue={newTimes1}
              setNewValue={setNewTimes1}
              isEditing={editingTimes1}
              setEditing={setEditingTimes1}
              field="times1"
            />
            <EditableField
              item={item}
              onEditTimes={onEditTimes}
              value={item.times2}
              newValue={newTimes2}
              setNewValue={setNewTimes2}
              isEditing={editingTimes2}
              setEditing={setEditingTimes2}
              field="times2"
            />{" "}
          </div>
        </div>
        {/* <span style={styles(darkMode).note}>{item.note}</span> */}
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

        {editing ? (
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
