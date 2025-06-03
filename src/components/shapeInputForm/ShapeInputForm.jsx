import styles from "./ShapeInputForm.module.css";
import { useState } from "react";
import { getShapeCalculations } from "../../helpers/shapeCalculations";

const ShapeInputForm = ({ onAddShape, onClearResults }) => {
  const [selectedShape, setSelectedShape] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [textareaInput, setTextareaInput] = useState("");

  const handleShapeChange = (e) => {
    setSelectedShape(e.target.value);
    setInputValues({});
    setTextareaInput("");
    if (onClearResults) {
      onClearResults();
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setInputValues((previousValues) => ({
      ...previousValues,
      [name]: parseFloat(value),
    }));
    setTextareaInput("");
    if (onClearResults) {
      onClearResults();
    }
  };

  const handleTextareaChange = (e) => {
    setTextareaInput(e.target.value);
    setInputValues({});
    if (onClearResults) {
      onClearResults();
    }
    setSelectedShape("");
  };

  const isValidNumber = (num) => !isNaN(num) && typeof num === "number";

  const readTextareaInput = (inputString) => {
    const textAreaParts = inputString
      .trim()
      .split(/\s+/)
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      );

    console.log("Processed parts from textarea:", textAreaParts);

    const type = textAreaParts[0];
    const data = {};

    switch (type) {
      case "Square":
        //'Square SideLength 5' or 'Square Point1 15 2 Point2 5 5'
        if (
          textAreaParts[1] === "Sidelength" &&
          isValidNumber(parseFloat(textAreaParts[2]))
        ) {
          data.side = parseFloat(textAreaParts[2]);
        } else if (
          textAreaParts[1] === "Point1" &&
          isValidNumber(parseFloat(textAreaParts[2])) &&
          isValidNumber(parseFloat(textAreaParts[3])) &&
          textAreaParts[4] === "Point2" &&
          isValidNumber(parseFloat(textAreaParts[5])) &&
          isValidNumber(parseFloat(textAreaParts[6]))
        ) {
          data.x1 = parseFloat(textAreaParts[2]);
          data.y1 = parseFloat(textAreaParts[3]);
          data.x2 = parseFloat(textAreaParts[5]);
          data.y2 = parseFloat(textAreaParts[6]);
        } else {
          throw new Error(
            "Invalid Square parameters. Check samples: 'Square SideLength 5' or 'Square Point1 15 2 Point2 5 5'."
          );
        }
        break;
      case "Rectangle":
        //  Rectangle Point1 9 2 Point2 8 75
        if (
          textAreaParts[1] === "Point1" &&
          isValidNumber(parseFloat(textAreaParts[2])) &&
          isValidNumber(parseFloat(textAreaParts[3])) &&
          textAreaParts[4] === "Point2" &&
          isValidNumber(parseFloat(textAreaParts[5])) &&
          isValidNumber(parseFloat(textAreaParts[6]))
        ) {
          data.x1 = parseFloat(textAreaParts[2]);
          data.y1 = parseFloat(textAreaParts[3]);
          data.x2 = parseFloat(textAreaParts[5]);
          data.y2 = parseFloat(textAreaParts[6]);
        } else {
          throw new Error(
            "Invalid Rectangle parameters. Check samples: 'Rectangle Point1 9 2 Point2 8 75'."
          );
        }
        break;
      case "Circle":
        // 'Circle Radius 34' or 'Circle Radius 34 Center 1 7'
        if (
          textAreaParts[1] === "Radius" &&
          isValidNumber(parseFloat(textAreaParts[2]))
        ) {
          data.radius = parseFloat(textAreaParts[2]);
          if (
            textAreaParts[3] === "Center" &&
            isValidNumber(parseFloat(textAreaParts[4])) &&
            isValidNumber(parseFloat(textAreaParts[5]))
          ) {
            data.centerX = parseFloat(textAreaParts[4]);
            data.centerY = parseFloat(textAreaParts[5]);
          } else {
            data.centerX = 0;
            data.centerY = 0;
          }
        } else {
          throw new Error(
            "Invalid Circle parameters. Check samples: 'Circle Radius 34' or 'Circle Radius 34 Center 1 7'."
          );
        }
        break;
      case "Triangle":
        //  'Triangle Point1 9 2 Point2 8 75 Point3 9 6'
        if (
          textAreaParts[1] === "Point1" &&
          isValidNumber(parseFloat(textAreaParts[2])) &&
          isValidNumber(parseFloat(textAreaParts[3])) &&
          textAreaParts[4] === "Point2" &&
          isValidNumber(parseFloat(textAreaParts[5])) &&
          isValidNumber(parseFloat(textAreaParts[6])) &&
          textAreaParts[7] === "Point3" &&
          isValidNumber(parseFloat(textAreaParts[8])) &&
          isValidNumber(parseFloat(textAreaParts[9]))
        ) {
          data.p1 = {
            x: parseFloat(textAreaParts[2]),
            y: parseFloat(textAreaParts[3]),
          };
          data.p2 = {
            x: parseFloat(textAreaParts[5]),
            y: parseFloat(textAreaParts[6]),
          };
          data.p3 = {
            x: parseFloat(textAreaParts[8]),
            y: parseFloat(textAreaParts[9]),
          };
        } else {
          throw new Error(
            "Invalid Triangle parameters. Check samples: 'Triangle Point1 9 2 Point2 8 75 Point3 9 6'."
          );
        }
        break;
      case "Rhombus":
        //'Rhombus SideLength 5 Diagonal1 33 Diagonal2 45'
        if (
          textAreaParts[1] === "Sidelength" &&
          isValidNumber(parseFloat(textAreaParts[2])) &&
          textAreaParts[3] === "Diagonal1" &&
          isValidNumber(parseFloat(textAreaParts[4])) &&
          textAreaParts[5] === "Diagonal2" &&
          isValidNumber(parseFloat(textAreaParts[6]))
        ) {
          data.side = parseFloat(textAreaParts[2]);
          data.d1 = parseFloat(textAreaParts[4]);
          data.d2 = parseFloat(textAreaParts[6]);
        } else {
          throw new Error(
            "Invalid Rhombus parameters. Check samples: 'Rhombus SideLength 5 Diagonal1 33 Diagonal2 45'."
          );
        }
        break;
      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
    return { type, data };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let shapeData = null;

    try {
      if (selectedShape) {
        switch (selectedShape) {
          case "Square":
            if (isValidNumber(inputValues.sideLength)) {
              shapeData = {
                type: "Square",
                data: { side: inputValues.sideLength },
              };
            } else if (
              isValidNumber(inputValues.p1x) &&
              isValidNumber(inputValues.p1y) &&
              isValidNumber(inputValues.p2x) &&
              isValidNumber(inputValues.p2y)
            ) {
              shapeData = {
                type: "Square",
                data: {
                  x1: inputValues.p1x,
                  y1: inputValues.p1y,
                  x2: inputValues.p2x,
                  y2: inputValues.p2y,
                },
              };
            } else {
              alert(
                "For Square, please enter either Side Length OR coordinates for Point 1 (TopRight) and Point 2 (BottomLeft)."
              );
              return;
            }
            break;
          case "Rectangle":
            if (
              isValidNumber(inputValues.p1x) &&
              isValidNumber(inputValues.p1y) &&
              isValidNumber(inputValues.p2x) &&
              isValidNumber(inputValues.p2y)
            ) {
              shapeData = {
                type: "Rectangle",
                data: {
                  x1: inputValues.p1x,
                  y1: inputValues.p1y,
                  x2: inputValues.p2x,
                  y2: inputValues.p2y,
                },
              };
            } else {
              alert(
                "For Rectangle, enter either TopRight & BottomLeft or TopLeft & BottomRight Point Coordinates or both"
              );
              return;
            }
            break;

          case "Circle":
            if (isValidNumber(inputValues.radius)) {
              shapeData = {
                type: "Circle",
                data: {
                  radius: inputValues.radius,
                  centerX: inputValues.centerX || 0,
                  centerY: inputValues.centerY || 0,
                },
              };
            } else {
              alert("For Circle, please make sure to enter Radius.");
              return;
            }
            break;

          case "Triangle":
            if (
              isValidNumber(inputValues.p1x) &&
              isValidNumber(inputValues.p1y) &&
              isValidNumber(inputValues.p2x) &&
              isValidNumber(inputValues.p2y) &&
              isValidNumber(inputValues.p3x) &&
              isValidNumber(inputValues.p3y)
            ) {
              shapeData = {
                type: "Triangle",
                data: {
                  p1: { x: inputValues.p1x, y: inputValues.p1y },
                  p2: { x: inputValues.p2x, y: inputValues.p2y },
                  p3: { x: inputValues.p3x, y: inputValues.p3y },
                },
              };
            } else {
              alert(
                "For Triangle, please enter coordinates for Point 1, Point 2, and Point 3."
              );
              return;
            }
            break;

          case "Rhombus":
            if (
              isValidNumber(inputValues.diagonal1) &&
              isValidNumber(inputValues.diagonal2) &&
              isValidNumber(inputValues.sideLength)
            ) {
              shapeData = {
                type: "Rhombus",
                data: {
                  d1: inputValues.diagonal1,
                  d2: inputValues.diagonal2,
                  side: inputValues.sideLength,
                },
              };
            } else {
              alert(
                "For Rhombus, please enter both Diagonals Lengths and Side Length."
              );
              return;
            }
            break;

          default:
            alert("Please select a shape first.");
            return;
        }
      } else if (textareaInput) {
        const readData = readTextareaInput(textareaInput);
        shapeData = readData;
        setSelectedShape(readData.type);
      }
      if (shapeData) {
        const { type, data } = shapeData;
        const { getPerimeter, getArea } = getShapeCalculations(type, data);

        const perimeterValue = getPerimeter();
        const areaValue = getArea();

        if (onAddShape) {
          onAddShape({
            type,
            perimeter: perimeterValue.toFixed(2),
            area: areaValue.toFixed(2),
          });
        }
      }
    } catch (error) {
      alert(`Calculation error: ${error.message}`);
    }
  };

  return (
    <div className={styles["shape-input-form"]}>
      <form className={styles.selectionForm} onSubmit={handleSubmit}>
        <label htmlFor="shape-select" className={styles.inputTitle}>
          Select Shape:
        </label>
        <select
          id="shape-select"
          value={selectedShape}
          onChange={handleShapeChange}
          className={styles.select}
        >
          <option value="">-- Select --</option>
          <option value="Square">Square</option>
          <option value="Rectangle">Rectangle</option>
          <option value="Circle">Circle</option>
          <option value="Triangle">Triangle</option>
          <option value="Rhombus">Rhombus</option>
        </select>{" "}
        {selectedShape === "Square" && (
          <div className={styles["input-fields"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="sideLength">Side Length:</label>
              <input
                type="number"
                name="sideLength"
                id="sideLength"
                value={inputValues.sideLength || ""}
                onChange={handleInputChange}
                min="0"
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="p1x">Point 1 X:</label>
              <input
                type="number"
                name="p1x"
                id="p1x"
                value={inputValues.p1x || ""}
                onChange={handleInputChange}
                step="any"
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="p1y">Point 1 Y:</label>
              <input
                type="number"
                name="p1y"
                id="p1y"
                value={inputValues.p1y || ""}
                onChange={handleInputChange}
                step="any"
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="p2x">Point 2 X:</label>
              <input
                type="number"
                name="p2x"
                id="p2x"
                value={inputValues.p2x || ""}
                onChange={handleInputChange}
                step="any"
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="p2y">Point 2 Y:</label>
              <input
                type="number"
                name="p2y"
                id="p2y"
                value={inputValues.p2y || ""}
                onChange={handleInputChange}
                step="any"
              />
            </div>
          </div>
        )}
        {selectedShape === "Rectangle" && (
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
                  value={inputValues.p1x || ""}
                  onChange={handleInputChange}
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
                  value={inputValues.p1y || ""}
                  onChange={handleInputChange}
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
                  value={inputValues.p2x || ""}
                  onChange={handleInputChange}
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
                  value={inputValues.p2y || ""}
                  onChange={handleInputChange}
                  step="any"
                  required
                />
              </div>
            </div>
          </div>
        )}
        {selectedShape === "Circle" && (
          <div className={styles["input-fields"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="radius">Radius:</label>
              <input
                type="number"
                name="radius"
                id="radius"
                value={inputValues.radius || ""}
                onChange={handleInputChange}
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
                value={inputValues.centerX || ""}
                onChange={handleInputChange}
                step="any"
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="centerY">Center Y:</label>
              <input
                type="number"
                name="centerY"
                id="centerY"
                value={inputValues.centerY || ""}
                onChange={handleInputChange}
                step="any"
              />
            </div>
          </div>
        )}
        {selectedShape === "Triangle" && (
          <div className={styles["input-fields"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="p1x">Point 1 X:</label>
              <input
                type="number"
                name="p1x"
                id="p1x"
                value={inputValues.p1x || ""}
                onChange={handleInputChange}
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
                value={inputValues.p1y || ""}
                onChange={handleInputChange}
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
                value={inputValues.p2x || ""}
                onChange={handleInputChange}
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
                value={inputValues.p2y || ""}
                onChange={handleInputChange}
                step="any"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="p3x">Point 3 X:</label>
              <input
                type="number"
                name="p3x"
                id="p3x"
                value={inputValues.p3x || ""}
                onChange={handleInputChange}
                step="any"
                required
              />
            </div>
            <div className={styles["form-group"]}>
              <label htmlFor="p3y">Point 3 Y:</label>
              <input
                type="number"
                name="p3y"
                id="p3y"
                value={inputValues.p3y || ""}
                onChange={handleInputChange}
                step="any"
                required
              />
            </div>
          </div>
        )}
        {selectedShape === "Rhombus" && (
          <div className={styles["input-fields"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="sideLength">Side Length:</label>
              <input
                type="number"
                name="sideLength"
                id="sideLength"
                value={inputValues.sideLength || ""}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                step="any"
                required
              />
            </div>
          </div>
        )}
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
                onChange={handleTextareaChange}
                placeholder="e.g., Square SideLength 5 Point1 5 2 Point2 15 5"
                rows="2"
              ></textarea>
            </div>
            <div className={styles.textareaTips}>
              <span>
                ' Square SideLength 5 ' or ' Square Point1 5 2 Point2 15 5 '
              </span>
              <span>' Rectangle Point1 9 2 Point2 8 75 '</span>
              <span>
                ' Circle Radius 34 ' or ' Circle Radius 34 Center 1 7 '
              </span>
              <span>' Triangle Point1 9 2 Point2 8 75 Point3 9 6 '</span>
              <span>' Rhombus SideLength 5 Diagonal1 33 Diagonal2 45 '</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={!selectedShape && !textareaInput}
        >
          Calculate
        </button>
      </form>
    </div>
  );
};

export default ShapeInputForm;
