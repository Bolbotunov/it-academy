const SVGNS="http://www.w3.org/2000/svg";
const XLinkNS="http://www.w3.org/1999/xlink";
let container__btn = document.querySelector('.container__btn');
let btn = document.querySelector('.btn');
let input = document.querySelector('.input');
let countHours = 12;
let step = 360 / countHours;
let angleInDegreesStart = -60;
let stepOfArrowHours = 360 / 12;
let stepOfArrow = 360 / 60;
let val
let sizeOfTimeBlock = val / 200;
let clock
let SVGElem

btn.addEventListener('click', buildClock);

function createElements(tagName, addClassElem, whereAddElement) {
  let svg = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  svg.classList.add(addClassElem);
  whereAddElement.appendChild(svg);
  return svg;
}
let secondsArrow, minutesArrow, hoursArrow;
function buildClock() {
  val = input.value
  sizeOfTimeBlock = val / 200
  if (val < 200 || val > 800) {
    return alert('введен недопустимый размер')
  }
  container__btn.innerHTML = ''
  SVGElem = document.createElementNS(SVGNS,'svg');
  SVGElem.setAttribute("width", val);
  SVGElem.setAttribute("height", val);
  container__btn.appendChild(SVGElem);

  createElements('circle', 'clock', SVGElem);
  clock = document.querySelector('.clock');
  clock.setAttribute('cx', val / 2);
  clock.setAttribute('cy', val / 2); 
  clock.setAttribute('r', val / 2); 
  clock.setAttribute('stroke', 'green')
  clock.setAttribute('fill', 'orange');
  SVGElem.appendChild(clock);
  createHours()
}
// buildClock()

function createHours() {
  let hoursVal = val / 100 * 10;
  let sizeNumbersOfClock = hoursVal / 100 * 4;
  let padding = val * 0.075;
  let radius = val / 2 - padding;

  for (let i = 0; i < countHours; i++) {
      let angleInRadians = (angleInDegreesStart + step * i) * (Math.PI / 180);
      let x = radius * Math.cos(angleInRadians) + val / 2;
      let y = radius * Math.sin(angleInRadians) + val / 2;

      let hoursEl = createElements('circle', 'hoursEl', SVGElem);
      hoursEl.setAttribute('cx', x);
      hoursEl.setAttribute('cy', y);
      hoursEl.setAttribute('r', hoursVal / 2);
      hoursEl.setAttribute('fill', 'green');
      hoursEl.setAttribute('stroke', 'white');
      hoursEl.setAttribute('stroke-width', 1);

      let textEl = createElements('text', 'textEl', SVGElem);
      textEl.setAttribute('x', x);
      textEl.setAttribute('y', y);
      textEl.setAttribute('text-anchor', 'middle');
      textEl.setAttribute('dy', '0.35em');
      textEl.setAttribute('fill', 'white');
      textEl.setAttribute('font-size', `${sizeNumbersOfClock}rem`);
      textEl.textContent = 1 + i;
  }
  let timeBlock = createElements('text', 'time', SVGElem);
  timeBlock.setAttribute('x', val / 2);
  timeBlock.setAttribute('y', val * 25 / 100);
  timeBlock.setAttribute('text-anchor', 'middle');
  timeBlock.setAttribute('fill', 'black');
  timeBlock.setAttribute('font-size', `${sizeOfTimeBlock}rem`);

  showArrows();
  
}

function showArrows() {
    secondsArrow = createElements('line', 'secondsArrow', SVGElem);
    minutesArrow = createElements('line', 'minutesArrow', SVGElem);
    hoursArrow = createElements('line', 'hoursArrow', SVGElem);

    [secondsArrow, minutesArrow, hoursArrow].forEach(arrow => {
        arrow.setAttribute('x1', val / 2);
        arrow.setAttribute('y1', val / 2);
        arrow.setAttribute('stroke', 'black');
        arrow.setAttribute('stroke-linecap', 'round');
    });

    secondsArrow.setAttribute('x2', val / 2);
    secondsArrow.setAttribute('y2', val * 0.1);
    secondsArrow.setAttribute('stroke-width', val / 100 );

    minutesArrow.setAttribute('x2', val / 2);
    minutesArrow.setAttribute('y2', val * 0.2);
    minutesArrow.setAttribute('stroke-width', val / 100 * 2);

    hoursArrow.setAttribute('x2', val / 2);
    hoursArrow.setAttribute('y2', val * 0.3);
    hoursArrow.setAttribute('stroke-width', val / 100 * 3);
    showDate();
}

function showDate() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let partOfMinute = seconds / 60 * stepOfArrow;
    let partOfHour = minutes / 60 * stepOfArrowHours;
    setTimeout(showDate, 1000);
    let timeArr = [hours, minutes, seconds].map(times => String(times).padStart(2, '0'));
    let time = `${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`;
    let timeBlock = document.querySelector('.time');
    timeBlock.textContent = time;
    secondsArrow.setAttribute('transform', `rotate(${seconds * stepOfArrow}, ${val / 2}, ${val / 2})`);
    minutesArrow.setAttribute('transform', `rotate(${minutes * stepOfArrow + partOfMinute}, ${val / 2}, ${val / 2})`);
    hoursArrow.setAttribute('transform', `rotate(${hours * stepOfArrowHours + partOfHour}, ${val / 2}, ${val / 2})`); 
    console.log(time)
}
