import { blocks, Block, NextBlock } from "./blocks.js";
import { Grid } from './grid.js';
import { GridNext } from './gridNext.js';
import { config } from "./config.js";

// Variáveis globais
let grid = new Grid(10, 16);
let gridNextBlock = new GridNext(4, 4);
let currentFrame = 0;
let currentBlock = null;
let nextBlock = null;
let player = {
  name: "",
  score: 0
};

// Funções
function startGame() {
  player.name = name;
  setup();
  document.addEventListener("keydown", control);
  setInterval(draw, 1000 / config.FPS);
}

function setup() {
  grid.draw();
  gridNextBlock.draw();

  const keysBlocks = Object.keys(blocks);
  const randomFirstBlock = blocks[keysBlocks[parseInt(Math.random() * keysBlocks.length)]];
  const randomNextBlock = blocks[keysBlocks[parseInt(Math.random() * keysBlocks.length)]];

  currentBlock = new Block(randomFirstBlock);
  nextBlock = new Block(randomNextBlock);
}

function draw() {
  if (currentFrame === 0) {
    grid.update();

    if(!willCollide()){
      currentBlock.moveDown();
    }
    else{
      console.log("New Block");
      fillMatrix();

      currentBlock = nextBlock;

      const keysBlocks = Object.keys(blocks);
      const randomNextBlock = blocks[keysBlocks[parseInt(Math.random() * keysBlocks.length)]];
      nextBlock = new Block(randomNextBlock);
    }
    
    gridNextBlock.update();
    gridNextBlock.insert(new NextBlock(nextBlock.tetromino));
    grid.insert(currentBlock);
  }

  currentFrame = (currentFrame + 1) % config.FPS;
}

function control(e) {

  switch(e.keyCode) {
    case 37:
      grid.update();
      currentBlock.moveLeft();
      
      if(grid.hasCollision(currentBlock)){
        currentBlock.moveRight();
      }

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

      if(grid.hasCollision(currentBlock)){
        currentBlock.moveLeft();
      }

      grid.insert(currentBlock);

      break;
    case 40:
      grid.update();
      currentBlock.moveDown();

      if(grid.hasCollision(currentBlock)){
        currentBlock.moveUp();
      }

      grid.insert(currentBlock);

      break;
  }

}

function willCollide(){
  let collision = false;
  
  let auxBlock = currentBlock;
  auxBlock.moveDown();

  if(grid.hasCollision(auxBlock) || currentBlock.y === config.gridHeight - currentBlock.height){
    collision = true;
  }

  return collision
}

function fillMatrix(){

  for (let i = 0; i < currentBlock.height; i++) {
    for (let j = 0; j < currentBlock.width; j++) {
      if (currentBlock.tetromino[i][j]) {
        console.log("Preenchendo: ", i, j)
        const row = currentBlock.y + i;
        const col = currentBlock.x + j;

        console.log(row, col, row * grid.width + col)
        grid.matrix[row][col] = 1;

      }
    }
  }

}

export { startGame };