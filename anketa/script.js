let surName = prompt('Ваша фамилия?')
while(!isNaN(surName) || surName !==  surName.replace(/[0-9,' ']/g, '')) {
    alert('нужно ввести только буквы')
    surName = prompt('Ваша фамилия?')
   }

let userName = prompt('Ваше имя?')
while(!isNaN(userName) || userName !==  userName.replace(/[0-9,' ']/g, '')) {
    alert('нужно ввести только буквы')
    userName = prompt('Ваше имя?')
   }

let middleName = prompt('Ваше отчество?')
while(!isNaN(middleName) || middleName !==  middleName.replace(/[0-9,' ']/g, '')) {
    alert('нужно ввести только буквы')
    middleName = prompt('Ваше отчество?')
   }


let age = parseInt(prompt('Ваш возраст в годах?'))
while (isNaN(age) || age < 0 || isNaN(Number(age))) {
      alert('нужно ввести положительное число')
      age = parseInt(prompt('Ваш возраст в годах?'))
     }

const ageDays = age * 365
const ageAfterFiveYears = age + 5
const male = 'мужской';
const female = 'женский';
const sex = confirm("ваш пол? Если мужской нажмите - ок, если женский - отмена" ) ? male : female
const womanPensionAge = 57
const manPensionAge = 60
let pension
if (sex === male && age > manPensionAge) {
    pension = true
} else if (sex === female && age > womanPensionAge) {
    pension = true
} else {
    pension = false
}


alert(`ваше ФИО: ${surName} ${userName} ${middleName} \n
ваш возраст в годах: ${age} \n
ваш возраст в днях: ${ageDays} \n
через 5 лет вам будет: ${ageAfterFiveYears} \n
ваш пол: ${sex} \n
вы на пенсии: ${pension === true ? 'да' : 'нет'}`
)
