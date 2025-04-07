import { useTasks } from "../../TasksProvider";

function EditableField({
  value,
  isEditing,
  setEditing,
  newValue,
  setNewValue,
  item,
  field,
  onEditTimes,
  saveEditing,
  cancelEditing,
}) {
  const { darkMode } = useTasks();

  function editTimes() {
    if (newValue <= 0 || newValue >= 21) return;
    onEditTimes(item.id, field, newValue);
    saveEditing();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") editTimes();
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
          <div style={{ display: "flex", gap: "5px", marginBottom: "3px" }}>
            <button onClick={editTimes} style={buttonStyle(darkMode)}>
              &#x2713;
            </button>
            <button
              onClick={cancelEditing}
              style={{
                ...buttonStyle(darkMode),
                color: darkMode && "#FF0000",
                fontSize: "30px",
              }}
            >
              &times;
            </button>
          </div>

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
        <span onClick={setEditing} style={textStyle}>
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
