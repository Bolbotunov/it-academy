function calculator(str) {
  let stack = []
  let operation
  const operations = {
    '-': 0,
    '+': 0,
    '*': 1,
    '/': 1,
    }
  const brackets = {
      '(': false,
      ')': true,
    }

let completeStack = []
let operatorsStack = []

str = str.match(/(\d+(\.\d+)?|\D)/g)

for (let i = 0; i < str.length; i++) {
  if(str[i] === '-' && (!str[i - 1] || str[i - 1] === '(' || str[i - 1] in operations)) {
    str.splice(i, 2, '-' + str[i+1])
    }
}

str.forEach((item, index) => {
  if (item in brackets) { 
    if (!brackets[item]) { 
      operatorsStack.push(item)
     } else {
      while (operatorsStack.length && operatorsStack[operatorsStack.length - 1] !== '(') {
         completeStack.push(operatorsStack.pop())
     }
     operatorsStack.pop()
     }
   } else if (!(item in operations)) {
    completeStack.push(item)
   } else if (item in operations) {
      if (operatorsStack.length === 0 || operatorsStack[operatorsStack.length - 1] === '(' ) {
        operatorsStack.push(item)
      } else if (operations[item] > operations[operatorsStack[operatorsStack.length - 1]]) {
        operatorsStack.push(item)
      } else if(operations[item] <= operations[operatorsStack[operatorsStack.length - 1]]) {
        completeStack.push(operatorsStack.pop())
        operatorsStack.push(item)
      }
   }

})

while (operatorsStack.length) {
   completeStack.push(operatorsStack.pop())
  }
  let a
  let b 

completeStack.forEach((item) => {
  if (!(item in operations)) {
    stack.push(Number(item))
  } else {
    operation = item
    a = Number(stack[stack.length - 2])
    b = Number(stack[stack.length - 1])

    switch(operation) {
      case '+':
        result = a + b
        break;
      case '-':
        result = a - b
        break;
      case '*':
        result = a * b
        break;
      case '/':
        result = a / b
        break;
      default:
        console.log('нет такой операции');
        result = null;
    }
    stack.pop()
    stack.pop()
    stack.push(result)
  }
})

return stack.pop()
}

function test() {
  console.log(`тест -2: Ожидаемый ответ: -2, Полученный ответ: ${calculator('-2')}`)
  console.log(`тест -2*-2*(-10*-10-100): Ожидаемый ответ: 0, Полученный ответ: ${calculator('-2*-2*(-10*-10-100)')}`)
  console.log(`тест -2*-2: Ожидаемый ответ: 4, Полученный ответ: ${calculator('-2*-2')}`)
  console.log(`тест 5.5 + 4.2: Ожидаемый ответ: 9.7, Полученный ответ: ${calculator('5.5+4.2')}`)
  console.log(`тест 100 - 45.5: Ожидаемый ответ: 54.5, Полученный ответ: ${calculator('100-45.5')}`)
  console.log(`тест 3 * (-4): Ожидаемый ответ: -12, Полученный ответ: ${calculator('3*(-4)')}`)
  console.log(`тест (-20) / 5: Ожидаемый ответ: -4, Полученный ответ: ${calculator('(-20)/5')}`)
  console.log(`тест (2.5 + 3.5) * 2: Ожидаемый ответ: 12, Полученный ответ: ${calculator('(2.5+3.5)*2')}`)
  console.log(`тест 7.1 - (-3.1): Ожидаемый ответ: 10.2, Полученный ответ: ${calculator('7.1-(-3.1)')}`)
  console.log(`тест 9 * 0.5: Ожидаемый ответ: 4.5, Полученный ответ: ${calculator('9*0.5')}`)
  console.log(`тест 0 - (-10): Ожидаемый ответ: 10, Полученный ответ: ${calculator('0-(-10)')}`)
  console.log(`тест (8 + 12) / 4: Ожидаемый ответ: 5, Полученный ответ: ${calculator('(8+12)/4')}`)
  console.log(`тест -15 + (-5): Ожидаемый ответ: -20, Полученный ответ: ${calculator('-15+(-5)')}`)
}
test()
