import styles from "../shapeInputForm/ShapeInputForm.module.css";

const RectangleInput = ({ inputValues, onInputChange }) => {
  return (
    <div>
      {" "}
      <p className={styles["warning-msg"]}>
        *Make sure to enter either <u>TopRight & BottomLeft </u>
        or <u> TopLeft & BottomRight </u>
        Point Coordinates*
      </p>
      <div className={styles["input-fields"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="p1x">Point 1 X:</label>
          <input
            type="number"
            name="p1x"
            id="p1x"
            value={inputValues.p1x ?? ""}
            onChange={onInputChange}
            step="any"
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="p1y">Point 1 Y:</label>
          <input
            type="number"
            name="p1y"
            id="p1y"
            value={inputValues.p1y ?? ""}
            onChange={onInputChange}
            step="any"
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="p2x">Point 2 X:</label>
          <input
            type="number"
            name="p2x"
            id="p2x"
            value={inputValues.p2x ?? ""}
            onChange={onInputChange}
            step="any"
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="p2y">Point 2 Y:</label>
          <input
            type="number"
            name="p2y"
            id="p2y"
            value={inputValues.p2y ?? ""}
            onChange={onInputChange}
            step="any"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default RectangleInput;
