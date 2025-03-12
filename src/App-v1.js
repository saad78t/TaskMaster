import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Items from "./components/Items";
import Footer from "./components/Footer";
import SortingItems from "./components/SortingItems";
import styles from "./components/styles";

function App() {
  const [items, setItems] = useState([]);
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
      />
      <Footer items={items} />
    </div>
  );
}

export default App;
