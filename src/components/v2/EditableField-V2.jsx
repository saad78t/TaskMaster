function EditableField({
  value,
  isEditing,
  setEditing,
  newValue,
  setNewValue,
  item,
  field,
  onEditTimes,
  saveNewTimes,
  cancelEditTimes,
  darkMode,
}) {
  function saveTimes() {
    if (newValue <= 0 || newValue >= 21) return;
    onEditTimes(item.id, field, newValue);
    saveNewTimes();
  }

  function startEditing() {
    setEditing();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") saveTimes();
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
            <button onClick={saveTimes} style={buttonStyle(darkMode)}>
              &#x2713;
            </button>
            <button
              onClick={cancelEditTimes}
              style={{ ...buttonStyle(darkMode), color: "red" }}
            >
              &times;
            </button>
          </div>

          <input
            type="text"
            value={newValue}
            field={field}
            onChange={setNewValue}
            onKeyDown={handleKeyDown}
            autoFocus
            style={inputStyle(newValue, darkMode)}
          />
        </>
      ) : (
        <span onClick={startEditing} style={textStyle}>
          {value}
        </span>
      )}
    </div>
  );
}

const buttonStyle = (darkMode) => ({
  padding: "3px",
  fontSize: "24px", // حجم مناسب للأيقونة
  color: darkMode ? "green" : "black", // ✅ لون الأيقونة حسب الثيم
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
