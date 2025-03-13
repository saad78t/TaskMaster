import Header from "./components/Header";
import Form from "./components/Form";
import Items from "./components/Items";
import Footer from "./components/Footer";
import SortingItems from "./components/SortingItems";
import styles from "./components/styles";
import { TasksProvider } from "./TasksProvider";

function App() {
  return (
    <TasksProvider>
      <div style={styles.container}>
        <Header />
        <section style={styles.formContainer}>
          <SortingItems />
          <Form />
        </section>
        <Items />
        <Footer />
      </div>
    </TasksProvider>
  );
}

export default App;
