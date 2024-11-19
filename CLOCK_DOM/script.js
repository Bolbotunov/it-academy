let container__btn = document.querySelector('.container__btn')
let btn = document.querySelector('.btn')
let input = document.querySelector('.input')
let clock
let hoursEl
let hoursVal
let div
let timeBlock
let secondsArrow
let minutesArrow
let val
let hoursArrow
let countHours = 12
let step = 360 / countHours
let angleInDegreesStart = 90
let stepOfArrowHours = 360 / 12 
let stepOfArrow = 360 / 60

let clockStyles = {
  backgroundColor: 'orange',
  position:'relative',
  display:'flex',
  alignItems: 'start',
  justifyContent:'center',
  borderRadius:'50%',
}

let hoursStyles = {
  backgroundColor: 'green',
  position:'absolute',
  borderRadius:'50%',
  display:'flex',
  alignItems: 'center',
  justifyContent:'center',
  color:'white',
  left: 0,
  top: 0,
}

let timeStyles = {
  width: '25%',
  height: '20px',
  position:'relative',
  textAlign: 'center',
  color:'black',
  fontSize: '1.2rem',
  top: '25%'
}

let arrowsStyles = {
  width: '4px',
  height: '50%',
  backgroundColor: 'black',
  position:'absolute',
  borderRadius:'40%',
  transformOrigin: '49% 94%',
  bottom:'47%',
  transform:'rotate(0deg)',
}

btn.addEventListener('click', buildClock)

function createElements(addClassElem, whereAddElement) {
  div = document.createElement('div')
  div.classList.add(addClassElem)
  whereAddElement.appendChild(div)
}

function buildClock() {
  val = input.value
  if (val < 200 || val > 800) {
    return alert('введен недопустимый размер')
  }
  container__btn.innerHTML = ''
  createElements('clock', container__btn)
  clock = document.querySelector('.clock')
  clockStyles.width = `${val}px`
  clockStyles.height = `${val}px`
  for(let key in clockStyles) {
    clock.style[key] = `${clockStyles[key]}`
  }
  createHours()
}


function createHours() {
  hoursVal = val / 100 * 10
  let padding = val * 0.075
  let radius = val / 2 - padding;
    for (let i = 0; i < countHours; i++) {
  let angleInRadians = (angleInDegreesStart + step * i) * (Math.PI / 180);
  let x = radius * Math.cos(angleInRadians);
  let y = radius * Math.sin(angleInRadians);
    createElements('hoursEl', clock)
  let hoursEl = document.querySelectorAll('.hoursEl')[i]
  hoursEl.innerHTML = countHours - i
    for(let key in hoursStyles) {
      hoursEl.style[key] = `${hoursStyles[key]}`
    }
  hoursEl.style.width =  `${hoursVal}px`
  hoursEl.style.height = `${hoursVal}px`
  hoursEl.style.left = `calc(50% + ${x - hoursVal / 2}px)`
  hoursEl.style.top = `calc(50% - ${y + hoursVal / 2}px)`
  }
  createElements('time', clock)
  timeBlock = document.querySelector('.time')
    for (let key in timeStyles) {
    timeBlock.style[key] = `${timeStyles[key]}`
    }
  showArrows()
  showDate()
}

function showArrows() {
  createElements('secondsArrow', clock)
  createElements('minutesArrow', clock)
  createElements('hoursArrow', clock)
  secondsArrow = document.querySelector('.secondsArrow')
  minutesArrow = document.querySelector('.minutesArrow')
  hoursArrow = document.querySelector('.hoursArrow')
  for (let key in arrowsStyles) {
    [secondsArrow, minutesArrow, hoursArrow].forEach(item => item.style[key] = `${arrowsStyles[key]}`)
  }
  minutesArrow.style.width = '6px'
  minutesArrow.style.height = '37%'
  hoursArrow.style.width = '10px'
  hoursArrow.style.height = '27%'
}

function showDate() {
  let date = new Date()
  let hours = String(date.getHours())
  let minutes = String(date.getMinutes())
  let seconds = String(date.getSeconds())
  let partOfMinute = seconds / 10
  let partOfHour = minutes /  60 * stepOfArrowHours
  setTimeout(showDate, 1000)
  let timeArr = [hours, minutes, seconds].map(times => times.padStart(2, '0'))
  let time = `${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`
  secondsArrow.style.transform = `rotate(${seconds * stepOfArrow}deg)`
  minutesArrow.style.transform = `rotate(${minutes * stepOfArrow + partOfMinute}deg)`
  hoursArrow.style.transform = `rotate(${hours * stepOfArrowHours + partOfHour}deg)`
  timeBlock.innerHTML = time
  console.log(time)
}
