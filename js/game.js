import { blocks, Block, NextBlock } from "./blocks.js";
import { Grid } from './grid.js';
import { GridNext } from './gridNext.js';
import { config } from "./config.js";

const states = {
  LOADING: null,
  NOTHING: 0,
  SCORE: 1,
  GAMEOVER: 2
};

window.grid = null;
window.gridNextBlock = null;
window.currentFrame = 0;
window.currentBlock = null;
window.currentState = null;
window.nextBlock = null;
window.timer = null;
window.speed = 1;
window.player = {
  name: "",
  score: 0
};

window.setSpeed = (sp) => {
  speed = Math.min(sp, config.FPS);
};

window.step = step;

function startGame(name) {
  grid = new Grid(10, 16);
  gridNextBlock = new GridNext(4, 4);
  player.name = name;
  player.score = 0;
  setup();
  const sound = document.getElementById("sound");
  sound.currentTime = 0;
  sound.volume = document.querySelector(".range").value / 100;
  sound.play();
  document.addEventListener("keydown", control);
  document.addEventListener("score", score);
  document.querySelector(".range").addEventListener("change", volume);
  timer = setInterval(draw, 1000 / config.FPS);
}

function setup() {
  grid.draw();
  gridNextBlock.draw();
  document.querySelector(".next-score-text").innerHTML = "Placar: " + player.score;

  const keysBlocks = Object.keys(blocks);
  const randomFirstBlock = blocks[keysBlocks[parseInt(Math.random() * keysBlocks.length)]];
  const randomNextBlock = blocks[keysBlocks[parseInt(Math.random() * keysBlocks.length)]];

  currentBlock = new Block(randomFirstBlock);
  nextBlock = new Block(randomNextBlock);
}

function draw() {
  if (speed !== 0) {
    if (currentFrame === 0) {
      step();
    }
  
    currentFrame = (currentFrame + 1) % (config.FPS / speed);
  }
}

function step() {
  currentState = states.LOADING;
  
  grid.update();

  currentBlock.moveDown();
  if(grid.hasCollision(currentBlock) || currentBlock.y >= config.gridHeight - currentBlock.height) {
    if (grid.hasCollision(currentBlock)) {
      if (currentBlock.y <= 0) {
        gameOver();
        return;
      }

      currentBlock.moveUp();
    }
    
    fillMatrix();
    grid.verify();

    gridNextBlock.update();
    gridNextBlock.insert(new NextBlock(nextBlock.tetromino));
    grid.insert(currentBlock);

    currentBlock = nextBlock;

    const keysBlocks = Object.keys(blocks);
    const randomNextBlock = blocks[keysBlocks[parseInt(Math.random() * keysBlocks.length)]];
    nextBlock = new Block(randomNextBlock);
  }
  
  gridNextBlock.update();
  gridNextBlock.insert(new NextBlock(nextBlock.tetromino));
  grid.insert(currentBlock);

  if (currentState === states.LOADING) {
    currentState = states.NOTHING;
  }
}

function control(e) {
  switch(e.keyCode) {
    case 37:
      grid.update();
      currentBlock.moveLeft();
      
      if(grid.hasCollision(currentBlock)) {
        currentBlock.moveRight();
      }

      grid.insert(currentBlock);
      break;
    case 38:
      grid.update();
      currentBlock.rotate();

      if(grid.hasCollision(currentBlock) || currentBlock.x < 0 || currentBlock.x + currentBlock.width > grid.width) {
        currentBlock.derotate();
      }

      grid.insert(currentBlock);
      break;
    case 39:
      grid.update();
      currentBlock.moveRight();

      if(grid.hasCollision(currentBlock)) {
        currentBlock.moveLeft();
      }

      grid.insert(currentBlock);
      break;
    case 40:
      grid.update();
      currentBlock.moveDown();

      if(grid.hasCollision(currentBlock)) {
        if (currentBlock.y <= 0) {
          gameOver();
          return;
        }
        
        currentBlock.moveUp();
      }

      grid.insert(currentBlock);
      break;
  }
}

function fillMatrix() {
  for (let i = 0; i < currentBlock.height; i++) {
    for (let j = 0; j < currentBlock.width; j++) {
      if (currentBlock.tetromino[i][j]) {
        const row = currentBlock.y + i;
        const col = currentBlock.x + j;

        grid.matrix[row][col] = 1;
      }
    }
  }
}

function score() {
  currentState = states.SCORE;
  player.score += 10;
  document.querySelector(".next-score-text").innerHTML = "Placar: " + player.score;
}

function gameOver() {
  currentState = states.GAMEOVER;
  document.removeEventListener("keydown", control);
  document.removeEventListener("score", score);
  clearInterval(timer);
  const sound = document.getElementById("sound");
  sound.pause();
  updateRanking();
  document.querySelector(".score-text").innerHTML = "Você fez " + player.score + " pontos!";
  document.querySelector(".game").classList.add("d-none");
  document.querySelector(".score").classList.remove("d-none");
}

function updateRanking() {
  const ranking = localStorage.getItem('ranking') && localStorage.getItem('ranking').length > 0 ? JSON.parse(localStorage.getItem('ranking')) : [];
  ranking.push(player);
  ranking.sort((a, b) => { return b.score - a.score });
  const newRanking = ranking.slice(0, 5);
  localStorage.setItem('ranking', JSON.stringify(newRanking));

  document.querySelectorAll(".score-table td").forEach((item, index) => {
    const row = parseInt(index / 3);
    const col = index % 3;

    if (col === 1) {
      item.innerHTML = newRanking[row] === undefined ? "-" : newRanking[row].name;
    } else if (col == 2) {
      item.innerHTML = newRanking[row] === undefined ? "-" : newRanking[row].score;
    }
  });
}

function volume(e) {
  e.target.style.background = "linear-gradient(to right, white 0%, white " + e.target.value + "%, #ffffff2f " + e.target.value + "%, #ffffff7f 100%)";
  const sound = document.getElementById("sound");
  sound.volume = e.target.value / 100;
}

export { startGame };