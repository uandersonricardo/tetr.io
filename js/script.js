import { blocks, Block } from "./blocks.js";
import { Grid } from './grid.js';
import { config } from "./config.js";

// Variáveis globais
let grid = new Grid(10, 16);
let currentFrame = 0;
let currentBlock = null;

// Eventos
document.addEventListener("DOMContentLoaded", setup);
document.addEventListener("keydown", control);
setInterval(draw, 1000 / config.FPS);

// Funções
function setup() {
  grid.draw();

  const keysBlocks = Object.keys(blocks);
  const randomFirstBlock = blocks[keysBlocks[parseInt(Math.random() * keysBlocks.length)]];
  const randomNextBlock = blocks[keysBlocks[parseInt(Math.random() * keysBlocks.length)]];
  currentBlock = new Block(randomFirstBlock);
  nextBlock = new Block(randomNextBlock);
}

function draw() {
  if (currentFrame === 0) {
    grid.update();
    currentBlock.moveDown();
    grid.insert(currentBlock);
    currentBlock = nextBlock;

    const randomNextBlock = blocks[keysBlocks[parseInt(Math.random() * keysBlocks.length)]];
    nextBlock = new Block(randomNextBlock);
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
      // rotate
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