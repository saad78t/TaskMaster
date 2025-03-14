import { createContext, useContext, useReducer } from "react";

const TasksContext = createContext();

const initialState = { items: [], sortBy: "input" };

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
        : { ...initialState }; // Reset state if confirmed

    default:
      throw new Error("SOMETHING WENT WRONG");
  }
}

function TasksProvider({ children }) {
  const [{ items, sortBy }, dispatch] = useReducer(reducer, initialState);

  // Extract version from file name (e.g., "App-v2.js" → "v2")
  // const version = import.meta.url.match(/App-(v\d+)/)?.[1] || "Unknown";
  const version = "v3.2";

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

  return (
    <TasksContext.Provider
      value={{
        version: version,
        sortBy,
        sortedItems,
        items,
        dispatch,
        clearList,
        onAddItem: handleAddItem,
        onDeleteItem: handleDelete,
        onToggleItem: handleToggleItem,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined)
    throw new Error("TasksContext was used out of the TasksProvider");
  return context;
}

export { TasksProvider, useTasks };
