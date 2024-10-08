let str = prompt("Введите строку:");
function vowels(str){
  str = str.toLowerCase()
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
  let sumVowels = 0
 for(let i = 0; i < str.length; i++) {
   if(obj[str[i]]){
    sumVowels++
   }
 }
  return sumVowels
}


alert(`Количество гласных букв: ${vowels(str)}`);
