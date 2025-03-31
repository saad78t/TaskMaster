import styles from "../styles";
import { useTasks } from "../../TasksProvider";

function Footer() {
  const { items, darkMode } = useTasks();
  if (!items?.length)
    return (
      <p style={styles(darkMode).footer}>
        Start adding tasks to your daily schedule.
      </p>
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
    <div style={styles(darkMode).footer}>
      <p>
        {percentage === 100
          ? "You have completed your tasks"
          : `        You have ${itemsNum} items on your list, and ${itemsCompleted} item
        completed ${percentage} %
`}
      </p>
    </div>
  );
}

export default Footer;
