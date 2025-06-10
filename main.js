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
    if (cell === 'X' || cell === 'O') {
      const img = document.createElement('img');
      img.src = `img/${cell}.png`;
      img.alt = cell;
      img.style.width = '60%';
      img.style.height = '60%';
      cellDiv.appendChild(img);
    }
    cellDiv.onclick = () => {
      if (xIsNext && !cell && !gameOver) handleClick(idx);
    };
    boardElement.appendChild(cellDiv);
  });
}

function handleClick(idx) {
  if (board[idx] || gameOver || !xIsNext) return;
  board[idx] = 'X';
  xIsNext = false;
  renderBoard();
  const winner = calculateWinner(board);
  if (winner) {
    statusElement.textContent = `Vitória de: ${winner} 🎉`;
    gameOver = true;
    return;
  } else if (board.every(cell => cell)) {
    statusElement.textContent = 'Empate! 😍';
    gameOver = true;
    return;
  } else {
    statusElement.textContent = `Vez de: O`;
    // O joga automaticamente após pequena pausa
    setTimeout(botMove, 500);
  }
}

function botMove() {
  if (gameOver) return;
  // Encontra todas as casas vazias
  const emptyCells = board.map((cell, idx) => cell ? null : idx).filter(idx => idx !== null);
  if (emptyCells.length === 0) return;
  // Escolhe uma posição aleatória
  const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[move] = 'O';
  xIsNext = true;
  renderBoard();
  const winner = calculateWinner(board);
  if (winner) {
    statusElement.textContent = `Vitória de: ${winner} 🎉`;
    gameOver = true;
  } else if (board.every(cell => cell)) {
    statusElement.textContent = 'Empate! 😍';
    gameOver = true;
  } else {
    statusElement.textContent = `Vez de: X`;
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