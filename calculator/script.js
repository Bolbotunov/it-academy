function calculator(str) {
  let stack = []
    let operations = {
    '-': true,
    '+': true,
    '*': true,
    '/': true,
    }
    let operation
    let minus = false
    let currentSlice = str
    let numInBrackets = null
    let numWithBrackets = null

// ================== если есть скобки =============================================
for (let i=0; i < str.length; i++) {
  if (str[i] === '(' && stack.length === 0) {
    stack.push(str[i])
    indexStart = i + 1
  } else if (str[i] === '(' && stack.length !== 0) {
    indexStart = i + 1
  } else if(str[i] === ')') {
    stack = []
    indexEnd = i
    currentSlice = str.slice(indexStart, indexEnd)
   console.log(currentSlice)
    break
  }
}

for (let i = 0; i < currentSlice.length; i++) {
  if(currentSlice[i] in operations && i !== 0 ) {
    numInBrackets = true
    break
  }
}

if(!numInBrackets) {
  currentSlice = str.replace('(' + currentSlice + ')', currentSlice)
}

// ================== если есть * или / =====================================================

if(currentSlice.indexOf('*') !== -1  || currentSlice.indexOf('/') !== -1 ) {
  currentSlice = currentSlice.split(/[-+]/)
  for(let i=0; i < currentSlice.length; i++) {
    if((currentSlice[i].includes('*') || currentSlice[1].includes('/')) && currentSlice.indexOf(currentSlice[i]) === 1 && currentSlice[0] === '') {
      minus = true
      currentSlice = currentSlice[i]
      break
    } else if (currentSlice[i].includes('*') || currentSlice[i].includes('/')) {
      currentSlice = currentSlice[i]
      break
    } else {
      continue
    }
  }

  for (let i=0; i < currentSlice.length; i++) {
    if (currentSlice[i] in operations) {
      operation = currentSlice[i]
      break
    }
  }

  if (minus === true) {
    currentSlice = '-' + currentSlice
  }
currentSlice = currentSlice.split(/[*/]/)

// если нет * и / =====================================================
} else {
  if(currentSlice[0] === '-'){
    minus = true
    currentSlice = currentSlice.slice(1)
  }
  
  for (let i = (minus === true) ? 1 : 0; i < currentSlice.length; i++) {
    if (currentSlice[i] in operations && currentSlice[i+1] !== '-') {
      operation = currentSlice[i]
      break
    } else if (currentSlice[i] in operations && (currentSlice[i+1] && currentSlice[i]) === '-') {
      operation = '+'
      break
    } else if (currentSlice[i] in operations && (currentSlice[i+1] || currentSlice[i]) === '-'){
      operation = '-'
      break
    }
  }

  currentSlice = currentSlice.split(/[-+]/)
    if(minus === true) {
    currentSlice[0] = '-' + currentSlice[0]
  }
}

currentSlice = currentSlice.filter(item => item !== '');
let [a, b] = currentSlice.map(Number);

    if(isNaN(a)|| isNaN(b)) {
        console.log('введен недопустимый символ')
        return
    }

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

    str = str.replace(a + operation + b, result)
  
if(str == result) {
  return Number(str)
} else {
  return calculator(str)
}
}

console.log(calculator('-5*10+5'))
