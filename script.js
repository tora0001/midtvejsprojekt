window.addEventListener("load", start);

let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

let spideyWidth = 45;
let spideyHeight = 30;
let spideyX = boardWidth / 8;
let spideyY = boardHeight / 2;
let spideyImg;

let spidey = {
  x: spideyX,
  y: spideyY,
  width: spideyWidth,
  height: spideyHeight,
};

let towerArray = [];
let towerWidth = 64;
let towerHeight = 512;
let towerX = boardWidth;
let towerY = 0;

let topTowerImg;
let bottomTowerImg;

let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

const gameOverMessage = document.querySelector("#game-over-message");

function start() {
  board = document.querySelector("#board");
  board.height = boardHeight;
  board.width = boardWidth;
  context = board.getContext("2d");

  spideyImg = new Image();
  spideyImg.src = "./spidey.png";
  spideyImg.onload = function () {
    context.drawImage(spideyImg, spidey.x, spidey.y, spidey.width, spidey.height);
  };

  topTowerImg = new Image();
  topTowerImg.src = "./toptower.png";

  bottomTowerImg = new Image();
  bottomTowerImg.src = "./bottomtower.png";

  requestAnimationFrame(update);
  setInterval(placeTowers, 1500);
  document.addEventListener("keydown", moveSpidey);
}

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  velocityY += gravity;
  spidey.y = Math.max(spidey.y + velocityY, 0);
  context.drawImage(spideyImg, spidey.x, spidey.y, spidey.width, spidey.height);

  if (spidey.y > board.height) {
    gameOver = true;
  }

  for (let i = 0; i < towerArray.length; i++) {
    let tower = towerArray[i];
    tower.x += velocityX;
    context.drawImage(tower.img, tower.x, tower.y, tower.width, tower.height);

    if (!tower.passed && spidey.x > tower.x + tower.width) {
      score += 0.5;
      tower.passed = true;
    }

    if (detectCollision(spidey, tower)) {
      gameOver = true;
    }
  }

  while (towerArray.length > 0 && towerArray[0].x < -towerWidth) {
    towerArray.shift();
  }

  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if (gameOver) {
    gameOverMessage.innerHTML = `GAME OVER YOU GOT ${score} POINTS`;
    playBuzzSound();
  }
}

function placeTowers() {
  if (gameOver) {
    return;
  }

  let randomTowerY = towerY - towerHeight / 4 - Math.random() * (towerHeight / 2);
  let openingSpace = board.height / 4;

  let topTower = {
    img: topTowerImg,
    x: towerX,
    y: randomTowerY,
    width: towerWidth,
    height: towerHeight,
    passed: false,
  };
  towerArray.push(topTower);

  let bottomTower = {
    img: bottomTowerImg,
    x: towerX,
    y: randomTowerY + towerHeight + openingSpace,
    width: towerWidth,
    height: towerHeight,
    passed: false,
  };
  towerArray.push(bottomTower);
}

function moveSpidey(e) {
  if (e.code == "Space" || e.code == "ArrowUp") {
    velocityY = -6;
    playJumpSound();

    if (gameOver) {
      spidey.y = spideyY;
      towerArray = [];
      score = 0;
      gameOver = false;
      gameOverMessage.innerHTML = "Flappy Spidey";
    }
  }
}

function playJumpSound() {
  var sound = new Audio("jump.wav");
  sound.play();
  sound.volume = 0.1;
}

function playBuzzSound() {
  var buzzSound = new Audio("buzzer.wav");
  buzzSound.play();
  buzzSound.volume = 0.2;
}

function detectCollision(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
