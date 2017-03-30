/**
* Validates symbol against array of previous inputs.
* @param {Array} inputs - Previous inputs.
* @param {String} symb - New input to validate.
* @return {Array} Updated array.
*/
function validate(inputs, symb) {
  const result = [...inputs];
  const numbers = '1234567890';
  const operators = '+-*/';

  if (result.length > 16) return result;

  if (!inputs.length) {
    if (~numbers.indexOf(symb) || symb === '.') result.push(symb);
    return result;
  }

  // NOTE Quick bugfix without tests
  if (inputs.length === 1 && (inputs[0] === 'NaN' || inputs[0] === 'Infinity')) {
    result.pop();
    result.push(symb);
    return result;
  }

  if (~numbers.indexOf(symb)) {
    result.push(symb);
    return result;
  }

  const last = inputs[inputs.length-1];

  // last input was a number
  if (~numbers.indexOf(last)) {

    // user input is decimal
    if (symb === '.') {
      let lastOperatorPos = -1;
      let lastDecimalPos = inputs.lastIndexOf('.');

      operators.split('').forEach(op => {
        const lastInd = inputs.lastIndexOf(op);

        if (lastInd > lastOperatorPos) lastOperatorPos = lastInd;
      });

      if (lastDecimalPos <= lastOperatorPos) result.push(symb);

      return result;
    }

    // user input is an operator
    if (~operators.indexOf(symb)) {
      result.push(symb);

      return result;
    }


  }

  // last input was a decimal
  else if (last === '.') {
    // user input is a decimal
    if (symb === '.') return result;

    // user input is an operator
    else if (~operators.indexOf(symb)) {
      result.pop();
      result.push(symb);
    }
  }

  // last input was an operator
  else if (~operators.indexOf(last)) {
    // user input is a decimal
    if (symb === '.') result.push(symb);

    // user input is an operator
    else if (~operators.indexOf(symb)) {
      result.pop();
      result.push(symb);
    }

    return result;
  }

  return result;

}

module.exports = {
  validate
}
