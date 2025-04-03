import { useContext } from "react";
import { TasksContext } from "../../App-v3.1";

function EditableField({
  value,
  isEditing,
  setIsEditing,
  newValue,
  setNewValue,
  item,
  field,
  onEditTimes,
  saveEditing,
  cancelEditing,
}) {
  const { darkMode } = useContext(TasksContext);

  function saveEditTimes() {
    if (newValue <= 0 || newValue >= 21) return;
    onEditTimes(item.id, field, newValue);
    saveEditing();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") saveEditTimes();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {isEditing ? (
        <>
          <button onClick={saveEditTimes} style={buttonStyle(darkMode)}>
            &#x2713;
          </button>
          <button
            onClick={cancelEditing}
            style={{
              ...buttonStyle(darkMode),
              color: darkMode ? "#FF0000" : "blueviolet",
              fontSize: "40px",
            }}
          >
            &times;
          </button>

          <input
            type="text"
            value={newValue}
            onChange={setNewValue}
            onKeyDown={handleKeyDown}
            autoFocus
            style={inputStyle(newValue, darkMode)}
          />
        </>
      ) : (
        <span onClick={setIsEditing} style={textStyle}>
          {value}
        </span>
      )}
    </div>
  );
}

const buttonStyle = (darkMode) => ({
  padding: "3px",
  fontSize: "24px", // حجم مناسب للأيقونة
  color: darkMode ? "#90EE90" : "darkblue", // ✅ لون الأيقونة حسب الثيم
  background: "none", // ✅ إزالة أي خلفية
  border: "none", // ✅ إزالة أي حدود
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  outline: "none", // ✅ منع أي تأثير عند التركيز
});

const textStyle = { cursor: "pointer", minWidth: "30px", textAlign: "center" };
const inputStyle = (value, darkMode) => ({
  width: `${value.toString().length * 7.5}px`,
  textAlign: "center",
  padding: "2px",
  fontSize: "14px",
  border: `1px solid ${darkMode ? "#888" : "#aaa"}`,
  background: darkMode ? "#444" : "white",
  color: darkMode ? "white" : "black",
});

export default EditableField;
