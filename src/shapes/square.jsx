const getDistance = (pA, pB) => {
  return Math.sqrt(Math.pow(pB.x - pA.x, 2) + Math.pow(pB.y - pA.y, 2));
};

export function calculateSquare(data) {
  let side;

  if (
    data.side !== undefined &&
    data.side !== null &&
    !isNaN(data.side) &&
    data.side > 0
  ) {
    side = data.side;
  } else if (
    data.x1 !== undefined &&
    data.y1 !== undefined &&
    data.x2 !== undefined &&
    data.y2 !== undefined &&
    !isNaN(data.x1) &&
    !isNaN(data.y1) &&
    !isNaN(data.x2) &&
    !isNaN(data.y2)
  ) {
    side = Math.abs(data.x2 - data.x1);

    if (side === 0) {
      throw new Error("Incorrect data: side cannot be 0.");
    }
  } else {
    throw new Error(
      "Data lack to calculate Square. Side length or both points coordinates are required (TopRight та BottomLeft)."
    );
  }

  if (side <= 0) {
    throw new Error("Square side should be bigger than 0.");
  }

  return {
    getPerimeter: () => 4 * side,
    getArea: () => side * side,
  };
}
