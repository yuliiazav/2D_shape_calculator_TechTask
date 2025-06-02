import styles from "./ShapeOutput.module.css";

const ShapeOutput = ({ results }) => {
  if (!results) {
    return (
      <div className={styles["results-container"]}>
        <p className={styles["no-results-msg"]}>No results to show </p>
      </div>
    );
  }

  const { type, perimeter, area } = results;

  return (
    <div className={styles["results-container"]}>
      <h5 className={styles["results-heading"]}>
        Calculation results for {type}
      </h5>

      <p className={styles["results-info"]}>Perimeter: {perimeter}</p>
      <p className={styles["results-info"]}>Area: {area}</p>
    </div>
  );
};

export default ShapeOutput;
