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
    padding: "30px 10px",
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: `2px solid ${darkMode ? "#555" : "#ccc"}`,
  },
  headerText: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)", // لتوسيط النص
    fontWeight: "bold",
    whiteSpace: "nowrap", // منع النص من الانتقال إلى سطر جديد
    overflow: "hidden", // منع ظهور النص الزائد خارج الحاوية
    textOverflow: "ellipsis", // إضافة "..." إذا كان النص أطول من المساحة المتاحة
    maxWidth: "90%", // التأكد من أن النص لا يتجاوز عرض الشاشة
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
    background: darkMode ? "#444" : "#ff5c5c",
    color: "white",
    border: `1px solid ${darkMode ? "#bbb" : ""}`,
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s ease", // Smooth hover effect
  },
  clearButtonHover: {
    background: darkMode ? "#292929" : "#e04444",
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
    background: darkMode ? "#444" : "#28a745",
    color: "white",
    border: `1px solid ${darkMode ? "#bbb" : ""}`,
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    flexShrink: 0, // يمنع تقلص الزر عند تصغير الشاشة
    minWidth: "60px", // يضمن عدم تصغير الزر أكثر من اللازم
    transition: "background 0.3s ease",
  },
  submitButtonHover: {
    background: darkMode ? "#292929" : "#218838",
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
    flexWrap: "wrap",
    gap: "10px",
    padding: "15px",
    background: darkMode ? "#222" : "#fff",
    borderRadius: "8px",
    overflowY: "auto",
    maxHeight: "60vh",
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
  noteContainer: {
    display: "flex",
    flexDirection: "row", // ⬅ يجعل النص والزر بجانب بعض
    alignItems: "flex-start", // ⬅ يحافظ على محاذاة الزر بجانب النص
    flexWrap: "wrap", // ⬅ يسمح للنص والزر بالنزول للأسفل عند الحاجة
    gap: "5px", // ⬅ مسافة صغيرة بين النص والزر
    width: "100%",
    textAlign: "left",
  },
  noteWrapper: {
    display: "inline", // ⬅ يجعل النص والزر داخل نفس الخط
    maxWidth: "100%", // ⬅ يمنع تجاوز النص للحواف
  },
  note: {
    display: "inline", // ⬅ يجعل النص في نفس سطر الزر
    whiteSpace: "normal",
    wordWrap: "break-word",
    wordBreak: "break-word",
    overflow: "hidden",
  },
  transparentReadMoreButton: {
    display: "inline", // ⬅ يجعل الزر في نفس السطر مع النص
    background: "transparent",
    border: "none",
    color: darkMode ? "yellow" : "blue",
    cursor: "pointer",
    padding: "0",
    fontSize: "inherit",
    marginLeft: "4px", // ⬅️ يضيف مسافة صغيرة بين النص والزر
  },
  checkbox: {
    width: "18px",
    transform: "scale(1.5)",
    height: "18px",
    cursor: "pointer",
    backgroundColor: "red",
  },
  deleteButton: {
    background: darkMode ? "#444" : "#ff5c5c",
    color: "white",
    border: `1px solid ${darkMode ? "#bbb" : ""}`,
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "5px",
    padding: "5px 10px",
    transition: "background 0.3s ease",
  },
  deleteButtonHover: {
    background: darkMode ? "#292929" : "#e04444",
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
    top: "65px",
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
    header: {
      fontSize: "18px", // تصغير العنوان أكثر
      padding: "20px 5px",
    },
    formContainer: {
      width: "100%", // ملء الشاشة بالكامل
      padding: "10px",
    },
    itemsContainer: {
      maxHeight: "70vh", // زيادة المساحة المتاحة للعناصر
      padding: "10px",
    },
    input: {
      width: "100%", // جعل الإدخال بعرض الشاشة
    },
    submitButton: {
      width: "100%", // جعل الزر يأخذ عرض الشاشة بالكامل
    },
  },
});

export default styles;
