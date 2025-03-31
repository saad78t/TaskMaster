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
    <span>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(Number(e.target.value))}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{ width: `${newValue.toString().length * 7}px` }}
          />
          <button onClick={editTimes}>✔️</button>
          <button onClick={handleCancel}>❌</button>
        </>
      ) : (
        <span onClick={handleStartEdit} style={{ cursor: "pointer" }}>
          {value}
        </span>
      )}
    </span>
  );
}

export default EditableField;
