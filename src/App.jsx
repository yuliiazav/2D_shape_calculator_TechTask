import React from "react";
import Calculator from "./components/calculator/Calculator.jsx";
import Header from "./components/header/Header.jsx";
// import Sidebar from "./components/sidebar/Sidebar.jsx";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles["main-container"]}>
        <Header />
        <Calculator />
        {/* <Sidebar /> */}
      </div>
    </div>
  );
}

export default App;
