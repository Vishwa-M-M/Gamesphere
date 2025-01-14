const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const currentPlayerDisplay = document.getElementById('currentPlayer');
const winnerDisplay = document.getElementById('winner');

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        if (gameOver) return;  // Prevent further moves after game over
        
        const index = e.target.dataset.index;
        
        // If cell is already taken, do nothing
        if (board[index] !== '') return;

        // Update the board
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add('taken');
        
        // Check for a winner
        if (checkWinner(currentPlayer)) {
            gameOver = true;
            winnerDisplay.textContent = `Player ${currentPlayer} wins!`;
            winnerDisplay.classList.add('winner');
        } else {
            // Switch players
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    });
});

function checkWinner(player) {
    // Check all possible win conditions
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];

    for (let pattern of winPatterns) {
        if (pattern.every(index => board[index] === player)) {
            return true;
        }
    }
    return false;
}
