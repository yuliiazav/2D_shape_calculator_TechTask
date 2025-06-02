import { useState } from "react";
import ShapeInputForm from "../shapeInputForm/ShapeInputForm";
import ShapeOutput from "../shapeOutput/ShapeOutput";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const [currentShapeResults, setCurrentShapeResults] = useState(null);

  const handleAddShape = (shapeData) => {
    setCurrentShapeResults(shapeData);
  };

  const handleClearResults = () => {
    setCurrentShapeResults(null);
  };

  return (
    <>
      <div className={styles["calculator-container"]}>
        <p className={styles["calculator-container__heading"]}>
          To calculate Perimeter and Area, select the shape first and enter{" "}
          <span className={styles.accentText}>
            points coordinates and details
          </span>{" "}
          below:{" "}
        </p>{" "}
        <ShapeInputForm
          onAddShape={handleAddShape}
          onClearResults={handleClearResults}
        />
        <ShapeOutput results={currentShapeResults} />
      </div>
    </>
  );
};

export default Calculator;
