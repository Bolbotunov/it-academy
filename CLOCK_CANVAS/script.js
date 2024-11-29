let container__btn = document.querySelector('.container__btn');
let btn = document.querySelector('.btn');
let input = document.querySelector('.input');
let countHours = 12;
let step = 360 / countHours;
let angleInDegreesStart = -60;
let stepOfArrowHours = 360 / 12;
let stepOfArrow = 360 / 60;
let canvas;
let ctx;
let sizeOfTimeBlock

btn.addEventListener('click',  buildClock);

function buildClock() {
    val = input.value
    sizeOfTimeBlock = val / 200;
    if (val < 200 || val > 800) {
        return alert('введен недопустимый размер');
    }
    container__btn.innerHTML = '';
    canvas = document.createElement('canvas');
    canvas.width = val;
    canvas.height = val;
    canvas.id = 'clockCanvas';
    container__btn.appendChild(canvas);
    ctx = canvas.getContext('2d');
    createClock()
    showDate()
  }

  function createClock() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(val / 2, val / 2, val / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
    buildHours()
  }

function buildHours() {
    let hoursVal = val / 100 * 10;
    let padding = val * 0.075;
    let radius = val / 2 - padding;
    let sizeNumbersOfClock = hoursVal / 100 * 4;
    for (let i = 0; i < countHours; i++) {
      let angleInRadians = (angleInDegreesStart + step * i) * (Math.PI / 180);
      let x = radius * Math.cos(angleInRadians) + val / 2;
      let y = radius * Math.sin(angleInRadians) + val / 2;
    ctx.beginPath();
    ctx.arc(x, y, hoursVal / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.font = `${sizeNumbersOfClock}rem  Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(1 + i, x, y);
    ctx.closePath();
    }
}

function showDate() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let partOfMinute = seconds / 60 * stepOfArrow;
    let partOfHour = minutes / 60 * stepOfArrowHours;
    let secondsAngle = seconds * stepOfArrow;
    let minutesAngle = minutes * stepOfArrow + partOfMinute;
    let hoursAngle = hours * stepOfArrowHours + partOfHour;
    createClock()
    let secondsX = val / 2 + (val * 0.4) * Math.cos(secondsAngle * (Math.PI / 180) - Math.PI / 2);
    let secondsY = val / 2 + (val * 0.4) * Math.sin(secondsAngle * (Math.PI / 180) - Math.PI / 2);
    createArrows(val / 2, val / 2, secondsX, secondsY, val / 100);

    let minutesX = val / 2 + (val * 0.3) * Math.cos(minutesAngle * (Math.PI / 180) - Math.PI / 2);
    let minutesY = val / 2 + (val * 0.3) * Math.sin(minutesAngle * (Math.PI / 180) - Math.PI / 2);
    createArrows(val / 2, val / 2, minutesX, minutesY, val / 100 * 2);

    let hoursX = val / 2 + (val * 0.2) * Math.cos(hoursAngle * (Math.PI / 180) - Math.PI / 2);
    let hoursY = val / 2 + (val * 0.2) * Math.sin(hoursAngle * (Math.PI / 180) - Math.PI / 2);
    createArrows(val / 2, val / 2, hoursX, hoursY, val / 100 * 3);

    let timeArr = [hours, minutes, seconds].map(times => String(times).padStart(2, '0'));
    let time = `${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`;
    let timeBlockY = val * 0.25;
    ctx.fillStyle = 'black';
    ctx.font = `${sizeOfTimeBlock}rem Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(time, val / 2, timeBlockY);
    setTimeout(showDate, 1000)
    console.log(time);
}

function createArrows(x1, y1, x2, y2, width) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.closePath();
}
