export const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? null : a / b
}

export function performCalculation(operator, a, b) {
  const fn = operations[
    operator === "+" ? "add" :
    operator === "-" ? "subtract" :
    operator === "*" ? "multiply" :
    operator === "/" ? "divide" : null
  ];

  const result = fn(a, b);
  return result === null ? a : Math.round(result * 1e8) / 1e8;
}