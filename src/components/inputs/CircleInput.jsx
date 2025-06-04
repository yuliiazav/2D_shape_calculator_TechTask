import styles from "../shapeInputForm/ShapeInputForm.module.css";

const CircleInput = ({ inputValues, onInputChange }) => {
  return (
    <div className={styles["input-fields"]}>
      <div className={styles["form-group"]}>
        <label htmlFor="radius">Radius:</label>
        <input
          type="number"
          name="radius"
          id="radius"
          value={inputValues.radius || ""}
          onChange={onInputChange}
          step="any"
          required
          min="0"
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="centerX">Center X:</label>
        <input
          type="number"
          name="centerX"
          id="centerX"
          value={inputValues.centerX ?? ""}
          onChange={onInputChange}
          step="any"
        />
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="centerY">Center Y:</label>
        <input
          type="number"
          name="centerY"
          id="centerY"
          value={inputValues.centerY ?? ""}
          onChange={onInputChange}
          step="any"
        />
      </div>
    </div>
  );
};

export default CircleInput;
