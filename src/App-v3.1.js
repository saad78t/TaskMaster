import { createContext, useEffect, useReducer } from "react";
import Header from "./components/v3.1/Header-V3.1";
import Form from "./components/v3.1/Form-V3.1";
import Items from "./components/v3.1/Items-V3.1";
import Footer from "./components/v3.1/Footer-V3.1";
import SortingItems from "./components/v3.1/SortingItems-V3.1";
import styles from "./components/styles";
import { useSearchParams } from "react-router-dom";
import DraggableButton from "./components/v3.1/DraggableButton-V3.1";

// const initialState = { items: [], sortBy: "input" };

function getInitialState() {
  const savedItems = localStorage.getItem("itemsV3.1");
  const savedDarkMode = localStorage.getItem("darkModev3.1");

  return {
    items: savedItems ? JSON.parse(savedItems) : [],
    darkMode: savedDarkMode ? JSON.parse(savedDarkMode) : false,
    sortBy: "input",
  };
  // return savedItems
  //   ? { items: JSON.parse(savedItems), sortBy: "input" }
  //   : { items: [], sortBy: "input" };
}

function reducer(state, action) {
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
            ? { ...item, note: action.payload.newNote }
            : item
        ),
      };
    default:
      // throw new Error("SOMETHING WENT WRONG");
      return state;
  }
}

export const TasksContext = createContext();

function App() {
  const [{ items, sortBy, darkMode }, dispatch] = useReducer(
    reducer,
    null,
    getInitialState
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(
    function () {
      const tasksFromUrl = searchParams.get("tasks");
      if (!tasksFromUrl) return;

      try {
        const decodedData = decodeURIComponent(tasksFromUrl);
        const parsedItems = JSON.parse(decodedData);
        if (Array.isArray(parsedItems)) {
          dispatch({ type: "set/items", payload: parsedItems });
        } else {
          console.error(
            "⚠️ The returned data is not a valid array:",
            parsedItems
          );
        }
      } catch (e) {
        console.error("❌ Error parsing data from URL: ", e);
      }
    },
    [searchParams]
  );

  useEffect(() => {
    if (!items || items.length === 0) {
      setSearchParams({}); // ← **Clear values ​​if there are no elements**
      return;
    }

    const encodedData = encodeURIComponent(JSON.stringify(items));
    setSearchParams({ tasks: encodedData }); // ← **Update URL directly**
  }, [items, setSearchParams]);

  useEffect(
    function () {
      localStorage.setItem("itemsV3.1", JSON.stringify(items));
    },
    [items]
  );

  useEffect(
    function () {
      localStorage.setItem("darkModev3.1", JSON.stringify(darkMode ?? false));
    },
    [darkMode]
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

  function editItem(id, newNote) {
    dispatch({ type: "edit/item", payload: { id, newNote } });
  }

  function toggleDarkMode() {
    dispatch({ type: "dark/mode" });
  }

  return (
    <TasksContext.Provider
      value={{
        version,
        sortBy,
        sortedItems,
        items,
        darkMode,
        toggleDarkMode,
        dispatch,
        clearList,
        editItem,
        onAddItem: handleAddItem,
        onDeleteItem: handleDelete,
        onToggleItem: handleToggleItem,
      }}
    >
      <div style={styles(darkMode).container}>
        <Header />
        <DraggableButton />
        <section style={styles(darkMode).formContainer}>
          <SortingItems />
          <Form />
        </section>
        <Items />
        <Footer />
      </div>
    </TasksContext.Provider>
  );
}

export default App;
