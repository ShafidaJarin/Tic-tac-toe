const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Create cells
function createBoard() {
  boardEl.innerHTML = "";
  board.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", handleCellClick);
    boardEl.appendChild(cell);
  });
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusEl.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusEl.textContent = "It's a draw! 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    );
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusEl.textContent = "Player X's turn";
  createBoard();
}

// Initialize game
createBoard();
