let str = prompt('введите слово или текст')

function getStringNoSpaces(str) {
  let newWord = ''
  let step = 0
  let stepFromEnd = 0
  while (str[step] === ' ') {
    step++
  }
  while (str[str.length - (1 + stepFromEnd)] === ' ') {
    stepFromEnd++
  }
  return str.substring(step, str.length - stepFromEnd);
}

if (str === '') {
  alert ('вы ничего не ввели в строку')
  } else if (str === null) {
    alert ('вы отменили операцию')
  } else {
  alert('*' + getStringNoSpaces(str) + '*')
}
