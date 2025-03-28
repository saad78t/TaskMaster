/*
Why Not Check in the Reducer?
1. Reducers should be pure functions and shouldn't 
   include conditions that prevent state updates
   based on input validation.
2. Input validation should be done before dispatching
   an action (in handleSubmit).
3. If you add this check inside reducer,
   every action type would need validation,
   making the code harder to maintain.
*/

import { useContext, useReducer } from "react";
import styles from "../styles";
import SelectComponent from "../SelectComponent";
import Button from "../Button";
import { TasksContext } from "../../App-v3.1";

const initialState = {
  note: "",
  times1: 1,
  times2: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "add/note":
      return {
        ...state,
        note: action.payload,
      };
    case "add/times1":
      return {
        ...state,
        times1: action.payload,
      };
    case "add/times2":
      return {
        ...state,
        times2: action.payload,
      };
    case "reset":
      return { ...initialState };
    default:
      throw new Error("SOMETHING WENT WRONG");
  }
}

function Form() {
  const [{ note, times1, times2 }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { onAddItem, darkMode } = useContext(TasksContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (!note.trim()) return;

    const newItem = {
      note,
      times1,
      times2,
      completed: false,
      id: Date.now(),
    };
    onAddItem(newItem);

    // Dispatch a reset action instead of returning initialState
    dispatch({ type: "reset" });
  }

  return (
    <section>
      <form style={styles(darkMode).form} onSubmit={handleSubmit}>
        <SelectComponent
          value={times1}
          onChange={(e) =>
            dispatch({ type: "add/times1", payload: Number(e.target.value) })
          }
        />
        <SelectComponent
          value={times2}
          onChange={(e) =>
            dispatch({ type: "add/times2", payload: Number(e.target.value) })
          }
        />

        <input
          type="text"
          className={darkMode ? "dark-mode-placeholder" : ""}
          style={styles(darkMode).input}
          value={note}
          onChange={(e) =>
            dispatch({ type: "add/note", payload: e.target.value })
          }
          placeholder="enter a notification"
        />

        <Button type="add">add</Button>
      </form>
    </section>
  );
}

export default Form;
