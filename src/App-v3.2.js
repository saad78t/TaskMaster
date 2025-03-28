import Header from "./components/Header";
import Form from "./components/Form";
import Items from "./components/Items";
import Footer from "./components/Footer";
import SortingItems from "./components/SortingItems";
import styles from "./components/styles";
import { useTasks } from "./TasksProvider";

function App() {
  const { darkMode } = useTasks();
  return (
    <div style={styles(darkMode).container}>
      <Header />
      <section style={styles(darkMode).formContainer}>
        <SortingItems />
        <Form />
      </section>
      <Items />
      <Footer />
    </div>
  );
}

export default App;
