var player1 = {
  posX: 360,
  posY: 550,
  width: 100,
  height: 15,
  velocity: 55,
  score: 0,
};

var player2 = {
  posX: 360,
  posY: 35,
  width: 100,
  height: 15,
  velocity: 55,
  score: 0,
};

var ball = {
  posX: 0,
  posY: 0,
  width: 15,
  height: 15,
  dirX: 3,
  dirY: 3,
}

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

function getRandomDir(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function drawScores(canvas, ctx) {
  ctx.font = '48px Poppins';
  ctx.fillText(player1.score, 290, 300);
  ctx.fillText(player2.score, 500, 300);
  ctx.fillStyle = "#E53481";
}

function drawCursorPlayer1(canvas, ctx) {
  ctx.fillRect(player1.posX, player1.posY, player1.width, player1.height);
}

function drawCursorPlayer2(canvas, ctx) {
  ctx.fillRect(player2.posX, player2.posY, player2.width, player2.height);
}

function drawCursors(canvas, ctx) {
  drawCursorPlayer1(canvas, ctx);
  drawCursorPlayer2(canvas, ctx);
}

function drawBall(canvas, ctx) {
  ctx.fillRect(ball.posX, ball.posY, ball.width, ball.height);
}

function draw(canvas, ctx) {
  drawCursors(canvas, ctx);
  drawScores(canvas, ctx);
  drawBall(canvas, ctx);
}

function movePlayer1(key) {
  if(key.keyCode == 37) {
    player1.posX -= player1.velocity;
  }else if(key.keyCode == 39) {
    player1.posX += player1.velocity;
  }
}

function movePlayer2(key) {
  if(key.keyCode == 65) {
    player2.posX -= player2.velocity;
  }else if(key.keyCode == 68) {
    player2.posX += player2.velocity;
  }
}

function move(key) {
  movePlayer1(key);
  movePlayer2(key);
}

function calculateBall() {
  ball.posX += ball.dirX;
  ball.posY += ball.dirY;
}

function verifyCollisionBallWall() {
  if(ball.posX <= 0 || ball.posX >= (800 - ball.width)) {
    ball.dirX = getRandomDir(-3, 3);
  }

  if(ball.posY <= 0) {
    player1.score++;
    ball.posX = canvas.width / 2;
    ball.posY = canvas.height / 2;
    ball.dirY = getRandomDir(-5, 5);
    ball.dirX = getRandomDir(-3, 3);
  }
  if(ball.posY >= 600) {
    player2.score++;
    ball.posX = canvas.width / 2;
    ball.posY = canvas.height / 2;
    ball.dirY = getRandomDir(-5, 5);
    ball.dirX = getRandomDir(-3, 3);
  }
  if(ball.posY == (player1.posY - ball.height)) {
    console.log("Alo");
  }
}

function verifyCollisions() {
  verifyCollisionBallWall();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  calculateBall();
  verifyCollisions();
  draw(canvas, ctx);
  console.log(ball.posY);
}

window.onload = function() {
  var canvas = document.getElementById('game');
  ball.posX = canvas.width / 2;
  ball.posY = canvas.height / 2;
  ball.dirY = getRandomDir(-5, 5);
  ball.dirX = getRandomDir(-3, 2);
  setInterval(gameLoop, 1100 / 60);
}

window.onkeydown = function(key) {
  move(key);
}