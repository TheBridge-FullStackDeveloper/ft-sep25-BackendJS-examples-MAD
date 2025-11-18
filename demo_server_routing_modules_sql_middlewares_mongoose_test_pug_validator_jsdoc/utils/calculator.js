const calculator = {
    // Que sume 2 números y si algunos de ellos no se puede convetrir a number, qe devuelva NaN
    add: (a, b) => {
       
      if (
        typeof parseInt(a) == "number" && 
        typeof parseInt(b) == "number" &&
        typeof a !== "object" && 
        typeof b !== "object"
    ) {
        return parseInt(a) + parseInt(b);
      } else {
        return NaN;
      }
    },
    sub: (a, b) => {
      if (typeof a == "number" && typeof b == "number") {
        return a - b;
      } else {
        return NaN;
      }
    },
    div: (a, b) => {
      if (a !== undefined && b !== undefined && typeof a == "number" && typeof b == "number") {
        return a / b;
      } else {
        return NaN;
      }
    },
    mul: (a, b) => {
      if (a !== undefined && b !== undefined) {
        if (typeof a == "number" && typeof b == "number") {
          return a * b;
        } else {
          return NaN;
        }
      } else {
        return null;
      }
    },
  };
  
  module.exports = calculator;
  
  console.log(calculator.add(2, 2));
  console.log(calculator.sub(2, 2));
  console.log(calculator.mul(3, 2));
  console.log(calculator.div("1","1"));