let str = prompt("Введите строку:");

function vowelsForEach(str) {
  const obj = { а: 1, е: 1, ё: 1, и: 1, о: 1, у: 1, ы: 1, э: 1, ю: 1, я: 1}
  let sumVowels = 0
    str.toLowerCase().split('').forEach(letter => obj[letter] ? sumVowels++ : 0)
    return sumVowels
}

function vowelsFilter(str) {
  const obj = { а: 1, е: 1, ё: 1, и: 1, о: 1, у: 1, ы: 1, э: 1, ю: 1, я: 1}
  let vowelsArr =  str.toLowerCase().split('').filter(letter => obj[letter])
  return vowelsArr.length
}

function vowelsReduce(str) {
  const obj = { а: 1, е: 1, ё: 1, и: 1, о: 1, у: 1, ы: 1, э: 1, ю: 1, я: 1}
  return  str.toLowerCase().split('').reduce((acc, letter) => (obj[letter] || 0) + acc, 0)
}

alert(`Количество гласных букв:
 Методом ForEach: ${vowelsForEach(str)}
 Методом Filter: ${vowelsFilter(str)}
 Методом Reduce: ${vowelsReduce(str)}`)
