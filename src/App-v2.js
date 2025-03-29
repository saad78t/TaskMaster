import { useEffect, useReducer } from "react";
import Header from "./components/v2/Header-V2";
import Form from "./components/v2/Form-V2";
import Items from "./components/v2/Items-V2";
import Footer from "./components/v2/Footer-V2";
import SortingItems from "./components/v2/SortingItems-V2";
import styles from "./components/styles";
import { useSearchParams } from "react-router-dom";
import DraggableButton from "./components/v2/DraggableButton";

// const initialState = { items: [], sortBy: "input" };

function getInitialState() {
  const savedItems = localStorage.getItem("itemsV2");
  const savedDarkMode = localStorage.getItem("darkModeV2");

  return {
    darkMode: savedDarkMode ? JSON.parse(savedDarkMode) : false,
    items: savedItems ? JSON.parse(savedItems) : [],
    sortBy: "input",
  };
  // const savedItems = localStorage.getItem("itemsV2");
  // return savedItems
  //   ? { items: JSON.parse(savedItems), sortBy: "input" }
  //   : { items: [], sortBy: "input" };
}

function reducer(state, action) {
  console.log("Reducer received action:", action);
  switch (action.type) {
    case "dark/mode":
      return { ...state, darkMode: !state.darkMode };
    case "set/items":
      return { ...state, items: action.payload };
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
        : { items: [], sortBy: "input", darkMode: state.darkMode }; // Reset state if confirmed
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
      console.error(`Unknown action type: ${action.type}`, action);
      return state;
  }
}

function App() {
  const [{ items, sortBy, darkMode }, dispatch] = useReducer(
    reducer,
    null,
    getInitialState
  );
  const [searchParams, setSearchParams] = useSearchParams();

  //Retrieve data from URL (with error protection)
  useEffect(() => {
    const tasksFromUrl = searchParams.get("tasks");

    if (tasksFromUrl) {
      try {
        const decodedData = decodeURIComponent(tasksFromUrl);
        console.log("📥 Data retrieved from the link:", decodedData);

        const parsedItems = JSON.parse(decodedData);

        if (Array.isArray(parsedItems)) {
          dispatch({ type: "set/items", payload: parsedItems });
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

  useEffect(
    function () {
      localStorage.setItem("darkModeV2", JSON.stringify(darkMode ?? false));
    },
    [darkMode]
  );

  useEffect(() => {
    const newParams = new URLSearchParams();
    try {
      if (items?.length > 0) {
        const encodedData = encodeURIComponent(JSON.stringify(items));
        newParams.set("tasks", encodedData);
      } else {
        newParams.delete("tasks");
      }
    } catch (e) {
      console.log("error", e);
    }

    setSearchParams(newParams);
  }, [items, setSearchParams]);

  useEffect(() => {
    console.log("Updated items:", items);
  }, [items]);

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

  function toggleDarkMode() {
    dispatch({ type: "dark/mode" });
  }

  return (
    <div style={styles(darkMode).container}>
      <Header
        version={version}
        darkMode={darkMode}
        // toggleDarkMode={toggleDarkMode}
      />
      <DraggableButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <section style={styles(darkMode).formContainer}>
        <SortingItems
          sortBy={sortBy}
          darkMode={darkMode}
          dispatch={dispatch}
          clearList={clearList}
        />

        <Form onAddItem={handleAddItem} darkMode={darkMode} />
      </section>
      {/* <Form onAddItem={handleAddItem} times2={times2} setTimes2={setTimes2} /> */}
      <Items
        sortedItems={sortedItems}
        darkMode={darkMode}
        onDeleteItem={handleDelete}
        onToggleItem={handleToggleItem}
        onEditItem={handleEditItem}
      />
      <Footer items={items} darkMode={darkMode} />
    </div>
  );
}

export default App;
