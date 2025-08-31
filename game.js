const size = 4;
let grid;

function init() {
  grid = Array.from({ length: size }, () => Array(size).fill(0));
  addRandomTile();
  addRandomTile();
  draw();
  document.addEventListener('keydown', handleKey);
  document.getElementById('hintBtn').addEventListener('click', () => {
    showRewardedAd('hint');
    alert('Try moving left!');
  });
  document.getElementById('unlockBtn').addEventListener('click', () => {
    showRewardedAd('unlock');
    alert('New feature unlocked!');
  });
  document.getElementById('saveBtn').addEventListener('click', () => {
    localStorage.setItem('grid', JSON.stringify(grid));
    showInterstitialAd('savePoint');
    alert('Game saved');
  });
}

function addRandomTile() {
  const empty = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 0) empty.push({ r, c });
    }
  }
  if (empty.length === 0) return;
  const { r, c } = empty[Math.floor(Math.random() * empty.length)];
  grid[r][c] = Math.random() < 0.9 ? 2 : 4;
}

function draw() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.textContent = grid[r][c] === 0 ? '' : grid[r][c];
      board.appendChild(tile);
    }
  }
}

function handleKey(e) {
  const keyMap = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down'
  };
  const direction = keyMap[e.key];
  if (direction) {
    move(direction);
    addRandomTile();
    draw();
    if (isGameOver()) {
      showInterstitialAd('stageEnd');
      alert('Game Over');
      document.removeEventListener('keydown', handleKey);
    }
  }
}

function move(direction) {
  for (let i = 0; i < size; i++) {
    let line;
    if (direction === 'left') line = grid[i];
    if (direction === 'right') line = grid[i].slice().reverse();
    if (direction === 'up') line = grid.map(row => row[i]);
    if (direction === 'down') line = grid.map(row => row[i]).reverse();
    line = compress(line);
    if (direction === 'left') grid[i] = line;
    if (direction === 'right') grid[i] = line.reverse();
    if (direction === 'up') for (let r = 0; r < size; r++) grid[r][i] = line[r];
    if (direction === 'down') for (let r = 0; r < size; r++) grid[r][i] = line[size - 1 - r];
  }
}

function compress(line) {
  const newLine = line.filter(v => v !== 0);
  for (let i = 0; i < newLine.length - 1; i++) {
    if (newLine[i] === newLine[i + 1]) {
      newLine[i] *= 2;
      newLine[i + 1] = 0;
    }
  }
  const result = newLine.filter(v => v !== 0);
  while (result.length < size) result.push(0);
  return result;
}

function isGameOver() {
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 0) return false;
      if (c < size - 1 && grid[r][c] === grid[r][c + 1]) return false;
      if (r < size - 1 && grid[r][c] === grid[r + 1][c]) return false;
    }
  }
  return true;
}

init();
