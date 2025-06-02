const PI = Math.PI;

export const getShapeCalculations = (type, data) => {
  let getPerimeter = () => 0;
  let getArea = () => 0;

  switch (type) {
    case "Square":
      if (data.side) {
        const side = data.side;
        getPerimeter = () => 4 * side;
        getArea = () => side * side;
      } else if (
        data.x1 != null &&
        data.y1 != null &&
        data.x2 != null &&
        data.y2 != null
      ) {
        const side = Math.abs(data.x2 - data.x1);
        getPerimeter = () => 4 * side;
        getArea = () => side * side;
      }
      break;

    case "Rectangle":
      if (
        data.x1 != null &&
        data.y1 != null &&
        data.x2 != null &&
        data.y2 != null
      ) {
        const width = Math.abs(data.x2 - data.x1);
        const height = Math.abs(data.y2 - data.y1);

        getPerimeter = () => 2 * (width + height);
        getArea = () => width * height;
      }
      break;

    case "Circle":
      if (data.radius) {
        const radius = data.radius;
        getPerimeter = () => 2 * PI * radius;
        getArea = () => PI * radius * radius;
      }
      break;

    case "Triangle":
      if (data.p1 && data.p2 && data.p3) {
        const p1 = data.p1;
        const p2 = data.p2;
        const p3 = data.p3;

        // Side length between p2 and p3
        const sideA_x = p3.x - p2.x;
        const sideA_y = p3.y - p2.y;
        const sideA = Math.sqrt(sideA_x * sideA_x + sideA_y * sideA_y);

        // Side length between p1 and p3
        const sideB_x = p3.x - p1.x;
        const sideB_y = p3.y - p1.y;
        const sideB = Math.sqrt(sideB_x * sideB_x + sideB_y * sideB_y);

        // Side length between p1 and p2

        const sideC_x = p2.x - p1.x;
        const sideC_y = p2.y - p1.y;
        const sideC = Math.sqrt(sideC_x * sideC_x + sideC_y * sideC_y);

        getPerimeter = () => sideA + sideB + sideC;

        getArea = () => {
          const s = (sideA + sideB + sideC) / 2;
          const areaSquared = s * (s - sideA) * (s - sideB) * (s - sideC);
          return areaSquared > 0 ? Math.sqrt(areaSquared) : 0;
        };
      }
      break;

    case "Rhombus":
      if (data.d1 && data.d2 && data.side) {
        const diagonal1 = data.d1;
        const diagonal2 = data.d2;
        const side = data.side;

        getPerimeter = () => 4 * side;
        getArea = () => (diagonal1 * diagonal2) / 2;
      }
      break;

    default:
      console.warn(`Unknown shape type: ${type}`);
      break;
  }

  return { getPerimeter, getArea };
};
