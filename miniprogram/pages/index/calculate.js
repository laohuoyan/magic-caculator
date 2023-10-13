/**
 * 计算表达式的结果
 * @param {*} expression 比如 "1 + 2 * 3 * 4 + 4 / 2"
 * 
 * 在这个方法中，我们首先将中缀表达式（传入的字符串）转换为逆波兰表达式，
 * 然后使用堆栈来计算逆波兰表达式的值。
 * 这种方法避免了直接使用eval()或new Function()，并且在计算数学表达式时更加安全。
 */

var operators = {
  '+': function(a, b) { return a + b; },
  '-': function(a, b) { return a - b; },
  '*': function(a, b) { return a * b; },
  '/': function(a, b) { return a / b; }
};

export default function calculate(expression) {
  console.log(expression);
  
  function isDigit(char) {
      return /\d/.test(char);
  }

  function evaluateRPN(tokens) {
      var stack = [];
    
      tokens.forEach(function(token) {
          if (isDigit(token)) {
              stack.push(parseFloat(token));
          } else if (token in operators) {
              var b = stack.pop();
              var a = stack.pop();
              stack.push(operators[token](a, b));
          }
      });

      return stack[0];
  }

  function infixToRPN(tokens) {
      var output = [];
      var operatorStack = [];

      var precedence = {
          '+': 1,
          '-': 1,
          '*': 2,
          '/': 2
      };

      tokens.forEach(function(token) {
          if (isDigit(token)) {
              output.push(token);
          } else if (token in operators) {
              while (operatorStack.length > 0 && operators[operatorStack[operatorStack.length - 1]] >= operators[token]) {
                  output.push(operatorStack.pop());
              }
              operatorStack.push(token);
          } else if (token === '(') {
              operatorStack.push(token);
          } else if (token === ')') {
              while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                  output.push(operatorStack.pop());
              }
              operatorStack.pop(); // Pop '(' from the stack
          }
      });

      while (operatorStack.length > 0) {
          output.push(operatorStack.pop());
      }

      return output;
  }

  var tokens = expression.match(/(\d+(\.\d+)?|[+\-*/()])/g);
  var rpn = infixToRPN(tokens);
  return evaluateRPN(rpn);
}
