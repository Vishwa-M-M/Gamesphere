// When a game card is clicked, navigate to the corresponding game page
document.getElementById("tic-tac-toe").addEventListener("click", () => {
    window.location.href = "/games/tic-tac-toe.html"; // Adjust the path as needed
});

document.getElementById("rock-paper-scissors").addEventListener("click", () => {
    window.location.href = "/games/rock-paper-scissors.html"; // Adjust the path as needed
});

document.getElementById("snake").addEventListener("click", () => {
    window.location.href = "/games/snake.html"; // Adjust the path as needed
});

document.getElementById("chess").addEventListener("click", () => {
    window.location.href = "/games/chess.html"; // Adjust the path as needed
});
