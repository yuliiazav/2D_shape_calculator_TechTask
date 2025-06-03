import styles from "./ShapeInputForm.module.css";
import { useState } from "react";
import { getShapeCalculations } from "../../helpers/shapeCalculations";
import SquareInput from "../inputs/SquareInput";
import RectangleInput from "../inputs/RectangleInput";
import CircleInput from "../inputs/CircleInput";
import TriangleInput from "../inputs/TriangleInput";
import RhombusInput from "../inputs/RhombusInput";
import ShapeTextAreaInput from "../inputs/ShapeTextAreaInput";

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
        // 'Circle Radius 34' or 'Circle Radius 34 Center 1 7'. Radius should be >0
        if (
          textAreaParts[1] === "Radius" &&
          isValidNumber(parseFloat(textAreaParts[2])) &&
          parseFloat(textAreaParts[2] > 0)
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
            "Invalid Circle parameters. Radius should be > 0. Check samples: 'Circle Radius 34' or 'Circle Radius 34 Center 1 7'."
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
          <SquareInput
            inputValues={inputValues}
            onInputChange={handleInputChange}
          />
        )}
        {selectedShape === "Rectangle" && (
          <RectangleInput
            inputValues={inputValues}
            onInputChange={handleInputChange}
          />
        )}
        {selectedShape === "Circle" && (
          <CircleInput
            inputValues={inputValues}
            onInputChange={handleInputChange}
          />
        )}
        {selectedShape === "Triangle" && (
          <TriangleInput
            inputValues={inputValues}
            onInputChange={handleInputChange}
          />
        )}
        {selectedShape === "Rhombus" && (
          <RhombusInput
            inputValues={inputValues}
            onInputChange={handleInputChange}
          />
        )}
        <ShapeTextAreaInput
          textareaInput={textareaInput}
          onTextareaChange={handleTextareaChange}
        />
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
