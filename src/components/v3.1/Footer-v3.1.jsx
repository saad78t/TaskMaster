import { useContext } from "react";
import styles from "../styles";
import { TasksContext } from "../../App-v3.1";

function Footer() {
  const { items } = useContext(TasksContext);
  if (!items?.length)
    return (
      <p style={styles.footer}>Start adding tasks to your daily schedule.</p>
    );

  const itemsNum = items.length;

  const itemsCompleted = items.reduce(
    (accumulator, currentValue) => accumulator + currentValue.completed,
    0
  );

  const percentage = Math.round((itemsCompleted / itemsNum) * 100);

  //another way of getting number of completed items
  // const itemsCompleted = items.filter(item=> item.completed).length

  return (
    <div style={styles.footer}>
      <p>
        {percentage === 100
          ? "you have completed your tasks"
          : `        You have ${itemsNum} items on your list, and ${itemsCompleted} item
        completed ${percentage} %
`}
      </p>
    </div>
  );
}

export default Footer;
