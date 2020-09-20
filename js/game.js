import { blocks, Block } from "./blocks.js";
import { Grid } from './grid.js';
import { config } from "./config.js";

// Variáveis globais
let grid = new Grid(10, 16);
let currentFrame = 0;
let currentBlock = null;
let player = {
  name: "",
  score: 0
};

// Funções
function startGame(name) {
  player.name = name;
  setup();
  document.addEventListener("keydown", control);
  setInterval(draw, 1000 / config.FPS);
}

function setup() {
  grid.draw();

  const keysBlocks = Object.keys(blocks);
  const randomBlock = blocks[keysBlocks[parseInt(Math.random() * keysBlocks.length)]];
  currentBlock = new Block(randomBlock);
}

function draw() {
  if (currentFrame === 0) {
    grid.update();
    currentBlock.moveDown();
    grid.insert(currentBlock);
  }

  currentFrame = (currentFrame + 1) % config.FPS;
}

function control(e) {
  switch(e.keyCode) {
    case 37:
      grid.update();
      currentBlock.moveLeft();
      grid.insert(currentBlock);
      break;
    case 38:
      grid.update();
      currentBlock.rotate();
      grid.insert(currentBlock);
      break;
    case 39:
      grid.update();
      currentBlock.moveRight();
      grid.insert(currentBlock);
      break;
    case 40:
      grid.update();
      currentBlock.moveDown();
      grid.insert(currentBlock);
      break;
  }
}

export { startGame };