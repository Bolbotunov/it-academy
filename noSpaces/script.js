let str = prompt('введите слово или текст')

function getStringNoInnerSpaces(str) {
  let newWord = ''
  for (let i = 0; i < str.length; i++) {
  if (str[i] !== ' ') {
     newWord += str[i]
   } 
 }
  str = newWord
  return str
}

function getStringWithInnerSpaces(str) {
  let newWord = ''
  let step = 0
  let stepFromEnd = 0
  while (str[step] === ' ') {
    step++
  }
  while (str[str.length - (1 + stepFromEnd)] === ' ') {
    stepFromEnd++
  }
  for (let i = step; i < str.length - stepFromEnd; i++) {
    newWord += str[i]
  }
  str = newWord
  return str
}

if (str === '') {
  alert ('вы ничего не ввели в строку')
  } else if (str === null) {
    alert ('вы отменили операцию')
  } else {
  let withInnerSpaces = confirm('удалить внутренние отступы тоже?')
  alert(withInnerSpaces ? '*' + getStringNoInnerSpaces(str) + '*' : '*' + getStringWithInnerSpaces(str) + '*')
}
