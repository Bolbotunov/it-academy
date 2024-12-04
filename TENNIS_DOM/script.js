
const body = document.body
body.style.display = 'flex'
body.style.flexDirection = 'column'
body.style.alignItems = 'center'
body.style.justifyContent = 'center'
body.style.height = '100vh'
body.style.margin = '0'
let start = document.querySelector('.start')
let startBallSpeedX = 4;
let startBallSpeedY = 4;

start.addEventListener('click', startGame)
let continueGame = true
let fieldStyle = {
  width: '500px',
  height: '360px',
  border: '2px solid rgb(139, 69, 19)',
  backgroundColor: 'rgb(245, 222, 179)',
  position: 'relative',
  boxSizing: 'border-box',
}
let field
function createField() {
  field = document.createElement('div')
    for(key in fieldStyle) {
      field.style[key] = fieldStyle[key]
 }
  body.appendChild(field)
}
createField()

class Rackets {
  constructor(styles) {
    this.styles = styles
    this.positionY = field.offsetHeight / 2
    this.speed = 0
  }
  createRacket() {
    let racket = document.createElement('div')
    racket.classList.add('racket')
    for (key in this.styles) {
      racket.style[key] = this.styles[key]
    }
    racket.style.top = `${this.positionY}px`
    return racket
  }
  moveRacket(side) {
    let racket = document.querySelector(side)
    this.positionY += this.speed
    let stopBorder = this.positionY + this.speed
    if (stopBorder + racket.offsetHeight / 2 >= field.offsetHeight) {
      stopBorder = field.offsetHeight -  racket.offsetHeight / 2
      this.positionY = stopBorder - 2
      createRacketLeft.speed = 0;
    }
    if (stopBorder <= racket.offsetHeight / 2) {
      stopBorder = racket.offsetHeight / 2
      this.positionY = stopBorder
      createRacketRight.speed = 0;
    }
    racket.style.top = `${this.positionY}px`
    this.coordinates = racket.getBoundingClientRect()
  }
}

let leftRacketStyles = {
  width: '20px',
  height: '80px',
  backgroundColor: 'rgb(106, 90, 205)',
  position: 'absolute',
  left:'0px',
  transform: 'translateY(-50%)',
  top:'50%',
  speed:10,
 }

 let rightRacketStyles = {
  width: '20px',
  height: '80px',
  backgroundColor: 'rgb(34, 139, 34)',
  position: 'absolute',
  right:'0px',
  transform: 'translateY(-50%)',
  top:'50%',
  speed:10,
 }


let createRacketLeft = new Rackets(leftRacketStyles)
let createRacketRight = new Rackets(rightRacketStyles)
let leftRacket = createRacketLeft.createRacket()
leftRacket.classList.add('left')
let rightRacket = createRacketRight.createRacket()
rightRacket.classList.add('right')
field.appendChild(leftRacket)
field.appendChild(rightRacket)


class Ball {
  constructor(styles, leftRacket, rightRacket, leftScore, rightScore) {
    this.styles = styles
    this.positionX = field.offsetWidth / 2 - parseFloat(styles.width) / 2
    this.positionY = field.offsetHeight / 2 - parseFloat(styles.height) / 2
    this.leftRacket = leftRacket
    this.rightRacket = rightRacket
    this.leftScore = leftScore
    this.rightScore = rightScore
  }
  resetBall() { 
    this.positionX = field.offsetWidth / 2 - parseFloat(this.styles.width) / 2;
    this.positionY = field.offsetHeight / 2 - parseFloat(this.styles.height) / 2;
    createRacketLeft.positionY = field.offsetHeight / 2;
    createRacketRight.positionY = field.offsetHeight / 2;
    leftRacket.style.top = `${createRacketLeft.positionY}px`;
    rightRacket.style.top = `${createRacketRight.positionY}px`;
    let signX = Math.random() > 0.5 ? 1 : -1;
    let signY = Math.random() > 0.5 ? 1 : -1;
    this.styles.speedX = startBallSpeedX * signX
    this.styles.speedY = startBallSpeedY * signY
    ball.style.left = `${this.positionX}px`
    ball.style.top = `${this.positionY}px`
    }

  createBall() {
    let ball = document.createElement('div')
    ball.classList.add('ball')
    for (let key in this.styles) {
      ball.style[key] = this.styles[key]
    }
    ball.style.left = `${this.positionX}px`
    ball.style.top = `${this.positionY}px`
    return ball
  }
  newMove() {
    let ball = document.querySelector('.ball')
    let radius = ball.offsetWidth / 2
      this.positionX -= this.styles.speedX 
      this.positionY -= this.styles.speedY 
      ball.style.left = `${this.positionX}px`
      ball.style.top = `${this.positionY}px`
      
    if (this.positionX + radius * 1.4 >= field.offsetWidth) {
      let score = parseFloat(this.leftScore.innerHTML)
      this.styles.speedX = 0
      this.styles.speedY = 0
      continueGame = false
      this.leftScore.innerHTML = score + 1

    }

    if (this.positionX - radius <= 0) {
      let score = parseFloat(this.rightScore.innerHTML)
      this.styles.speedX = 0
      this.styles.speedY = 0
      continueGame = false
      this.rightScore.innerHTML = score + 1
    }


    if (this.positionY + radius >= field.offsetHeight) {
      this.styles.speedY = -this.styles.speedY
      this.positionY = field.offsetHeight - radius
      ball.style.top = `${this.positionY}px`
    }

    if (this.positionY - radius <= 0) {
      this.styles.speedY = -this.styles.speedY
      this.positionY = radius
      ball.style.top = `${this.positionY}px`
    }
    let ballCenterY = ball.getBoundingClientRect().top + radius
    let ballCenterX = ball.getBoundingClientRect().left + radius
    
    let leftRacketTop = this.leftRacket.coordinates.top
    let leftRacketBottom = this.leftRacket.coordinates.bottom
    let leftRacketRight = this.leftRacket.coordinates.right

    let rightRacketTop = this.rightRacket.coordinates.top
    let rightRacketBottom = this.rightRacket.coordinates.bottom
    let rightRacketLeft = this.rightRacket.coordinates.left


    if (ballCenterY + radius >= leftRacketTop && ballCenterY <= leftRacketBottom && ballCenterX - radius  <=  leftRacketRight) {
      if ((leftRacketTop + leftRacketBottom) / 2 > ballCenterY) {
        if (this.styles.speedY > 0) {this.styles.speedY = this.styles.speedY}
        else {this.styles.speedY = -this.styles.speedY}
      this.styles.speedX = -this.styles.speedX
      } else if ((leftRacketTop + leftRacketBottom) / 2 <= ballCenterY - radius) {
        if (this.styles.speedY > 0) {this.styles.speedY = -this.styles.speedY}
        else {this.styles.speedY = this.styles.speedY}
      this.styles.speedX = -this.styles.speedX
      }
    }

    if (ballCenterY + radius >= rightRacketTop && ballCenterY <= rightRacketBottom && ballCenterX + radius  >=  rightRacketLeft) {
      if ((rightRacketTop + rightRacketBottom) / 2 < ballCenterY) {
        if (this.styles.speedY > 0) {this.styles.speedY = -this.styles.speedY}
        else {this.styles.speedY = this.styles.speedY}
      this.styles.speedX = -this.styles.speedX
      } else if ((rightRacketTop + rightRacketBottom) / 2 > ballCenterY - radius) {
        if (this.styles.speedY > 0) {this.styles.speedY = this.styles.speedY}
        else {this.styles.speedY = -this.styles.speedY}
      this.styles.speedX = -this.styles.speedX
      }
    }

}
}

let ballStyles = {
  width: '20px',
  height: '20px',
  backgroundColor: 'rgb(255, 0, 0)',
  position: 'absolute',
  borderRadius: '50%',
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  speedX: 4,
  speedY: 4,
}


document.addEventListener('keydown', function(event) {
  if (event.key === 'Control') {
    createRacketLeft.speed = leftRacketStyles.speed;
  }
  if (event.key === 'Shift') {
    createRacketLeft.speed = -leftRacketStyles.speed;
  }
  if (event.key === 'ArrowDown') {
    createRacketRight.speed = rightRacketStyles.speed;
  }
  if (event.key === 'ArrowUp') {
    createRacketRight.speed = -rightRacketStyles.speed;
  }
})

document.addEventListener('keyup', function(event) {
  if (event.key === 'Shift' || event.key === 'Control') { 
    createRacketLeft.speed = 0;
  }
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { 
    createRacketRight.speed = 0;
  }
  })

let leftPlayer = document.querySelector('.scoreLeft')
let rightPlayer = document.querySelector('.scoreRight')
let createBall = new Ball(ballStyles, createRacketLeft, createRacketRight, leftPlayer, rightPlayer)
let ball = createBall.createBall()
field.appendChild(ball)

let gameInterval
function startGame() {
  if (!gameInterval) {
    gameInterval = setInterval(gameTimer, 1000 / 60)
  } else {
    createBall.resetBall()
  }
  continueGame = true
}

function gameTimer() {
  if (continueGame) {
    createRacketRight.moveRacket('.right')
    createRacketLeft.moveRacket('.left')
    createBall.newMove()
  }
}
