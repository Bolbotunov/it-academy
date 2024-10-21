let str = prompt("Введите строку:");
str = str.toLowerCase().split('')
let sumVowels = 0
const obj = {
    а:1,
    е:1,
    ё:1,
    и:1,
    о:1,
    у:1,
    ы:1,
    э:1,
    ю:1,
    я:1,
  }

function vowelsForEach(str) {
    str.forEach(letter => obj[letter] ? sumVowels++ : 0)
    return sumVowels
  }

  function vowelsFilter(str) {
    sumVowels = str.filter(letter => obj[letter])
    return sumVowels.length
  }

  function vowelsReduce(str) {
    return str.reduce((acc, letter) => (obj[letter] || 0) + acc, 0)
  }

alert(`Количество гласных букв:
 Методом ForEach: ${vowelsForEach(str)}
 Методом Filter: ${vowelsFilter(str)}
 Методом Reduce: ${vowelsReduce(str)}`)
