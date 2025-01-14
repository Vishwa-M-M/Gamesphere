const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const playerTurnElement = document.getElementById("player-turn");
let selectedPiece = null;
let currentPlayer = "White"; // Start with White
let gameBoard = [];

// Initial piece setup
const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

// Function to get piece image URL from Lichess API
function getPieceImageUrl(piece, color) {
    const style = 'alpha'; // You can choose other styles like 'merida', 'pirouetti', etc.
    return `https://lichess1.org/assets/piece/${style}/${color}${piece}.svg`;
}

// Set up the board with pieces
function setupBoard() {
    boardElement.innerHTML = "";  // Clear the board
    gameBoard = [];  // Reset game board array

    for (let row = 0; row < 8; row++) {
        gameBoard[row] = [];
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            if ((row + col) % 2 === 0) {
                square.classList.add("dark");
            }

            // Add piece to the square if there's one
            const piece = initialBoard[row][col];
            if (piece !== '.') {
                const color = piece === piece.toUpperCase() ? 'w' : 'b';
                const pieceType = piece.toLowerCase();
                const pieceImgUrl = getPieceImageUrl(pieceType.toUpperCase(), color);
                const pieceElement = document.createElement("img");
                pieceElement.src = pieceImgUrl;
                pieceElement.classList.add("piece");
                square.appendChild(pieceElement);
            }

            square.addEventListener("click", () => handleSquareClick(row, col));
            gameBoard[row][col] = square;
            boardElement.appendChild(square);
        }
    }
}

// Highlight possible moves for the selected piece
function highlightPossibleMoves(possibleMoves) {
    possibleMoves.forEach(([row, col]) => {
        gameBoard[row][col].classList.add("highlight");
    });
}

// Clear highlighted moves
function clearHighlights() {
    gameBoard.flat().forEach(square => {
        square.classList.remove("highlight");
        square.classList.remove("selected");
    });
}

// Get possible moves for the piece at the given position
function getPossibleMoves(piece, row, col) {
    let moves = [];
    if (piece === 'P') { // Pawn
        const direction = currentPlayer === "White" ? -1 : 1;
        if (row + direction >= 0 && row + direction < 8 && !gameBoard[row + direction][col].querySelector(".piece")) {
            moves.push([row + direction, col]);
        }
    }
    // Add more rules for other pieces here...
    return moves;
}

// Handle square click to select or move piece
function handleSquareClick(row, col) {
    clearHighlights();
    if (selectedPiece) {
        const selectedPiecePos = selectedPiece.pos;
        if (gameBoard[row][col].classList.contains("highlight")) {
            gameBoard[row][col].innerHTML = `<img src="${selectedPiece.piece.src}" class="piece">`;
            gameBoard[selectedPiecePos.row][selectedPiecePos.col].innerHTML = '';  // Clear the old square
            currentPlayer = currentPlayer === "White" ? "Black" : "White";
            playerTurnElement.textContent = `Current Player: ${currentPlayer}`;
        }
        selectedPiece = null;
    } else {
        const pieceElement = gameBoard[row][col].querySelector(".piece");
        if (pieceElement) {
            const pieceType = pieceElement.src.split('/').pop().charAt(1).toUpperCase();
            const pieceColor = pieceElement.src.split('/').pop().charAt(0) === 'w' ? "White" : "Black";
            if (pieceColor === currentPlayer) {
                selectedPiece = {
                    piece: pieceElement,
                    pos: { row, col }
                };
                const possibleMoves = getPossibleMoves(pieceType, row, col);
                highlightPossibleMoves(possibleMoves);
                gameBoard[row][col].classList.add("selected");
                statusElement.textContent = `Selected ${currentPlayer} ${pieceType}`;
            }
        }
    }
}





function getPossibleMoves(piece, row, col) {
    let moves = [];
    if (piece === 'P') { // White Pawn
        if (currentPlayer === "White") {
            if (row - 1 >= 0 && !gameBoard[row - 1][col].querySelector(".piece")) {
                moves.push([row - 1, col]);
                if (row === 6 && !gameBoard[row - 2][col].querySelector(".piece")) {
                    moves.push([row - 2, col]);
                }
            }
            // Capturing diagonally
            if (row - 1 >= 0 && col - 1 >= 0 && gameBoard[row - 1][col - 1].querySelector(".piece")) {
                const targetPiece = gameBoard[row - 1][col - 1].querySelector(".piece");
                if (targetPiece.src.includes('/b')) {
                    moves.push([row - 1, col - 1]);
                }
            }
            if (row - 1 >= 0 && col + 1 < 8 && gameBoard[row - 1][col + 1].querySelector(".piece")) {
                const targetPiece = gameBoard[row - 1][col + 1].querySelector(".piece");
                if (targetPiece.src.includes('/b')) {
                    moves.push([row - 1, col + 1]);
                }
            }
        } else { // Black Pawn
            if (row + 1 < 8 && !gameBoard[row + 1][col].querySelector(".piece")) {
                moves.push([row + 1, col]);
                if (row === 1 && !gameBoard[row + 2][col].querySelector(".piece")) {
                    moves.push([row + 2, col]);
                }
            }
            // Capturing diagonally
            if (row + 1 < 8 && col - 1 >= 0 && gameBoard[row + 1][col - 1].querySelector(".piece")) {
                const targetPiece = gameBoard[row + 1][col - 1].querySelector(".piece");
                if (targetPiece.src.includes('/w')) {
                    moves.push([row + 1, col - 1]);
                }
            }
            if (row + 1 < 8 && col + 1 < 8 && gameBoard[row + 1][col + 1].querySelector(".piece")) {
                const targetPiece = gameBoard[row + 1][col + 1].querySelector(".piece");
                if (targetPiece.src.includes('/w')) {
                    moves.push([row + 1, col + 1]);
                }
            }
        }
    }
    // Implement similar logic for other pieces (rook, knight, bishop, queen, king)
    return moves;
}







// Start the game
setupBoard();
playerTurnElement.textContent = `Current Player: ${currentPlayer}`;
