import { LocStorageClass } from '/LocStorage.js';

const addBtn = document.querySelector('.addBtn');
const getBtn = document.querySelector('.getBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const showListBtn = document.querySelector('.showListBtn');
const infoBox = document.querySelector('.infoBox__text');

const addBtnD = document.querySelector('.addBtnD');
const getBtnD = document.querySelector('.getBtnD');
const deleteBtnD = document.querySelector('.deleteBtnD');
const showListBtnD = document.querySelector('.showListBtnD');
const infoBoxD = document.querySelector('.infoBox__textD');


let drinkStorage = new LocStorageClass('drinkStorage')
let dishesStorage = new LocStorageClass('dishStorage')

addBtn.addEventListener('click', function () {
    let key = prompt('Введите название');
    let value = {};
    let valuePrice = confirm('дороже 50р?') ? 'да' : 'нет';
    let valueRecipt = prompt('напишите рецепт приготовления');
    value.valuePrice = valuePrice;
    value.valueRecipt = valueRecipt;
    drinkStorage.addValue(key, value);
});

getBtn.addEventListener('click', function () {
    let itemName = prompt('введите название');
    let itemInfo = drinkStorage.getValue(itemName);
    infoBox.innerHTML = itemInfo ? `<b>Название:</b> ${itemName} <br>
    <b> Дороже 50р:</b> ${itemInfo.valuePrice} <br>
    <b> рецепт приготовления:</b>${itemInfo.valueRecipt}` : `${itemName} нет в справочнике`;
});

deleteBtn.addEventListener('click', function () {
    let itemName = prompt('введите название');
    let itemDelete = drinkStorage.deleteValue(itemName);
    infoBox.innerHTML = itemDelete ? `${itemName} удален из справочника` : `${itemName} нет в справочнике`;
});

showListBtn.addEventListener('click', function () {
    let list = drinkStorage.getKeys();
    list = list.sort((a, b) => a.localeCompare(b));
    let content = '';
    for (let i = 0; i < list.length; i++) {
        content += `${i + 1}. ${list[i]}<br>`;
    }
    infoBox.innerHTML = content || 'справочник пуст';
});


// ====== кнопки для dishes==========

addBtnD.addEventListener('click', function () {
    let key = prompt('Введите название');
    let value = {};
    let valuePrice = confirm('дороже 50р?') ? 'да' : 'нет';
    let valueRecipt = prompt('напишите рецепт приготовления');
    value.valuePrice = valuePrice;
    value.valueRecipt = valueRecipt;
    dishesStorage.addValue(key, value);
});

getBtnD.addEventListener('click', function () {
    let itemName = prompt('введите название');
    let itemInfo =  dishesStorage.getValue(itemName);
    infoBoxD.innerHTML = itemInfo ? `<b>Название:</b> ${itemName} <br>
    <b> Дороже 50р:</b> ${itemInfo.valuePrice} <br>
    <b> рецепт приготовления:</b>${itemInfo.valueRecipt}` : `${itemName} нет в справочнике`;
});

deleteBtnD.addEventListener('click', function () {
    let itemName = prompt('введите название');
    let itemDelete =  dishesStorage.deleteValue(itemName);
    infoBoxD.innerHTML = itemDelete ? `${itemName} удален из справочника` : `${itemName} нет в справочнике`;
});

showListBtnD.addEventListener('click', function () {
    let list =  dishesStorage.getKeys();
    list = list.sort((a, b) => a.localeCompare(b));
    let content = '';
    for (let i = 0; i < list.length; i++) {
        content += `${i + 1}. ${list[i]}<br>`;
    }
    infoBoxD.innerHTML = content || 'справочник пуст';
});
