import { useReducer } from "react";
import styles from "../styles";
import EditableField from "./EditableField-V2";

const initialState = (item) => ({
  newNote: item.note,
  newTimes: { newTimes1: item.times1, newTimes2: item.times2 },
  hover: false,
  editing: false,
  readmore: false,
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
    case "save/editTimes":
      return {
        ...state,
        editingTimes: {
          ...state.editingTimes,
          [`editing${action.payload.field}`]: false,
        },
        ...(action.type === "cancel/EditTimes"
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

function Item({
  item,
  onDeleteItem,
  onToggleItem,
  onEditItem,
  onEditTimes,
  darkMode,
}) {
  const [
    { hover, newNote, newTimes, editingTimes, editing, readmore },
    dispatch,
  ] = useReducer(reducer, item, initialState);

  function editNote() {
    const trimmedNote = newNote.trim();
    if (!trimmedNote) return;
    onEditItem(item.id, trimmedNote);
    dispatch({ type: "save/note" });
  }

  function renderEditableField(field, value, newValue) {
    return (
      <EditableField
        darkMode={darkMode}
        item={item}
        onEditTimes={onEditTimes}
        value={value}
        newValue={newValue}
        isEditing={editingTimes[`editing${field}`]}
        setEditing={() => dispatch({ type: "start/editTimes", payload: field })}
        setNewValue={(e) =>
          dispatch({
            type: "update/times",
            payload: { field, value: Number(e.target.value) },
          })
        }
        saveNewTimes={() =>
          dispatch({ type: "save/editTimes", payload: { field } })
        }
        cancelEditTimes={() =>
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

            {/* <EditableField
              value={newTimes1}
              newValue={newTimes1}
              onEditTimes={onEditTimes}
              item={item}
              setNewValue={(e) =>
                dispatch({
                  type: "update/times1",
                  payload: Number(e.target.value),
                })
              }
              onEdit={editingTimes1}
              setOnEdit={() => dispatch({ type: "start/editTimes1" })}
              cancelEditTimes={() =>
                dispatch({
                  type: "cancel/EdiTimes1",
                  payload: item.times1,
                })
              }
              saveNewTimes={() => dispatch({ type: "save/newTimes1" })}
              field="times1"
            /> */}

            {/* <span>{item.times1}</span>
            <span>{item.times2}</span> */}
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
