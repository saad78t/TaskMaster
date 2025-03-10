import { useState } from "react";
import styles from "./styles";
import SelectComponent from "./SelectComponent";
import Button from "./Button";

function Form({ onAddItem }) {
  const [note, setNote] = useState("");
  // const [times, setTimes] = useState(1);
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
      <form style={styles.form} onSubmit={handleSubmit}>
        <SelectComponent
          value={times1}
          onChange={(e) => setTimes1(e.target.value)}
        />
        <SelectComponent
          value={times2}
          onChange={(e) => setTimes2(e.target.value)}
        />

        <input
          type="text"
          style={styles.input}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="enter a notification"
        />

        <Button type="add">add</Button>
      </form>
    </section>
  );
}

export default Form;
