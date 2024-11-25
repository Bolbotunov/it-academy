function calculator(str) {
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
  
str = str.match(/(\d+(\.\d+)?|\D)/g)
for (let i=0; i < str.length; i++) {
  if(str[i] === '-' && (!str[i-1] || str[i-1] === '(')) {
    str.splice(i, 2, '-' + str[i+1])
    }
}

let completeStack = []
let operatorsStack = []
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
let stack = []
let operation
completeStack.forEach((item) => {
  if (!(item in operations)) {
    stack.push(item)
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

console.log(calculator('2*(-3+1)'))
