import Header from "./components/Header-V3.2";
import Form from "./components/Form-V3.2";
import Items from "./components/Items-V3.2";
import Footer from "./components/Footer-V3.2";
import SortingItems from "./components/SortingItems-V3.2";
import styles from "./components/styles";
import { useTasks } from "./TasksProvider";
import DraggableButton from "./components/DraggableButton-V3.2";

function App() {
  const { darkMode } = useTasks();
  return (
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
  );
}

export default App;
