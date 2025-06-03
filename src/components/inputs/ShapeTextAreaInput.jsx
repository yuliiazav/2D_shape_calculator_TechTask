import React from "react";
import styles from "../shapeInputForm/ShapeInputForm.module.css";

const ShapeTextAreaInput = ({ textareaInput, onTextareaChange }) => {
  return (
    <div className={styles["form-group"]}>
      <label htmlFor="textareaInput" className={styles.inputTitle}>
        Or enter shape data directly in required formats as samples show:
      </label>
      <div className={styles.textarea}>
        <div className={styles.textarea__box}>
          <textarea
            id="textareaInput"
            className={styles.textarea}
            value={textareaInput}
            onChange={onTextareaChange}
            placeholder="e.g., Square SideLength 5 Point1 5 2 Point2 15 5"
            rows="2"
          ></textarea>
        </div>
        <div className={styles.textareaTips}>
          <span>
            ' Square SideLength 5 ' or ' Square Point1 5 2 Point2 15 5 '
          </span>
          <span>' Rectangle Point1 9 2 Point2 8 -75 '</span>
          <span>
            ' Circle Radius 34.75 ' or ' Circle Radius 34 Center 1 7 '
          </span>
          <span>' Triangle Point1 9 2 Point2 8 75 Point3 9 6.5 '</span>
          <span>' Rhombus SideLength 5 Diagonal1 33 Diagonal2 45 '</span>
        </div>
      </div>
    </div>
  );
};

export default ShapeTextAreaInput;
