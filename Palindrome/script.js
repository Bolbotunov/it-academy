let str = prompt('введите слово')
function palindrome(str) {
  str = str.toLowerCase().replace(/[^a-zа-еж-щыэюя]/g, '').replace(/ё/g, 'е')
  function reverseStr(str) {
    if (str === '') {
    return str
    } else {
   return reverseStr(str.substring(1)) + str[0]
    }
  }
  let newStr = reverseStr(str)
    console.log(str,newStr)
  if(newStr === str) {
    alert('это палиндром')
  } else {
    alert('это не палиндром')
  }
}

palindrome(str)
