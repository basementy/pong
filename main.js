var player1 = {
  posX: 355,
  posY: 550,
  width: 100,
  height: 15,
  velocity: 50,
  score: 0,
};

var player2 = {
  posX: 355,
  posY: 35,
  width: 100,
  height: 15,
  velocity: 50,
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
  ctx.fillText(player1.score, 290, 325);
  ctx.fillText(player2.score, 500, 325);
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

  if(ball.posX <= 0) {
    ball.poX = 0;
    ball.dirX = getRandomDir(-3, 3);
  }
  if(ball.posX >= (800 - ball.width)) {
    ball.poX = 800 - ball.width;
    ball.dirX = getRandomDir(-3, 3);
  }

  if(ball.posY <= 0) {
    player1.score++;
    update();
  }
  if(ball.posY >= (600 - ball.height)) {
    player2.score++;
    update();
  }

  if(player1.posX <= 0) {
    player1.posX = 0;
  }
  if(player1.posX >= (800 - player1.width)) {
    player1.posX = (800 - player1.width);
  }

  if(player2.posX <= 0) {
    player2.posX = 0;
  }
  if(player2.posX >= (800 - player2.width)) {
    player2.posX = (800 - player2.width);
  }
}

function verifyCollisionPlayer() {
  if((ball.posY >= (player1.posY - 30)) && (ball.posX >= player1.posX) && ball.posX <= (player1.posX + player1.width)) {
    ball.dirY = getRandomDir(-1, -3);
    ball.dirX = getRandomDir(0, 3);
  }
  if((ball.posY <= (player2.posY + 30)) && (ball.posX >= player2.posX) && ball.posX <= (player2.posX + player2.width)) {
    ball.dirY = getRandomDir(1, 3);
    ball.dirX = getRandomDir(-3, 0);
  }
}

function verifyCollisions() {
  verifyCollisionPlayer();
  verifyCollisionBallWall();
}

function update() {
  ball.posX = canvas.width / 2;
  ball.posY = canvas.height / 2;
  ball.dirY = getRandomDir(-3, 3);
  ball.dirX = getRandomDir(-3, 3);
}

// Checa vencedor e possibilidade de bugs
function check() {
  var title = document.querySelector("a");
  if(player1.score == 3 || player2.score == 3) {
    ball.posX = canvas.width / 2;
    ball.posY = canvas.height / 2;
    if(player1.score == 3) {
      title.innerHTML = "O Player 1 ganhou! Clique aqui para recomeçar";
    }else if(player2.score == 3) {
      title.innerHTML = "O Player 2 ganhou! Clique aqui para recomeçar";
    }
  }
  if(ball.dirY == 0) {
    update();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  calculateBall();
  verifyCollisions();
  draw(canvas, ctx);
  check();
  console.log(ball.posY);
}

window.onload = function() {
  var canvas = document.getElementById('game');
  ball.posX = canvas.width / 2;
  ball.posY = canvas.height / 2;
  ball.dirY = getRandomDir(-3, 3);
  ball.dirX = getRandomDir(-3, 3);
  setInterval(gameLoop, 1000 / 60);
}

window.onkeydown = function(key) {
  move(key);
}