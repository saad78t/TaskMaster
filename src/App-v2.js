import { useEffect, useReducer } from "react";
import Header from "./components/v2/Header-v2";
import Form from "./components/v2/Form-v2";
import Items from "./components/v1/Items-V1&V2";
import Footer from "./components/v1/Footerv1-v2";
import SortingItems from "./components/v2/SortingItems-v2";
import styles from "./components/styles";

// const initialState = { items: [], sortBy: "input" };

function getInitialState() {
  const savedItems = localStorage.getItem("itemsV2");
  return savedItems
    ? { items: JSON.parse(savedItems), sortBy: "input" }
    : { items: [], sortBy: "input" };
}

function reducer(state, action) {
  switch (action.type) {
    case "add/item":
      return { ...state, items: [...state.items, action.payload] };
    case "sort":
      return { ...state, sortBy: action.payload };
    case "delete/item":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "toggle/item":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item
        ),
      };
    //Prevents clearing if the list is already empty.
    //Only clears the state if the user confirms.
    // Returns a copy of initialState to reset all values properly.
    case "clear":
      return !state.items.length ||
        !window.confirm("Are you sure you want to delete all items?")
        ? state // If no items or user cancels, return the current state
        : { items: [], sortBy: "input" }; // Reset state if confirmed
    case "edit/item":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                note: action.payload.newNote,
              }
            : item
        ),
      };

    default:
      throw new Error("SOMETHING WENT WRONG");
  }
}

function App() {
  const [{ items, sortBy }, dispatch] = useReducer(
    reducer,
    null,
    getInitialState
  );

  useEffect(
    function () {
      localStorage.setItem("itemsV2", JSON.stringify(items));
    },
    [items]
  );

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
    dispatch({ type: "add/item", payload: item });
  }

  function handleDelete(id) {
    dispatch({ type: "delete/item", payload: id });
  }

  function handleToggleItem(id) {
    dispatch({ type: "toggle/item", payload: id });
  }

  function clearList() {
    dispatch({ type: "clear" });
  }

  function handleEditItem(id, newNote) {
    dispatch({ type: "edit/item", payload: { id, newNote } });
  }

  return (
    <div style={styles.container}>
      <Header version={version} />
      <section style={styles.formContainer}>
        <SortingItems
          sortBy={sortBy}
          dispatch={dispatch}
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
