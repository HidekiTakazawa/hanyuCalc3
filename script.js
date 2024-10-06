const display = document.getElementById('display');
let expression = '';

const numberToChinese = {
    '0': '零',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
    '7': '七',
    '8': '八',
    '9': '九'
};

const operatorToChinese = {
    '+': '加',
    '-': '减',
    '*': '乘',
    '/': '除',
    '=': '等于'
};

function appendNumber(number) {
    expression += number;
    display.innerText = expression;
    speak(numberToChinese[number]);
}

function appendOperator(operator) {
    expression += operator;
    display.innerText = expression;
    speak(operatorToChinese[operator]);
}

function clearDisplay() {
    expression = '';
    display.innerText = '';
}

function calculate() {
    try {
        const result = eval(expression);
        expression += '=' + result.toString();
        display.innerText = expression;
        speak(operatorToChinese['='] + result);
    } catch (error) {
        display.innerText = '错误';
    }
}

function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'zh-CN';
    window.speechSynthesis.speak(msg);
}

function speakExpression() {
  let chineseExpression = '';
  for (let char of expression) {
      if (numberToChinese[char]) {
          chineseExpression += numberToChinese[char];
      } else if (operatorToChinese[char]) {
          chineseExpression += operatorToChinese[char];
      }
  }
  
  // 計算結果を追加
  try {
      const result = eval(expression);
      chineseExpression += operatorToChinese['='] + numberToChinese[result.toString()];
  } catch (error) {
      chineseExpression += '错误';
  }
  
  speak(chineseExpression);
}