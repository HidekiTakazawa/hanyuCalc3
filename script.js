const display = document.getElementById('display');
const outputDiv = document.getElementById('output');
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
const numberMap = {
    '0': '零', '1': '一', '2': '二', '3': '三', '4': '四',
    '5': '五', '6': '六', '7': '七', '8': '八', '9': '九'
};

const unitMap = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];

function convertNumberToChinese(num) {
    let str = num.toString();
    let result = '';
    let len = str.length;

    for (let i = 0; i < len; i++) {
        let n = str[i];
        if (n !== '0') {
            result += numberMap[n] + unitMap[len - i - 1];
        } else {
            if (result[result.length - 1] !== '零') {
                result += numberMap[n];
            }
        }
    }
    return result.replace(/零+$/, '');
}

/**
 * 数式を中国語に変換する関数。
 * 
 * @param {string} expression - 数式を表す文字列。例: "3+5=8"
 * @returns {string} - 中国語で表現された数式。例: "三 加 五 等於 八"
 */
function convertExpressionToChinese(expression) {
    const operators = {
        '+': '加',
        '-': '減',
        '*': '乘',
        '/': '除',
        '=': '等於'
    };

    let result = '';
    let num = '';

    for (let char of expression) {
        if (char in numberMap) {
            num += char;
        } else {
            if (num) {
                result += convertNumberToChinese(num);
                num = '';
            }
            if (char in operators) {
                result += ' ' + operators[char] + ' ';
            }
        }
    }

    if (num) {
        result += convertNumberToChinese(num);
    }

    return result;
}

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
    outputDiv.textContent = '';

    speak('清零');
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
    const output = convertExpressionToChinese(expression);
    
    outputDiv.textContent = output;

    outputDiv.addEventListener('click', () => {
        speechSynthesis.cancel(); // 既存の音声出力をキャンセル
        const utterance = new SpeechSynthesisUtterance(output);
        utterance.lang = 'zh-CN';
        speechSynthesis.speak(utterance);
    });
    //   let chineseExpression = '';
    //   for (let char of expression) {
    //       if (numberToChinese[char]) {
    //           chineseExpression += numberToChinese[char];
    //       } else if (operatorToChinese[char]) {
    //           chineseExpression += operatorToChinese[char];
    //       }
    //   }

    //   // 計算結果を追加
    //   try {
    //       const result = eval(expression);
    //       chineseExpression += operatorToChinese['='] + numberToChinese[result.toString()];
    //   } catch (error) {
    //       chineseExpression += '错误';
    //   }

    //   speak(chineseExpression);
}