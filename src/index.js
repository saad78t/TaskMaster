import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App-v2";
import { BrowserRouter } from "react-router-dom";
// eslint-disable-next-line
import { TasksProvider } from "./TasksProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <TasksProvider> */}
      <App />
      {/* </TasksProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
