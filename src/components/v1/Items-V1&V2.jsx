import Item from "../v1/Item-v1&2";
import styles from "../styles";

// const items = [
//   {
//     id: 1,
//     times: 16,
//     note: "test the first note to see what will happened",
//     completed: true,
//   },
//   { id: 2, times: 1, note: "test the second note", completed: true },
//   { id: 3, times: 4, note: "test the third note", completed: false },
//   { id: 4, times: 5, note: "test the fourth note", completed: false },
//   { id: 5, times: 7, note: "test the fifth note", completed: false },
//   { id: 6, times: 9, note: "test the sixth note", completed: false },
//   { id: 7, times: 11, note: "test the seventh note", completed: false },
// ];

function Items({
  sortedItems,
  onDeleteItem,
  onToggleItem,
  onEditItem,
  darkMode,
}) {
  return (
    <section style={styles(darkMode).itemsContainer}>
      <ul>
        {sortedItems?.map((item, i) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            key={i}
            onToggleItem={onToggleItem}
            onEditItem={onEditItem}
            darkMode={darkMode}
          />
        ))}
      </ul>
    </section>
  );
}

export default Items;
