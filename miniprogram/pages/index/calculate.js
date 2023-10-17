/**
 * 计算表达式的结果
 * @param {*} expression 比如 "1 + 2 * 3 * 4 + 4 / 2"
 * 
 * 在这个方法中，我们首先将中缀表达式（传入的字符串）转换为逆波兰表达式，
 * 然后使用堆栈来计算逆波兰表达式的值。
 * 这种方法避免了直接使用eval()或new Function()，并且在计算数学表达式时更加安全。
 */

export default function calculate(expression) {
  var operators = {
      '+': function (a, b) { return a + b; },
      '-': function (a, b) { return a - b; },
      '*': function (a, b) { return a * b; },
      '/': function (a, b) { return a / b; }
  };

  function isOperator(token) {
      return token in operators;
  }

  function precedence(operator) {
      if (operator === '+' || operator === '-') {
          return 1;
      }
      if (operator === '*' || operator === '/') {
          return 2;
      }
      return 0;
  }

  function shuntingYard(tokens) {
      var output = [];
      var stack = [];

      tokens.forEach(function (token) {
          if (!isNaN(token)) {
              output.push(parseFloat(token));
          } else if (isOperator(token)) {
              while (isOperator(stack[stack.length - 1]) && precedence(token) <= precedence(stack[stack.length - 1])) {
                  output.push(stack.pop());
              }
              stack.push(token);
          }
      });

      while (stack.length > 0) {
          output.push(stack.pop());
      }

      return output;
  }

  var tokens = expression.match(/(\d+(\.\d+)?|[+\-*/])/g);
  var postfixTokens = shuntingYard(tokens);
  var stack = [];

  postfixTokens.forEach(function (token) {
      if (!isNaN(token)) {
          stack.push(token);
      } else if (isOperator(token)) {
          var b = stack.pop();
          var a = stack.pop();
          stack.push(operators[token](a, b));
      }
  });

  return stack[0];
}
