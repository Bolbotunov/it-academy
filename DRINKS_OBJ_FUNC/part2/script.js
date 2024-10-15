const addBtn = document.querySelector('.addBtn')
const getBtn = document.querySelector('.getBtn')
const deleteBtn = document.querySelector('.deleteBtn')
const showListBtn = document.querySelector('.showListBtn ')
const infoBox = document.querySelector('.infoBox__text')

function ObjStorageFunc() {
    let dict = {}
    this.getObj = function(){
      console.log(dict)
    }
    this.addValue = function(key,value) {
      dict[key] = value
    }
    this.getValue = function(key) {
      return dict[key]
    }
    this.deleteValue = function(key) {
      return key in dict ? (delete dict[key] && true) : false
    }
    this.getKeys = function() {
        let keysArr = []
      for(key in dict) {
        keysArr.push(key)
      }
      return keysArr
    }
  }
  let drinkStorage = new ObjStorageFunc()

  addBtn.addEventListener('click', function() {
    let key = prompt('Введите название напитка')
    let value = {}
    let valueAlco = confirm('напиток алкогольный?') ? 'да' : 'нет'
    let valueRecipt = prompt('напишите рецепт приготовления')
    value.valueAlco = valueAlco
    value.valueRecipt = valueRecipt
    drinkStorage.addValue(key, value)
})

getBtn.addEventListener('click', function() {
    let drinkName = prompt('введите название напитка')
    let drinkInfo = drinkStorage.getValue(drinkName)
    infoBox.innerHTML = drinkInfo ? `<b>напиток:</b> ${drinkName} <br>
    <b> алкогольный:</b> ${drinkInfo.valueAlco} <br>
    <b> рецепт приготовления:</b>${drinkInfo.valueRecipt}` : `напитка ${drinkName} нет в справочнике`
    
})

deleteBtn.addEventListener('click', function() {
    let drinkName = prompt('введите название напитка')
    let drinkDelete= drinkStorage.deleteValue(drinkName)
    infoBox.innerHTML = drinkDelete ? `напиток ${drinkName} удален из справочника`: `напитка ${drinkName} нет в справочнике`
})

showListBtn.addEventListener('click', function(){
    let list = drinkStorage.getKeys()
    let content = ''
    for(let i=0; i < list.length; i++) {
        content += `${i + 1}. ${list[i]}<br>`
    }
    infoBox.innerHTML = content || 'справочник пуст'
})
