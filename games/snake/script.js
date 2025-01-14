const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20; // Size of each block (snake body, food)
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let food;
let score;
let direction;
let gameOver = false;
let gameInterval; // Store the game interval

document.addEventListener('keydown', changeDirection);

function startGame() {
    snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    food = generateFood();
    score = 0;
    direction = 'RIGHT';

    gameOver = false;

    // Clear previous interval if any
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // Start the game loop with the desired speed (100 ms)
    gameInterval = setInterval(updateGame, 100);
}

function updateGame() {
    if (gameOver) {
        // Stop the game loop when the game is over
        clearInterval(gameInterval);
        alert('Game Over! Final Score: ' + score);
        startGame(); // Restart the game
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    checkCollisions();
    checkFoodCollision();
    drawSnake();
    drawFood();
    updateScore();
}

function moveSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;

    snake.unshift(head);
    snake.pop();
}

function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen'; // Head is green, body is light green
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
    });
}

function generateFood() {
    const x = Math.floor(Math.random() * rows);
    const y = Math.floor(Math.random() * columns);
    return { x, y };
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);
}

function checkCollisions() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns) {
        gameOver = true;
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameOver = true;
        }
    }
}

function checkFoodCollision() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        snake.push({ x: head.x, y: head.y });
        food = generateFood();
        score++;
    }
}

function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
}

// Start the game when the page loads
startGame();
