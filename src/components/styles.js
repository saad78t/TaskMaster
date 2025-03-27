const styles = (darkMode) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1, // يضمن التمدد لملء المساحة المتبقية
    gridTemplateRows: "auto auto 1fr auto", // Header | Form + Controls | Items | Footer
    gridTemplateAreas: `
      "header"
      "form-container"
      "items"
      "footer"
    `,
    minHeight: "100vh",
    gap: "10px",
    padding: "10px",
    background: darkMode ? "#1e1e1e" : "#f0f0f0",
    color: darkMode ? "#ffffff" : "#000000",
  },
  header: {
    gridArea: "header",
    display: "flex",
    justifyContent: "center", // Centers the content
    alignItems: "center",
    position: "relative", // Allows absolute positioning inside
    background: darkMode ? "#333" : "#4facfe",
    color: "white",
    padding: "50px",
    fontSize: "24px",
    fontWeight: "bold",
    borderBottom: `2px solid ${darkMode ? "#555" : "#ccc"}`,
  },
  headerText: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)", // Centers the text exactly
    fontWeight: "bold",
  },

  formContainer: {
    display: "flex",
    flexDirection: "column", // يجعل العناصر أسفل بعضها إذا كانت الشاشة صغيرة
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // ضمان امتداد الفورم ليشمل كل المحتوى
    padding: "15px",
    background: darkMode ? "#292929" : "#f8f8f8",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease-in-out",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    width: "330px",
    transition: "all 0.3s ease-in-out", // Smooth animation
    marginLeft: "50px",
  },
  select: {
    textTransform: "uppercase",
    flex: "1",
    padding: "10px",
    width: "55px",
    fontSize: "16px",
    borderRadius: "5px",
    border: `1px solid ${darkMode ? "#888" : "#aaa"}`,
    background: darkMode ? "#444" : "white",
    color: darkMode ? "white" : "black",
  },
  clearButton: {
    textTransform: "uppercase",
    padding: "10px 15px",
    background: "#ff5c5c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s ease", // Smooth hover effect
  },
  clearButtonHover: {
    background: "#e04444",
  },
  form: {
    display: "flex",
    flexWrap: "wrap", // يسمح للعناصر بالانتقال لسطر جديد عند الحاجة
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    width: "100%", // يضمن أن جميع العناصر تستغل المساحة المتاحة
    padding: "10px",
    maxWidth: "600px", // يمنع تمدد العناصر أكثر من اللازم
  },
  input: {
    width: "300px", // تكبير عرض input فقط
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: `1px solid ${darkMode ? "#888" : "#aaa"}`,
    background: darkMode ? "#444" : "white",
    color: darkMode ? "white" : "black",
    flex: "none", // يمنع الـ input من التأثير على العناصر الأخرى
  },
  // كلاس خاص للدارك مود لتغيير لون placeholder
  darkModePlaceholder: `
    input::placeholder {
      color: #bbb !important;
    }
    input::-webkit-input-placeholder {
      color: #bbb !important;
    }
    input::-moz-placeholder {
      color: #bbb !important;
    }
  `,
  submitButton: {
    textTransform: "uppercase",
    padding: "12px 20px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    flexShrink: 0, // يمنع تقلص الزر عند تصغير الشاشة
    minWidth: "60px", // يضمن عدم تصغير الزر أكثر من اللازم
    transition: "background 0.3s ease",
  },
  submitButtonHover: {
    background: "#218838",
  },
  transparentButton: {
    background: "transparent",
    border: "none",
    color: "inherit",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
  itemsContainer: {
    gridArea: "items",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "15px",
    background: darkMode ? "#222" : "#fff",
    borderRadius: "8px",
    overflowY: "auto",
    maxHeight: "50vh",
    transition: "all 0.3s ease-in-out", // Smooth scroll effect
  },
  item: {
    display: "flex",
    alignItems: "center",
    background: darkMode ? "#444" : "#eee",
    padding: "10px",
    borderRadius: "8px",
    borderBottom: `1px solid ${darkMode ? "#666" : "#bbb"}`,
    transition: "all 0.3s ease-in-out",
    marginBottom: "10px", // Adds space between items
    height: "auto", // Ensures the container grows with content
    minHeight: "50px", // Optional: Sets a minimum height for better spacing
  },
  times: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: darkMode ? "white" : "red",
    gap: "18px",
    marginRight: "30px",
    fontWeight: "bold",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: "10px",
    listStyle: "none",
    padding: "5px",
  },
  note: {
    flex: "1",
    whiteSpace: "normal", // Allows multi-line text
    wordWrap: "break-word", // Prevents text overflow
    wordBreak: "break-word", // Ensures long words are broken up
    overflow: "hidden",
    textOverflow: "ellipsis", // Adds "..." for overly long text if desired
  },
  checkbox: {
    width: "18px",
    transform: "scale(1.5)",
    height: "18px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#ff5c5c",
    color: "white",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "5px",
    padding: "5px 10px",
    transition: "background 0.3s ease",
  },
  deleteButtonHover: {
    background: "#e04444",
  },
  footer: {
    gridArea: "footer",
    background: darkMode ? "#333" : "#222",
    color: "white",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    borderTop: `2px solid ${darkMode ? "#555" : "#ccc"}`,
    zIndex: "5",
  },
  toggleButton: {
    position: "absolute",
    right: "20px", // Moves the button to the far right
    padding: "10px 15px",
    background: darkMode ? "#FFD700" : "#333",
    color: darkMode ? "black" : "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  actionsContainer: {
    display: "flex", // يجعل العناصر في صف واحد
    alignItems: "center", // محاذاة عمودية
    justifyContent: "space-between", // يباعد العناصر بالتساوي
    gap: "35px", // مسافة بين الأيقونات
  },
  // ✅ Responsive Styles (For Mobile)
  "@media (max-width: 787px)": {
    form: {
      flexDirection: "grid", // Stack controls & form
      alignItems: "stretch",
    },
    controls: {
      width: "100%", // Full width on small screens
      flexDirection: "column",
    },
    select: {
      width: "100%",
    },
    input: {
      width: "100%",
    },
  },
});

export default styles;
