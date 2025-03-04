// script.js
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const winMessage = document.getElementById('win-message');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6]  // Diagonal
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (currentPlayer === 'X') {
    clickedCell.style.color = '#ff4d4d'; // Red color for X
  } else {
    clickedCell.style.color = '#4d79ff'; // Blue color for O
  }

  checkForWinner();
}

function checkForWinner() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
      continue;
    }
    if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      announceWinner(currentPlayer);
      highlightWinningCells(winningConditions[i]);
      gameActive = false;
      return;
    }
  }

  // If no one wins, declare X as the winner
  if (!roundWon && !gameState.includes('')) {
    announceWinner('X'); // Force X as the winner
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    announceDraw();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function announceWinner(winner) {
  winMessage.textContent = `Player ${winner} wins!`;
  winMessage.style.display = 'block'; // Show winning message
  alert(`Player ${winner} wins!`); // Show alert
  setTimeout(resetGame, 2000); // Reset game after 2 seconds
}

function announceDraw() {
  winMessage.textContent = 'It\'s a draw!';
  winMessage.style.display = 'block'; // Show draw message
  alert('It\'s a draw!'); // Show alert
  setTimeout(resetGame, 2000); // Reset game after 2 seconds
}

function highlightWinningCells(winningCombo) {
  winningCombo.forEach(index => {
    cells[index].classList.add('winning-cell'); // Add winning effect
  });
}

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  winMessage.style.display = 'none'; // Hide winning message
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = ''; // Reset color
    cell.classList.remove('winning-cell'); // Remove winning effect
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);