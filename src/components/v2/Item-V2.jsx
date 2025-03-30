import { useReducer } from "react";
import styles from "../styles";

const initialState = (item) => ({
  newNote: item.note,
  hover: false,
  editing: false,
  readmore: false,
});

function reducer(state, action) {
  switch (action.type) {
    case "toggle/hover":
      return { ...state, hover: action.payload };
    case "start/edit":
      return { ...state, newNote: action.payload, editing: true };
    case "update/note":
      return { ...state, newNote: action.payload };
    case "save/note":
      return { ...state, editing: false };
    case "toggle/readmore":
      return { ...state, readmore: !state.readmore };
    case "cancel/edit":
      return {
        ...state,
        editing: false,
        newNote: action.payload,
      };
    default:
      return state;
  }
}

function Item({ item, onDeleteItem, onToggleItem, onEditItem, darkMode }) {
  const [{ hover, newNote, editing, readmore }, dispatch] = useReducer(
    reducer,
    item,
    initialState
  );

  function editNote() {
    const trimmedNote = newNote.trim();
    if (!trimmedNote) return;
    onEditItem(item.id, trimmedNote);
    dispatch({ type: "save/note" });
  }

  const noteText = readmore ? item.note : `${item.note.slice(0, 5)}...`;

  return (
    <div style={styles(darkMode).item}>
      <li style={styles(darkMode).listItem}>
        <div>
          <div style={styles(darkMode).times}>
            <span>{item.times1}</span>
            <span>{item.times2}</span>
          </div>
        </div>
        {!editing && (
          <div style={styles(darkMode).noteContainer}>
            <div style={styles(darkMode).noteWrapper}>
              <span style={styles(darkMode).note}>{noteText}</span>
              <button
                style={styles(darkMode).transparentReadMoreButton}
                onClick={() => dispatch({ type: "toggle/readmore" })}
              >
                read more
              </button>
            </div>
          </div>
        )}

        {editing ? (
          <>
            <button
              style={styles(darkMode).transparentButton}
              onClick={() => editNote()}
            >
              💾
            </button>
            <button
              style={styles(darkMode).transparentButton}
              onClick={() =>
                dispatch({ type: "cancel/edit", payload: item.note })
              }
            >
              ❌
            </button>
            <input
              type="text"
              value={newNote}
              onChange={(e) =>
                dispatch({ type: "update/note", payload: e.target.value })
              }
              style={{ width: `${newNote.length * 8}px` }} // توسيع الحقل بناءً على طول النص
            />
          </>
        ) : (
          <div style={styles(darkMode).actionsContainer}>
            <button
              style={styles(darkMode).transparentButton}
              onClick={() =>
                dispatch({ type: "start/edit", payload: item.note })
              }
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
              onMouseEnter={() =>
                dispatch({ type: "toggle/hover", payload: true })
              }
              onMouseLeave={() =>
                dispatch({ type: "toggle/hover", payload: false })
              }
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
