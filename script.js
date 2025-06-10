const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Constants
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
const BALL_SIZE = 12;
const PLAYER_X = 20;
const AI_X = canvas.width - PADDLE_WIDTH - 20;
const PADDLE_SPEED = 5;
const AI_SPEED = 3;

// Game state
let playerY = (canvas.height - PADDLE_HEIGHT) / 2;
let aiY = (canvas.height - PADDLE_HEIGHT) / 2;

let ballX = canvas.width / 2 - BALL_SIZE / 2;
let ballY = canvas.height / 2 - BALL_SIZE / 2;
let ballSpeedX = 4 * (Math.random() < 0.5 ? 1 : -1);
let ballSpeedY = 3 * (Math.random() < 0.5 ? 1 : -1);

// Mouse control
canvas.addEventListener('mousemove', function(evt) {
  const rect = canvas.getBoundingClientRect();
  const scaleY = canvas.height / rect.height;
  let mouseY = (evt.clientY - rect.top) * scaleY;
  playerY = mouseY - PADDLE_HEIGHT / 2;

  // Clamp paddle
  if (playerY < 0) playerY = 0;
  if (playerY > canvas.height - PADDLE_HEIGHT) playerY = canvas.height - PADDLE_HEIGHT;
});

// Draw functions
function drawRect(x, y, w, h, color = '#fff') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color = '#fff') {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
}

// AI movement
function moveAI() {
  // Simple AI: move towards the ball
  let aiCenter = aiY + PADDLE_HEIGHT / 2;
  if (aiCenter < ballY + BALL_SIZE / 2 - 10) {
    aiY += AI_SPEED;
  } else if (aiCenter > ballY + BALL_SIZE / 2 + 10) {
    aiY -= AI_SPEED;
  }

  // Clamp paddle
  if (aiY < 0) aiY = 0;
  if (aiY > canvas.height - PADDLE_HEIGHT) aiY = canvas.height - PADDLE_HEIGHT;
}

// Ball movement and collision
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Top and bottom wall collision
  if (ballY < 0) {
    ballY = 0;
    ballSpeedY = -ballSpeedY;
  }
  if (ballY + BALL_SIZE > canvas.height) {
    ballY = canvas.height - BALL_SIZE;
    ballSpeedY = -ballSpeedY;
  }

  // Paddle collision: left (player)
  if (
    ballX < PLAYER_X + PADDLE_WIDTH &&
    ballY + BALL_SIZE > playerY &&
    ballY < playerY + PADDLE_HEIGHT
  ) {
    ballX = PLAYER_X + PADDLE_WIDTH; // prevent sticking
    ballSpeedX = -ballSpeedX;
    // Add some "spin" based on where it hit the paddle
    let collidePoint = (ballY + BALL_SIZE/2) - (playerY + PADDLE_HEIGHT/2);
    ballSpeedY = collidePoint * 0.2;
  }

  // Paddle collision: right (AI)
  if (
    ballX + BALL_SIZE > AI_X &&
    ballY + BALL_SIZE > aiY &&
    ballY < aiY + PADDLE_HEIGHT
  ) {
    ballX = AI_X - BALL_SIZE; // prevent sticking
    ballSpeedX = -ballSpeedX;
    let collidePoint = (ballY + BALL_SIZE/2) - (aiY + PADDLE_HEIGHT/2);
    ballSpeedY = collidePoint * 0.2;
  }

  // Left and right wall: reset ball
  if (ballX < 0 || ballX > canvas.width - BALL_SIZE) {
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width / 2 - BALL_SIZE / 2;
  ballY = canvas.height / 2 - BALL_SIZE / 2;
  // Randomize direction
  ballSpeedX = 4 * (Math.random() < 0.5 ? 1 : -1);
  ballSpeedY = 3 * (Math.random() < 0.5 ? 1 : -1);
}

// Main game loop
function gameLoop() {
  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw net
  for(let i=0; i < canvas.height; i+=30) {
    drawRect(canvas.width/2 - 2, i, 4, 20, '#444');
  }

  // Draw paddles and ball
  drawRect(PLAYER_X, playerY, PADDLE_WIDTH, PADDLE_HEIGHT, '#fff');
  drawRect(AI_X, aiY, PADDLE_WIDTH, PADDLE_HEIGHT, '#fff');
  drawBall(ballX, ballY, BALL_SIZE, '#0ff');

  // Move
  moveAI();
  moveBall();

  requestAnimationFrame(gameLoop);
}

// Start
gameLoop();