
let grid;
const squares = [];
window.FPS = 7;

const EntityEnum = {
  PAC_DOT: 0,
  WALL: 1,
  GHOST_LAIR: 2,
  POWER_PELLET: 3,
  EMPTY: 4,
};

function createBoard (layout) {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
    squares.push(square);
  }
}

function setClassIfDifferent(el, value) {
  if (el.classList !== value) {
    el.classList = value;
  }
}

function renderEntity(entity, i) {
  squares[i].textContent = i;
  squares[i].style =
    "font-size: 6px; display: flex; justify-content: center; align-items: center;";

  switch (entity) {
    case EntityEnum.WALL:
      setClassIfDifferent(squares[i], "wall");
      break;
    case EntityEnum.GHOST_LAIR:
      setClassIfDifferent(squares[i], "ghost-lair");
      break;
    case EntityEnum.POWER_PELLET:
      setClassIfDifferent(squares[i], "power-pellet");
      break;
    case EntityEnum.PAC_DOT:
      setClassIfDifferent(squares[i], "pac-dot");
      break;
    case EntityEnum.EMPTY:
      squares[i].classList = "";
      break;
  }
}

function drawBoard(layout, pacmanCurrentIndex, ghosts) {
  for (let i = 0; i < layout.length; i++) {
    renderEntity(layout[i], i);
  }
  setClassIfDifferent(squares[pacmanCurrentIndex], "pac-man");

  ghosts?.forEach((ghost) => {
    setClassIfDifferent(squares[ghost.currentIndex], ghost.className);
  });
}

function run(steps) {
  if (!steps) {
    return;
  }
  grid = document.querySelector(".grid-pacman");
  const initialState = steps.pop();

  createBoard(initialState.layout);
  drawBoard(
    initialState.layout,
    initialState.pacmanCurrentIndex,
    initialState.ghosts
  );

  let timer = null;
  let newState = null;
  function go() {

    newState = steps.pop();
    if (newState.gameOver) {
      if (timer) {
        clearInterval(timer);
      }
      document.getElementById("score").innerHTML = newState.score + ", " + newState.gameOverStatus;
      return;
    }

    drawBoard(newState.layout, newState.pacmanCurrentIndex, newState.ghosts);
  }

  timer = setInterval(go, 1000 / window.FPS || 7);
}

export default run;