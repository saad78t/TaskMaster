const styles = {
  app: {
    width: "100%",
    height: "100vh",
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
  },
  header: {
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    padding: "10px",
    textAlign: "center",
    color: "white",
    fontSize: "35px",
    fontWeight: "bold",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "600px",
    marginLeft: "auto",
    // margin: "50px auto",
    padding: "15px",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    flex: 2,
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    marginRight: "10px",
  },
  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  button: {
    textTransform: "uppercase",
    background: "#ff758c",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  listContainer: {
    position: "fixed",
    width: "100vw", // Full viewport width
    height: "50vh", // Full viewport height
    overflow: "auto",
    flex: 1, // Pushes footer to the bottom
    display: "flex", // Align items in a row
    flexWrap: "wrap", // Allows items to wrap into new rows
    justifyContent: "start", // Centers items horizontally
    alignItems: "start", // Aligns items vertically
    gap: "15px", // Space between items
    padding: "10px",
    // maxWidth: "600px", // Adjust this based on your needs
    background: "linear-gradient(to right, #ff758c, #ff7eb3)",
    margin: "0 auto", // Centers the whole container
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },

  listItem: {
    background: "#fff",
    padding: "1px",
    borderRadius: "5px",
    fontSize: "18px",
    color: "#333",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, background 0.3s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "1 1 100px", // Items take up at least 100px and adjust responsively
  },
  listItemHover: {
    background: "#ffebf0",
    transform: "scale(1.05)",
  },

  closeButton: {
    background: "red",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "transform 0.2s, background 0.3s",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  },

  footer: {
    position: "fixed", // Fix it at the bottom
    bottom: 0,
    left: 0,

    width: "100%", // Full width
    height: "100px", // Fixed small height
    padding: "1.2rem 0",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "16px",
    boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.2)", // Small shadow at the top
    background: "linear-gradient(to right, #141e30, #243b55)",
  },
  sorContainer: {
    //   position: "fixed", // Fix at bottom
    //   bottom: "100px", // 10px from bottom
    //   left: "50%", // Center horizontally
    //   transform: "translateX(-50%)", // Adjust to center properly
    //   zIndex: 1000, // Ensure it's above other elements

    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    bottom: "350px",
    marginRight: "20px",
  },
  select: {
    textTransform: "uppercase",
    padding: "10px", // Space inside
    fontSize: "16px", // Readable text
    borderRadius: "8px", // Rounded corners
    border: "2px solid #4facfe", // Border color
    background: "white", // Background color
    color: "#333", // Text color
    marginRight: "10px",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  selectHover: {
    background: "#4facfe", // Background color on hover
    color: "white", // Text color on hover
  },

  clearButton: {
    textTransform: "uppercase",
    background: "linear-gradient(45deg, #4facfe, #00f2fe)", // Gradient background
    border: "none",
    padding: "12px 24px", // Padding inside the button
    fontSize: "16px", // Readable text
    fontWeight: "bold",
    color: "white", // Text color
    borderRadius: "8px", // Smooth rounded corners
    cursor: "pointer", // Changes cursor to pointer
    transition: "all 0.3s ease-in-out", // Smooth transition
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow effect
  },
  clearButtonHover: {
    transform: "scale(1.05)", // Slightly enlarges button on hover
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
  },

  controls: {
    gridArea: "controls",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    background: "#f8f8f8",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "10px auto", // Centering the box
    width: "80%", // Adjust width as needed
  },
};

export default styles;
