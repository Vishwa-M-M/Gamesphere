const playerChoiceBtns = document.querySelectorAll('.choice');
const winnerDisplay = document.getElementById('winner');
const playerImage = document.getElementById('playerImage');
const computerImage = document.getElementById('computerImage');

const choices = ['rock', 'paper', 'scissors'];

playerChoiceBtns.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = getComputerChoice();
        const winner = getWinner(playerChoice, computerChoice);

        displayResult(playerChoice, computerChoice, winner);
    });
});

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'It\'s a tie!';
    }

    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

function displayResult(playerChoice, computerChoice, winner) {
    const apiUrl = 'https://your-image-api.com/images'; // Replace with your actual API URL

    // Fetch and set the player's image
    fetch(`${apiUrl}/${playerChoice}.jpg`) // Assuming API returns the image URL
        .then(response => response.json())
        .then(data => {
            playerImage.src = data.url;  // Set player image dynamically
        })
        .catch(error => {
            console.error('Error fetching player image:', error);
            playerImage.src = 'placeholder-player-image.jpg'; // Fallback image if the API fails
        });

    // Fetch and set the computer's image
    fetch(`${apiUrl}/${computerChoice}.jpg`)
        .then(response => response.json())
        .then(data => {
            computerImage.src = data.url;  // Set computer image dynamically
        })
        .catch(error => {
            console.error('Error fetching computer image:', error);
            computerImage.src = 'placeholder-computer-image.jpg'; // Fallback image if the API fails
        });

    // Display the winner
    winnerDisplay.textContent = `${winner} (Player chose ${playerChoice}, Computer chose ${computerChoice})`;
}
