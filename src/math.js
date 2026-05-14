const add = (number1, number2) => number1 + number2;
const subtract = (number1, number2) => number1 - number2;
const multiply = (number1, number2) => number1 * number2;
const divide = (number1, number2) => {
  if (number2 === 0) throw new Error('Division by zero');
  return number1 / number2;
};

module.exports = {
  add,
  subtract,
  multiply,
  divide
};
