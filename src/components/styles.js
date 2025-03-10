const styles = {
  container: {
    display: "grid",
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
  },
  header: {
    gridArea: "header",
    background: "#4facfe",
    color: "white",
    textAlign: "center",
    padding: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    borderBottom: "2px solid #ccc",
  },
  formContainer: {
    gridArea: "form-container",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "98%",
    padding: "15px",
    background: "#f8f8f8",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease-in-out", // Smooth animation
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    width: "250px",
    transition: "all 0.3s ease-in-out", // Smooth animation
    marginLeft: "50px",
  },
  select: {
    textTransform: "uppercase",
    flex: "1",
    padding: "10px",
    width: "60px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #aaa",
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
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    width: "400px",
    marginRight: "50px",
  },
  input: {
    flex: "1",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #aaa",
  },
  submitButton: {
    textTransform: "uppercase",
    padding: "10px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background 0.3s ease", // Smooth hover effect
  },
  submitButtonHover: {
    background: "#218838",
  },
  itemsContainer: {
    gridArea: "items",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "15px",
    background: "#fff",
    borderRadius: "8px",
    overflowY: "auto",
    maxHeight: "50vh",
    transition: "all 0.3s ease-in-out", // Smooth scroll effect
  },
  item: {
    display: "flex",
    alignItems: "center",
    background: "#eee",
    padding: "10px",
    borderRadius: "8px",
    borderBottom: "#bbb",
    transition: "all 0.3s ease-in-out",
    marginBottom: "10px", // Adds space between items
    height: "auto", // Ensures the container grows with content
    minHeight: "50px", // Optional: Sets a minimum height for better spacing
  },
  times: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "red",
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
    height: "18px",
    cursor: "pointer",
  },
  closeButton: {
    background: "#ff5c5c",
    color: "white",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "5px",
    padding: "5px 10px",
    transition: "background 0.3s ease",
  },
  closeButtonHover: {
    background: "#e04444",
  },
  footer: {
    gridArea: "footer",
    background: "#333",
    color: "white",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    borderTop: "2px solid #ccc",
    zIndex: "5",
  },
  // ✅ Responsive Styles (For Mobile)
  "@media (max-width: 787px)": {
    formContainer: {
      flexDirection: "column", // Stack controls & form
      alignItems: "stretch",
    },
    controls: {
      width: "100%", // Full width on small screens
      flexDirection: "column",
    },
    form: {
      width: "100%",
      flexDirection: "column",
    },
    select: {
      width: "100%",
    },
    input: {
      width: "100%",
    },
  },
};

export default styles;
