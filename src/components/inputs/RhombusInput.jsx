import styles from "../shapeInputForm/ShapeInputForm.module.css";

const RhombusInput = ({ inputValues, onInputChange }) => {
  return (
    <div className={styles["input-fields"]}>
      <div className={styles["form-group"]}>
        <label htmlFor="sideLength">Side Length:</label>
        <input
          type="number"
          name="sideLength"
          id="sideLength"
          value={inputValues.sideLength || ""}
          onChange={onInputChange}
          step="any"
          required
          min="0"
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="diagonal1">Diagonal 1:</label>
        <input
          type="number"
          name="diagonal1"
          id="diagonal1"
          value={inputValues.diagonal1 || ""}
          onChange={onInputChange}
          step="any"
          required
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="diagonal2">Diagonal 2:</label>
        <input
          type="number"
          name="diagonal2"
          id="diagonal2"
          value={inputValues.diagonal2 || ""}
          onChange={onInputChange}
          step="any"
          required
        />
      </div>
    </div>
  );
};

export default RhombusInput;
