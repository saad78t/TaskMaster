import { useState } from "react";
import styles from "../styles";
import SelectComponent from "./SelectComponent-V1";
import Button from "./Button-V1";

function Form({ onAddItem, darkMode }) {
  const [note, setNote] = useState("");
  const [times1, setTimes1] = useState(1);
  const [times2, setTimes2] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!note) return;

    const newItem = {
      note,
      times1,
      times2,
      completed: false,
      id: Date.now(),
    };
    onAddItem(newItem);

    setNote("");
    setTimes1(1);
    setTimes2(1);
  }

  return (
    <section>
      <form style={styles(darkMode).form} onSubmit={handleSubmit}>
        <SelectComponent
          darkMode={darkMode}
          value={times1}
          key="times1"
          onChange={(e) => {
            setTimes1(Number(e.target.value));
          }}
        />
        <SelectComponent
          darkMode={darkMode}
          value={times2}
          key="times2"
          onChange={(e) => {
            setTimes2(Number(e.target.value));
          }}
        />

        <input
          type="text"
          className={darkMode ? "dark-mode-placeholder" : ""}
          style={styles(darkMode).input}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="enter a notification"
        />

        <Button darkMode={darkMode} type="add">
          add
        </Button>
      </form>
    </section>
  );
}

export default Form;
