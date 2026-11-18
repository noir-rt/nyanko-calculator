
const display = document.querySelector(".result");
const expression = document.querySelector(".expression");

const buttons = document.querySelectorAll("button");

document.addEventListener("keydown", function(event) {
  let key = event.key;
  let buttonText = "";

  if (key >= "0" && key <= "9") {
    buttonText = key;
  } else if (key === ".") {
    buttonText = ".";
  } else if (key === "+") {
    buttonText = "＋";
  } else if (key === "-") {
    buttonText = "−";
  } else if (key === "*") {
    buttonText = "×";
  } else if (key === "/") {
    buttonText = "÷";
  } else if (key === "Enter") {
    buttonText = "＝";
  } else if (key === "Backspace") {
    buttonText = "←";
  } else if (key === "Delete") {
    buttonText = "C";
  } else if (key === "Escape") {
    buttonText = "AC";
  }

  if (buttonText !== "") {
    const button = [...buttons].find(
      button => button.textContent === buttonText
    );

if (button) {
  event.preventDefault();
  button.click();

  button.classList.remove("keyboard-press");
  void button.offsetWidth;
  button.classList.add("keyboard-press");

  setTimeout(function() {
    button.classList.remove("keyboard-press");
  }, 120);
}
  }
});

let firstNumber = "";
let operator = "";
let secondNumber = "";
let numbers = [];
let operators = [];
let calculationFinished = false;
let operatorJustPressed = false;
let expressionText = "";
let historyList = document.getElementById("history-list");

buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    const value = button.textContent;

    if (display.textContent === "エラー") {
  if (value >= "0" && value <= "9") {
    display.textContent = value;
    numbers = [];
    operators = [];
    operator = "";
    calculationFinished = false;
    adjustDisplayFont();
    return;
  }
}

if (value === "＋" || value === "−" || value === "×" || value === "÷") {

  if (calculationFinished) {
    numbers = [Number(display.textContent)];
    operators = [];
    calculationFinished = false;
    operatorJustPressed = false;

    operators.push(value);

    expressionText = display.textContent + " " + value;

  } else if (operatorJustPressed) {
    operators[operators.length - 1] = value;

    expressionText = expressionText.trimEnd().slice(0, -1) + value;

  } else {
    numbers.push(Number(display.textContent));
    operators.push(value);

    expressionText += (expressionText ? " " : "") + display.textContent + " " + value;
  }

  if (operator === "") {
    firstNumber = display.textContent;
  }

  display.textContent = "0";
  expression.textContent = expressionText;

  calculationFinished = false;
  operatorJustPressed = true;

  if (value === "＋") {
    operator = "+";
  } else if (value === "−") {
    operator = "-";
  } else if (value === "×") {
    operator = "*";
  } else {
    operator = "/";
  }
      
    } else if (value === "＝") {

console.log("追加する直前のnumbers:", numbers);
console.log("追加する直前のoperators:", operators);

numbers.push(Number(display.textContent));
let historyText = numbers.map((number, index) => {
  return index === 0
    ? number
    : operators[index - 1] + " " + number;
}).join(" ");
      
    console.log("＝を押した直後", display.textContent);
    console.log(numbers);
    console.log(operators);

    console.log("割り算の記号", operators.includes("÷"));

  console.log("計算開始時:", numbers, operators);

while (
  operators.includes("×") ||
  operators.includes("÷")
) {
  let multiplyIndex = operators.indexOf("×");
  let divideIndex = operators.indexOf("÷");

  let index;

  if (multiplyIndex === -1) {
    index = divideIndex;
  } else if (divideIndex === -1) {
    index = multiplyIndex;
  } else {
    index = Math.min(multiplyIndex, divideIndex);
  }

  let leftNumber = numbers[index];
  let rightNumber = numbers[index + 1];
  let result;

  if (operators[index] === "×") {
    result = leftNumber * rightNumber;
  } else {
    if (rightNumber === 0) {
      display.textContent = "エラー";
      numbers = [];
      operators = [];
      operator = "";
      calculationFinished = true;
      return;
    }

    result = leftNumber / rightNumber;
  }

  numbers.splice(index, 2, result);
  operators.splice(index, 1);
}

while (
  operators.includes("＋") ||
  operators.includes("−")
) {
  let plusIndex = operators.indexOf("＋");
  let minusIndex = operators.indexOf("−");

  let index;

  if (plusIndex === -1) {
    index = minusIndex;
  } else if (minusIndex === -1) {
    index = plusIndex;
  } else {
    index = Math.min(plusIndex, minusIndex);
  }

  let leftNumber = numbers[index];
  let rightNumber = numbers[index + 1];
  let result;

  if (operators[index] === "＋") {
    result = leftNumber + rightNumber;
  } else {
    result = leftNumber - rightNumber;
  }

  numbers.splice(index, 2, result);
  operators.splice(index, 1);
}

display.textContent = Number(numbers[0].toFixed(7));
adjustDisplayFont();
calculationFinished = true;

let historyItem = document.createElement("li");
historyItem.textContent = `${historyText} = ${display.textContent}`;

historyItem.style.cursor = "pointer";

historyItem.addEventListener("click", function() {
  const selectedResult = Number(
    this.textContent.split(" = ").pop()
  );

  display.textContent = selectedResult;
  adjustDisplayFont();

  numbers = [];
  operators = [];
  operator = "";
  firstNumber = "";
  secondNumber = "";

  expressionText = "";
  expression.textContent = "";

  calculationFinished = true;
  operatorJustPressed = false;
});

historyList.prepend(historyItem);


console.log("最終表示の直前:", numbers[0]);

    } else if (value === "AC") {

  display.textContent = "0";
  historyList.innerHTML = "";
  expressionText = "";
  expression.textContent = "";
  firstNumber = "";
  operator = "";
  secondNumber = "";
  numbers = [];
  operators = [];
  calculationFinished = false;
  operatorJustPressed = false;
 
  } else if (value === "C") {

  display.textContent = "0";

  if (calculationFinished) {
    numbers = [];
    operators = [];
    operator = "";
    expressionText = "";
    expression.textContent = "";
    calculationFinished = false;
    operatorJustPressed = false;
  }

} else if (value === "←") {
  
  if (display.textContent.length === 1) {
    display.textContent = "0";
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }

  } else if (value === "±") {
  display.textContent = Number(display.textContent) * -1;

  } else if (value === "√") {
     if (Number(display.textContent) < 0) {
    display.textContent = "エラー";
  } else {
  display.textContent = Math.sqrt(Number(display.textContent));
  }
  adjustDisplayFont();

} else if (value === "%") {
  display.textContent = Number(display.textContent) / 100;
adjustDisplayFont();

  } else {

if (value === ".") {
  if (!display.textContent.includes(".")) {
    if (calculationFinished) {
      display.textContent = "0.";
      calculationFinished = false;
    } else {
      display.textContent += ".";
    }
  }
  return;

}
if (calculationFinished) {
  display.textContent = value;
  numbers = [];
  operators = [];
  operator = "";

  expressionText = "";
  expression.textContent = "";

  calculationFinished = false;
  operatorJustPressed = false;

  adjustDisplayFont();
  return;
}

operatorJustPressed = false;
      if (display.textContent === "0") {
        display.textContent = value;
      } else {
        display.textContent += value;
      }
      adjustDisplayFont();
      expression.textContent = expressionText + " " + display.textContent;
    }
  });
});

// ディスプレイの文字サイズ調整
function adjustDisplayFont() {
  const length = display.textContent.length;

  if (length <= 8) {
    display.style.fontSize = "32px";
  } else if (length <= 12) {
    display.style.fontSize = "26px";
  } else if (length <= 16) {
    display.style.fontSize = "20px";
  } else {
    display.style.fontSize = "16px";
  }
}