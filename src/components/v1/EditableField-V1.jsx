function EditableField({
  value,
  isEditing,
  setEditing,
  newValue,
  setNewValue,
  item,
  field,
  onEditTimes,
}) {
  function editTimes() {
    if (newValue <= 0 || newValue >= 21) return; // منع القيم غير الصالحة
    onEditTimes(item.id, field, newValue); // تحديث `times1` أو `times2`
    setEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      editTimes();
    }
  }

  function handleCancel() {
    setNewValue(value); // إعادة تعيين القيمة إلى الأصلية عند الإلغاء
    setEditing(false);
  }

  function handleStartEdit() {
    setNewValue(value); // إعادة تعيين `newValue` إلى `value` عند النقر
    setEditing(true);
  }

  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(Number(e.target.value))}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              width: `${newValue.toString().length * 7}px`,
              textAlign: "center",
              padding: "1px",
              fontSize: "12px",
            }}
          />
          <div style={{ display: "flex", gap: "5px", marginTop: "3px" }}>
            <button
              onClick={editTimes}
              style={{
                padding: "3px",
                fontSize: "12px",
                color: "inherit",
                border: "none",
              }}
            >
              ✔️
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: "3px",
                fontSize: "12px",
                color: "inherit",
                border: "none",
              }}
            >
              ❌
            </button>
          </div>
        </>
      ) : (
        <span
          onClick={handleStartEdit}
          style={{ cursor: "pointer", minWidth: "30px", textAlign: "center" }}
        >
          {value}
        </span>
      )}
    </span>
  );
}

export default EditableField;
