import { LocStorageClass } from './LocStorage.js';

const addBtn = document.querySelector('.addBtn');
const getBtn = document.querySelector('.getBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const showListBtn = document.querySelector('.showListBtn');
const infoBox = document.querySelector('.infoBox__text');
const drinksCategory = document.querySelector('.drinks');
const dishesCategory = document.querySelector('.dishes');
const drinksBtn = document.querySelector('.drinksCategory');
const dishesBtn = document.querySelector('.dishesCategory');
let currentStorage

drinksBtn.addEventListener('click', function() {
    drinksCategory.classList.add('showCategory')
    addBtn.innerHTML = 'Добавить напиток'
    getBtn.innerHTML = 'Получить инфо о напитке'
    deleteBtn.innerHTML = 'Удалить напиток'
    drinksBtn.style.backgroundColor = 'green'
    dishesBtn.style.backgroundColor = 'inherit'
    drinksCategory.style.backgroundColor = 'rgb(20, 150, 201)'
    currentStorage = new LocStorageClass('drinksStorage');
    infoBox.innerHTML = '';
})

dishesBtn.addEventListener('click', function() {
    drinksCategory.classList.add('showCategory')
    addBtn.innerHTML = 'Добавить Блюдо'
    getBtn.innerHTML = 'Получить инфо о блюде'
    deleteBtn.innerHTML = 'Удалить блюдо'
    dishesBtn.style.backgroundColor = 'green'
    drinksBtn.style.backgroundColor = 'inherit'
    drinksCategory.style.backgroundColor = 'rgb(139, 213, 150)'
    infoBox.innerHTML = '';
    currentStorage = new LocStorageClass('dishesStorage');
})


addBtn.addEventListener('click', function () {
    let key = prompt('Введите название');
    let value = {};
    let valuePrice = confirm('дороже 50р?') ? 'да' : 'нет';
    let valueRecipt = prompt('напишите рецепт приготовления');
    value.valuePrice = valuePrice;
    value.valueRecipt = valueRecipt;
    currentStorage.addValue(key, value);
});

getBtn.addEventListener('click', function () {
    let itemName = prompt('введите название');
    let itemInfo = currentStorage.getValue(itemName);
    infoBox.innerHTML = itemInfo ? `<b>Название:</b> ${itemName} <br>
    <b> Дороже 50р:</b> ${itemInfo.valuePrice} <br>
    <b> рецепт приготовления:</b>${itemInfo.valueRecipt}` : `${itemName} нет в справочнике`;
});

deleteBtn.addEventListener('click', function () {
    let itemName = prompt('введите название');
    let itemDelete = currentStorage.deleteValue(itemName);
    infoBox.innerHTML = itemDelete ? `${itemName} удален из справочника` : `${itemName} нет в справочнике`;
});

showListBtn.addEventListener('click', function () {
    let list = currentStorage.getKeys();
    list = list.sort((a, b) => a.localeCompare(b));
    let content = '';
    for (let i = 0; i < list.length; i++) {
        content += `${i + 1}. ${list[i]}<br>`;
    }
    infoBox.innerHTML = content || 'справочник пуст';
});
