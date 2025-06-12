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
  document.getElementById('status').style.display = 'none';
  document.getElementById('board').style.display = 'flex';

  // Mostra apenas a mensagem final (sem título duplicado)
  let html = `<div class="final-message" style="display:flex; flex-direction:column; align-items:center; padding:60px 10vw;">`;
  // REMOVA ou comente a linha abaixo:
  // html += `<h1 style="color:#d72660; margin-bottom:24px; text-align:center; width:100%;">Jogo da Velha 💖</h1>`;
  html += `<div style="margin-bottom:16px;">${message}</div>`;
  if (gifSrc) {
    html += `<div style="text-align:center;"><img src="${gifSrc}" alt="gif vitória" style="max-width:220px; border-radius:12px; margin:20px 0;"></div>`;
  }
  if (premio) {
    html += `<div class="premio" style="color:#a81d4d; font-size:1.2rem; margin-top:8px;">${premio}</div>`;
  }
  html += `
    <div class="result-actions">
      <button class="restart-btn" id="restart-btn-final" onclick="restartGame()">Reiniciar</button>
      <div class="footer" id="footer-final">Feito com 💕 para o Dia dos Namorados</div>
    </div>
  `;
  html += `</div>`;
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
        'E o prêmio é o combo perfeito para nós dois: Um jantar romântico, filmes ou séries da sua escolha e uma massagem para aliviar qualquer cansaço. Te amo!💖'
      );
    } else {
      showFinalMessage(
        'Você perdeu! 😢',
        'img/Final.gif',
        'Meu amor, você não ganhou o jogo, mas ganhou meu coração e uma caixinha de doces deliciosa para compensar! Vamos adoçar essa "derrota" juntos? 🍬'
      );
    }
    gameOver = true;
    return;
  } else if (board.every(cell => cell)) {
    showFinalMessage(
      'Não ganhou, nem perdeu! 😍',
      'img/Final.gif',
      'Isso só significa que somos uma dupla imbatível, mesmo quando competimos. E para celebrar, nosso prêmio é um divertido date de massinha. Mal posso esperar para ver o que vamos criar!'
    );
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
    gameOver = true;
  } else if (board.every(cell => cell)) {
    showFinalMessage(
      'Empate! 😍',
      'img/Final.gif',
      'Prêmio: Date de Massinha 💆‍♀️💆'
    );
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
  document.getElementById('status').style.display = 'flex';
  document.getElementById('board').style.display = 'grid';
  renderBoard();
}

renderBoard();