import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "./components/v1/Header-V1";
import Form from "./components/v1/Form-V1";
import Items from "./components/v1/Items-V1";
import Footer from "./components/v1/Footer-V1";
import SortingItems from "./components/v1/SortingItems-V1";
import styles from "./components/styles";
import DraggableButton from "./components/v1/DraggableButton-V1";

function App() {
  const [items, setItems] = useState(() => {
    // Try to retrieve data from localStorage when the page loads
    const savedItems = localStorage.getItem("itemsV1");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [sortBy, setSortBy] = useState("input");
  const [searchParams, setSearchParams] = useSearchParams();
  // Retrieve dark mode state from localStorage when loading the application
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkModeV1") === "true"; // Convert text to boolean
  });

  // Save the dark mode state to localStorage when changing it
  useEffect(() => {
    localStorage.setItem("darkModeV1", darkMode);
  }, [darkMode]);

  //Retrieve data from URL (with error protection)
  useEffect(() => {
    const tasksFromUrl = searchParams.get("tasks");

    if (tasksFromUrl) {
      try {
        const decodedData = decodeURIComponent(tasksFromUrl);
        console.log("📥 Data retrieved from the link:", decodedData);

        // Check if the data is in JSON format or just text
        if (!decodedData.startsWith("[") || !decodedData.endsWith("]")) {
          console.warn("⚠️ The returned data is not valid JSON:", decodedData);
          return;
        }

        const parsedItems = JSON.parse(decodedData);
        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
        } else {
          console.error(
            "⚠️ The returned data is not a valid array:",
            parsedItems
          );
        }
      } catch (error) {
        console.error("❌ Error parsing data from URL:", error);
      }
    }
  }, [searchParams]);

  //Update the data in the link correctly
  useEffect(() => {
    const newParams = new URLSearchParams();

    if (items.length > 0) {
      const encodedData = encodeURIComponent(JSON.stringify(items));
      newParams.set("tasks", encodedData);
    } else {
      newParams.delete("tasks"); // Delete key when list is empty
    }

    setSearchParams(newParams);
  }, [items, setSearchParams]);

  // Extract version from file name (e.g., "App-v2.js" → "v2")
  const version = import.meta.url.match(/App-(v\d+)/)?.[1] || "Unknown";

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "note")
    sortedItems = items.slice().sort((a, b) => a.note.localeCompare(b.note));
  if (sortBy === "completed")
    sortedItems = items
      .slice()
      .sort((a, b) => a.completed * 1 - Number(b.completed) * 1);

  useEffect(
    function () {
      localStorage.setItem("itemsV1", JSON.stringify(items));
    },
    [items]
  );

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((itm) => itm.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((itm) =>
        itm.id === id ? { ...itm, completed: !itm.completed } : itm
      )
    );
  }

  function clearList() {
    if (!items.length) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  function handleEditItem(id, newNote) {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, note: newNote } : item))
    );
  }

  return (
    <div style={styles(darkMode).container}>
      <Header
        version={version}
        darkMode={darkMode}
        // toggleDarkMode={() => setDarkMode((darkMode) => !darkMode)}
      />
      <DraggableButton
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((darkMode) => !darkMode)}
      />
      {console.log("DRAGAABLE BUTTON", darkMode)}
      <section style={styles(darkMode).formContainer}>
        <SortingItems
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearList={clearList}
          darkMode={darkMode}
        />

        <Form onAddItem={handleAddItem} darkMode={darkMode} />
      </section>
      {/* <Form onAddItem={handleAddItem} times2={times2} setTimes2={setTimes2} /> */}
      <Items
        sortedItems={sortedItems}
        onDeleteItem={handleDelete}
        onToggleItem={handleToggleItem}
        onEditItem={handleEditItem}
        darkMode={darkMode}
      />
      <Footer items={items} darkMode={darkMode} />
    </div>
  );
}

export default App;
