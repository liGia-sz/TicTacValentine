const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
let board = Array(9).fill(null);
let xIsNext = true;
let gameOver = false;

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, idx) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    cellDiv.textContent = cell ? cell : '';
    cellDiv.onclick = () => handleClick(idx);
    boardElement.appendChild(cellDiv);
  });
}

function handleClick(idx) {
  if (board[idx] || gameOver) return;
  board[idx] = xIsNext ? 'X' : 'O';
  xIsNext = !xIsNext;
  renderBoard();
  const winner = calculateWinner(board);
  if (winner) {
    statusElement.textContent = `Vitória de: ${winner} 🎉`;
    gameOver = true;
  } else if (board.every(cell => cell)) {
    statusElement.textContent = 'Empate! 😍';
    gameOver = true;
  } else {
    statusElement.textContent = `Vez de: ${xIsNext ? 'X' : 'O'}`;
  }
}

function calculateWinner(b) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let line of lines) {
    const [a, b1, c] = line;
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
      return b[a];
    }
  }
  return null;
}

function restartGame() {
  board = Array(9).fill(null);
  xIsNext = true;
  gameOver = false;
  statusElement.textContent = 'Vez de: X';
  renderBoard();
}

renderBoard();