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

function showFinalMessage(message, gifSrc = null, premio = null) {
  let html = `<div class="final-message" style="display:flex; flex-direction:column; align-items:center;">`;
  html += `<div style="margin-bottom:16px;">${message}</div>`;
  if (gifSrc) {
    html += `<div style="text-align:center;"><img src="${gifSrc}" alt="gif vitória" style="max-width:220px; border-radius:12px; margin:20px 0;"></div>`;
  }
  if (premio) {
    html += `<div class="premio" style="color:#a81d4d; font-size:1.2rem; margin-top:8px;">${premio}</div>`;
  }
  boardElement.innerHTML = html;
}

function handleClick(idx) {
  if (board[idx] || gameOver || !xIsNext) return;
  board[idx] = 'X';
  xIsNext = false;
  renderBoard();
  const winner = calculateWinner(board);
  if (winner) {
    if (winner === 'X') {
      showFinalMessage(
        'Você ganhou! 🎉',
        'img/Final.gif',
        'Prêmio: Jantar + escolha de filmes/séries sem questionamentos + massagem 💖'
      );
    } else {
      showFinalMessage(
        'Você perdeu! 😢',
        'img/Final.gif',
        'Prêmio: Caixinha de doces 🍬'
      );
    }
    statusElement.textContent = `Vitória de: ${winner} 🎉`;
    gameOver = true;
    return;
  } else if (board.every(cell => cell)) {
    showFinalMessage(
      'Empate! 😍',
      'img/Final.gif',
      'Prêmio: Date de Massinha 💆‍♀️💆'
    );
    statusElement.textContent = 'Empate! 😍';
    gameOver = true;
    return;
  } else {
    statusElement.textContent = `Vez de: O`;
    setTimeout(botMove, 500);
  }
}

function botMove() {
  if (gameOver) return;
  const emptyCells = board.map((cell, idx) => cell ? null : idx).filter(idx => idx !== null);
  if (emptyCells.length === 0) return;
  const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[move] = 'O';
  xIsNext = true;
  renderBoard();
  const winner = calculateWinner(board);
  if (winner) {
    if (winner === 'X') {
      showFinalMessage(
        'Você ganhou! 🎉',
        'img/Final.gif',
        'Prêmio: Jantar + escolha de filmes/séries sem questionamentos + massagem 💖'
      );
    } else {
      showFinalMessage(
        'Você perdeu! 😢',
        'img/Final.gif',
        'Prêmio: Caixinha de doces 🍬'
      );
    }
    statusElement.textContent = `Vitória de: ${winner} 🎉`;
    gameOver = true;
  } else if (board.every(cell => cell)) {
    showFinalMessage(
      'Empate! 😍',
      'img/Final.gif',
      'Prêmio: Date de Massinha 💆‍♀️💆'
    );
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