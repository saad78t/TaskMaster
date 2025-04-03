import { useContext, useReducer } from "react";
import styles from "../styles";
import { TasksContext } from "../../App-v3.1";
import EditableField from "./EditableField-V3.1";

const initialState = (item) => ({
  newNote: item.note,
  hover: false,
  editing: false,
  readmore: false,
  newTimes: { newTimes1: item.times1, newTimes2: item.times2 },
  editingTimes: { editingTimes1: false, editingTimes2: false },
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

    case "start/editTimes":
      return {
        ...state,
        editingTimes: {
          ...state.editingTimes,
          [`editing${action.payload}`]: true,
        },
      };

    case "update/times":
      return {
        ...state,
        newTimes: {
          ...state.newTimes,
          [`new${action.payload.field}`]: action.payload.value,
        },
      };

    case "cancel/editTimes":
    case "save/EditTimes":
      return {
        ...state,
        ...state,
        editingTimes: {
          ...state.editingTimes,
          [`editing${action.payload.field}`]: false,
        },
        ...(action.type === "cancel/editTimes"
          ? {
              newTimes: {
                ...state.newTimes,
                [`new${action.payload.field}`]: action.payload.value,
              },
            }
          : {}),
      };
    default:
      return state;
  }
}

function Item({ item }) {
  const [
    { hover, newNote, editing, newTimes, editingTimes, readmore },
    dispatch,
  ] = useReducer(reducer, item, initialState);

  const { onDeleteItem, onToggleItem, editItem, editTimes, darkMode } =
    useContext(TasksContext);

  function editNote() {
    const trimmedNote = newNote.trim();
    if (!trimmedNote) return;
    editItem(item.id, trimmedNote);
    dispatch({ type: "save/note" });
  }

  function renderEditableField(field, value, newValue) {
    return (
      <EditableField
        item={item}
        onEditTimes={editTimes}
        value={value}
        newValue={newValue}
        isEditing={editingTimes[`editing${field}`]}
        setIsEditing={() =>
          dispatch({
            type: "start/editTimes",
            payload: field,
          })
        }
        setNewValue={(e) =>
          dispatch({
            type: "update/times",
            payload: { field, value: Number(e.target.value) },
          })
        }
        saveEditing={() =>
          dispatch({ type: "save/EditTimes", payload: { field } })
        }
        cancelEditing={() =>
          dispatch({
            type: "cancel/editTimes",
            payload: { field, value: item[field.toLowerCase()] },
          })
        }
        field={field.toLowerCase()}
      />
    );
  }

  const noteText = readmore ? item.note : `${item.note.slice(0, 5)}...`;

  return (
    <div style={styles(darkMode).item}>
      <li style={styles(darkMode).listItem}>
        <div>
          <div style={styles(darkMode).times}>
            {renderEditableField("Times1", item.times1, newTimes["newTimes1"])}
            {renderEditableField("Times2", item.times2, newTimes["newTimes2"])}
          </div>
        </div>
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

        {editing ? (
          <>
            <input
              type="text"
              value={newNote}
              onChange={(e) =>
                dispatch({ type: "update/note", payload: e.target.value })
              }
              style={{ width: `${newNote.length * 8}px` }} // توسيع الحقل بناءً على طول النص
            />

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
