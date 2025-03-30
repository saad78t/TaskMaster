import Header from "./v3.2/Header-V3.2";
import Form from "./componentsv3.2/Form-V3.2";
import Items from "./componentsv3.2/Items-V3.2";
import Footer from "./componentsv3.2/Footer-V3.2";
import SortingItems from "./componentsv3.2/SortingItems-V3.2";
import styles from "./components/styles";
import { useTasks } from "./TasksProvider";
import DraggableButton from "./components/v3.2/DraggableButton-V3.2";

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
