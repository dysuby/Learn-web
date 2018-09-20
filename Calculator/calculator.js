/*自己写的有效性检测。。如果有bug请大佬们说一声*/
/*onclik -> deal - if is '=' -> getAnswer |-- convert -> isValid -> |-- levelOne*/
/*    if is '←' -> del                    |      ↓                  |-- levelTwo*/ 
/*    if is 'CE' -> clear                 |-- compute -> single     |-- right   */
/*                                        |      ↓                              */ 
/*                                        |-- display                           */

let postfix = new Array();
let haveComputed = false;

window.onload = function() {
  let funcKey = document.getElementsByClassName("func");
  let digitKey = document.getElementsByClassName("digit");
  for (let i of funcKey) {
    i.onclick = dealFunc;
  }
  for (let j of digitKey) {
    j.onclick = dealDigit;
  }
}

function dealFunc(event) {
  let key = event.target.value;
  if (haveComputed == true) {
    if (key == "(" || key == ")" || key == ".")
      clear();
    haveComputed = false;
  }
  if (key == "=") {
    let res = getAnswer();
    if (isNaN(res) == false) {
      clear();
      display(res);
      haveComputed = true;
    }
    postfix = new Array();
  } else if (key == "CE") {
    clear();
  } else if (key == "del") {
    del();
  } else {
    display(event.target.value);
  }
}

function dealDigit(event) {
  if (haveComputed == true) {
    clear();
    haveComputed = false;
  }
  display(event.target.value);
}

function display(val) {
  let position = document.getElementById("display");
  position.textContent += val;
}

function displayError(val) {
  let position = document.getElementById("display");
  let expression = position.textContent;
  position.textContent = val;
  position.className = "displayError";
  setTimeout(function() {position.textContent=expression;position.className = "";}, 900);
}

function del() {
  let position = document.getElementById("display");
  if (position.textContent.length != 0)
    position.textContent = position.textContent.substr(0, position.textContent.length - 1);
}

function clear() {
  let position = document.getElementById("display");
  position.textContent = "";
}

function getAnswer() {
  if (convert() == false)
    return Number.NaN;
  return compute();
}

function compute() {
  let stack = new Array();
  for (let ch of postfix) {
    if (ch == "+") {
      stack.push(single("+", stack));
    } else if (ch == "-") {
      stack.push(single("-", stack));
    } else if (ch == "*") {
      stack.push(single("*", stack));
    } else if (ch == "/") {
      stack.push(single("/", stack));
      if (stack[stack.length - 1] === Number.NaN)
        return Number.NaN;
    } else {
      stack.push(parseFloat(ch));
    }
  }
  return stack.pop();
}

function single(ope, stack) {
  let right = stack.pop();
  let left = stack.pop();
  let reg = /[0-9]\.[0-9]/;
  let tens = 0;
  let res = 0;
  while (reg.test(right.toString()) == true || reg.test(left.toString()) == true) {
    right *= 10;
    left *= 10;
    ++tens;
  }
  switch (ope) {
    case "+":
      res = left + right;
      res /= Math.pow(10, tens);
      break;
    case "-":
      res = left - right;
      res /= Math.pow(10, tens);
      break;
    case "*":
      res = left * right;
      res /= Math.pow(10, tens * 2);
      break;
    case "/":
      if (right === 0) {
        displayError("Cannot be divided by 0!!!");        
        return Number.NaN;
      }
      res =  left / right;
    default:
      break;
  }
  return res;
}

function convert() {
  let num = "", lastOpe = 0;
  let expression = document.getElementById("display").textContent;
  if (isValid(expression) == false)
    return false;
  let operatorStack = new Array();
  for (let ch of expression) {
    if (isNaN(parseFloat(ch)) == false || ch == ".") {
      if (num == "" && ch == ".")
        num += "0";
      num += ch;
    } else {
      if (num != "") {
        postfix.push(parseFloat(num));
        num = "";
      } else if ((ch == "-" || ch == "+") && (index == 0 || expression[index - 1] == "(")) {
        postfix.push(0);
      }
      if (ch == "+" || ch == "-")
        levelOne(ch, operatorStack);
      else if (ch == "*" || ch == "/")
        levelTwo(ch, operatorStack);
      else if (ch == "(")
        operatorStack.push(ch);
      else if (ch == ")")
        if (right(operatorStack) == false)
          return false;
    }
  }
  if (num != "")
    postfix.push(num);
  while (operatorStack.length != 0) 
    postfix.push(operatorStack.pop());
  return true;
}

function isValid(expression) {
  let reg = /([\*/\+\-\.][\*/\+\-])|([0-9]\()|(\)[0-9])|(\.\()|(\)\.)|(^[\*/])|(\([\*/])|([\+\-\*/]\))|([\+\-\*/\.])$|[0-9]\.[0-9]+\.|\(\)|(\.\.)/;
  if (reg.test(expression)) {
    displayError("Invalid expression!");
    return false;
  }
  let braket = 0;
  for (let ch of expression) {
    if (ch == "(")
      ++braket;
    else if (ch == ")")
      --braket;
    if (braket < 0) {
      displayError("Invalid ')'!");
      return false;
    }
  }
  if (braket > 0) {
    displayError("Too much '('!");
    return false;
  } else {
    return true;
  }
}

function levelOne(operator, operatorStack) {
  while (operatorStack.length != 0 && operatorStack[operatorStack.length - 1] != "(") {
    postfix.push(operatorStack.pop());
  }
  operatorStack.push(operator);
}

function levelTwo(operator, operatorStack) {
  while (operatorStack[operatorStack.length - 1] == "*" || operatorStack[operatorStack.length - 1] == "/") {
    postfix.push(operatorStack.pop());
  }
  operatorStack.push(operator);
}

function right(operatorStack) {
  while (operatorStack[operatorStack.length - 1] != "(") {
    postfix.push(operatorStack.pop());
  }
  operatorStack.pop();
}
