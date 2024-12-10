const body = document.body;
const gameField = document.querySelector('.field')
gameField.style.position = 'relative'
gameField.style.border = '3px solid white'
let start = document.querySelector('.start')
let pathsLengths = {}

start.addEventListener('click', startGame)

class Road {
  constructor(fieldSVG, offsetX = 0, offsetY = 0) {
    this.fieldSVG = fieldSVG;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.group.setAttribute('transform', `translate(${this.offsetX}, ${this.offsetY})`);
    this.fieldSVG.appendChild(this.group);
  }

  createRect(x, y, width, height, transform, fill) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('transform', transform);
    rect.setAttribute('fill', fill);
    this.group.appendChild(rect);
  }

  draw() {
    this.createRect('100', '100', '100', '50', 'rotate(-180 100 100)', '#D9D9D9');
    this.createRect('50', '52', '2', '10', 'rotate(-90 75 52)', 'white');
    this.createRect('0', '52', '2', '10', 'rotate(-90 25 52)', 'white');
    this.createRect('25', '52', '2', '10', 'rotate(-90 50 52)', 'white');
    this.createRect('-25', '52', '2', '10', 'rotate(-90 0 52)', 'white');
    this.createRect('-48', '4', '2', '100', 'rotate(-90 0 4)', '#E5AE09');
    this.createRect('2', '-4', '2', '100', 'rotate(90 0 96)', '#E5AE09');
  }

  createPath(id, pathCoordinates) {
    let route = document.createElementNS("http://www.w3.org/2000/svg", "path");
    route.setAttribute('id', id);
    route.setAttribute('d', pathCoordinates);
    route.setAttribute('stroke', 'black');
    route.setAttribute('fill', 'transparent');
    fieldSVG.appendChild(route);
    let pathLength = route.getTotalLength();
    pathsLengths[`#${id}`] = { length: pathLength, element: route }
    console.log(pathsLengths);
  }
}

let fieldSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
fieldSVG.setAttribute('width', '870');
fieldSVG.setAttribute('height', '690');
fieldSVG.setAttribute('viewBox', '0 0 870 690');
fieldSVG.setAttribute('fill', '#E50E09');
fieldSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
fieldSVG.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
gameField.appendChild(fieldSVG);

let n = 9;
let offsetX = 0;
for (let i = 0; i < n; i++) {
  const roadPart = new Road(fieldSVG, offsetX, 0);
  roadPart.draw(); // создание дороги
  offsetX += 100;
}
const roadPath = new Road(fieldSVG); // создание пути для автомобилей
roadPath.createPath('route1', 'M0 90 L 870 90');
roadPath.createPath('route2', 'M870 65 L 0 65');

let elapsedTime = 0;
let elapsedTimeTraffic = 0
let checkTimeTraffic = 0
let checkTime = 0;
let waitingTime = 5
let newWaitingTime = 0
let timeOfCrazyRide = 2
let gameInterval;
let cars = []; // Массив для хранения всех созданных машинок
let trafficLightsOn = true; // Состояние светофора

class Auto {
  constructor(route, duration, typeCar, speed, R) {
    this.R = R
    this.route = route;
    this.duration = duration;
    this.typeCar = typeCar;
    this.animateMotion = null;
    this.speed = speed || 3;
    this.position = 0; // Изначальная позиция машинки
    this.originalSpeed = this.speed;
  }

 createAuto() {
    const auto = document.createElementNS("http://www.w3.org/2000/svg", "image");
    auto.setAttribute('href', this.typeCar);
    auto.setAttribute('width', '35');
    auto.setAttribute('x', '-25');
    auto.setAttribute('y', '0');
    auto.setAttribute('height', '35');
    auto.setAttribute('transform', 'translate(0, -18)');
    auto.setAttribute('id', this.route);
    this.autoElement = auto;
    fieldSVG.appendChild(auto);
    return this;
  }

  move() {
    const pathInfo = pathsLengths[this.route];
    let index = cars.indexOf(this);
    let safeDistance = 25;
    if (!trafficLightsOn && this.speed === 0 && elapsedTime - elapsedTimeTraffic >= waitingTime && newWaitingTime < timeOfCrazyRide) {
      newWaitingTime = elapsedTime - elapsedTimeTraffic - waitingTime
      this.speed = this.originalSpeed * 5
    } else if (!trafficLightsOn && newWaitingTime >= timeOfCrazyRide) {
      elapsedTimeTraffic = elapsedTime
      newWaitingTime = 0
      this.speed === 0
    }

    if (!trafficLightsOn && this.position >= 430 && this.position < 450 && elapsedTime - elapsedTimeTraffic < waitingTime) {
      this.speed = 0;
    } else {
      if (index > 0) {
        let previousCar = cars[index - 1];
        if (previousCar.position - this.position < safeDistance * 2 && previousCar.position - this.position > safeDistance) {
          this.speed = 0.9;
        } else if (previousCar.position - this.position <= safeDistance) {
          this.speed = 0;
        } else {
          this.speed = this.originalSpeed;
        }
      } else {
          this.speed = this.originalSpeed;
        }
      }

    if (this.position < pathInfo.length) {
      this.position += this.speed * 0.5;
      const point = pathInfo.element.getPointAtLength(this.position);
      this.autoElement.setAttribute('transform', `translate(${point.x}, ${point.y - 18})`)
    }
    if (this.position >= pathInfo.length) {
      this.autoElement.remove();
      cars = cars.filter(car => car !== this)
    }
  }
}
// ===================Светофор==================================
let div = document.createElement('div');
gameField.appendChild(div);
div.classList.add('lights');

let trafficLights = document.querySelector('.lights');
trafficLights.style.position = 'absolute';
trafficLights.style.width = '20px';
trafficLights.style.height = '20px';
trafficLights.style.backgroundColor = 'green';
trafficLights.style.borderRadius = '50%';
trafficLights.style.top = '77px';
trafficLights.style.left = '450px';

trafficLights.addEventListener('click', function() {

  if (trafficLightsOn) {
    trafficLights.style.backgroundColor = 'red';
    trafficLightsOn = false;
    elapsedTimeTraffic = elapsedTime
    cars.forEach(item => {
      if (item.position >= 430 && item.position < 450) {
        item.speed = 0;
      }
    });
  } else {
    trafficLights.style.backgroundColor = 'green';
    trafficLightsOn = true;
    console.log('greenOn');
    cars.forEach(item => {
      item.speed = item.originalSpeed; // Возвращаем оригинальную скорость машинкам
    });
  }
});

function startGame() {
  if (!gameInterval) {
    gameInterval = setInterval(gameTimer, 1000 / 60);
  }
}

function gameTimer() {
  elapsedTime += 1 / 60;
  const carsImg = 3;
  cars.forEach(car => car.move());

  if (elapsedTime - checkTime >= 2) {
    let randomImg = Math.floor(Math.random() * carsImg) + 1;
    let newAuto = new Auto('#route1', '5s', `assets/car${randomImg}.png`, 3, 0).createAuto();
    let newAuto2 = new Auto('#route2', '5s', `assets/car${randomImg}.png`, 3, 180).createAuto();
    cars.push(newAuto); // Добавляем новую машинку в массив
    cars.push(newAuto2); // Добавляем новую машинку в массив
    checkTime = elapsedTime;
  }
}
