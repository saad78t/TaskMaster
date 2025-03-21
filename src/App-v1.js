import { useEffect, useState } from "react";
import Header from "./components/v1/Header-v1&2";
import Form from "./components/v1/Form-v1";
import Items from "./components/v1/Items-V1&V2";
import Footer from "./components/v1/Footerv1-v2";
import SortingItems from "./components/v1/SortingItems-v1";
import styles from "./components/styles";

function App() {
  const [items, setItems] = useState(() => {
    // Try to retrieve data from localStorage when the page loads
    const savedItems = localStorage.getItem("itemsV1");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [sortBy, setSortBy] = useState("input");

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
    <div style={styles.container}>
      <Header version={version} />
      <section style={styles.formContainer}>
        <SortingItems
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearList={clearList}
        />

        <Form onAddItem={handleAddItem} />
      </section>
      {/* <Form onAddItem={handleAddItem} times2={times2} setTimes2={setTimes2} /> */}
      <Items
        sortedItems={sortedItems}
        onDeleteItem={handleDelete}
        onToggleItem={handleToggleItem}
        onEditItem={handleEditItem}
      />
      <Footer items={items} />
    </div>
  );
}

export default App;
