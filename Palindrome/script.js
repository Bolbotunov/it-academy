let str = prompt('введите слово')

function palindrome(str) {
  str = str.toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-щыэюя]/g, '')
  for (let i = 0; i < str.length/2; i++) {
    if (str[i] !== (str[str.length - (i + 1)])) {
      return false;
    } 
  }
  return true
}

alert(palindrome(str) ? 'это палиндром' : 'это не палиндром')
