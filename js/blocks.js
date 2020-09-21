import { config } from './config.js';

const blocks = {
    I: [[1, 1, 1, 1]],
    O: [[1, 1], [1, 1]],
    T: [[0, 1, 0], [1, 1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]],
    J: [[1, 0, 0], [1, 1, 1]],
    L: [[0, 0, 1], [1, 1, 1]]
}

class NextBlock{
  constructor(tetromino) {
    this.tetromino = tetromino;
    this.x = parseInt((config.gridNextWidth - tetromino[0].length) / 2);
    this.y = -tetromino.length;
    this.width = tetromino[0].length;
    this.height = tetromino.length;
    this.rotation = 0;
  }
}

class Block {
  constructor(tetromino) {
    this.tetromino = tetromino;
    this.x = parseInt((config.gridWidth - tetromino[0].length) / 2);
    this.y = -tetromino.length;
    this.width = tetromino[0].length;
    this.height = tetromino.length;
    this.rotation = 0;
  }

  moveLeft() {
    this.x = Math.max(this.x - 1, 0);
  }

  moveRight() {
    this.x = Math.min(this.x + 1, config.gridWidth - this.width);
  }

  moveDown() {
    this.y = Math.min(this.y + 1, config.gridHeight - this.height);
  }

  moveUp() {
    this.y = Math.max(this.y - 1, 0);
  }

  rotate() {
    let theta = this.tetromino.reduce((omega, alpha) => omega.concat(alpha));
    let delta = [];

    for(let x = 0; x < this.tetromino[0].length; x++) {
      let i = x;
      delta[x] = [];
      while(i < theta.length) {     
        delta[x].push(theta[i]);
        i += this.tetromino[0].length;
      }
      delta[x].reverse();
    }

    this.tetromino = delta;
    this.width = this.tetromino[0].length;
    this.height = this.tetromino.length;
  }

  derotate() {
    for (let i = 0; i < 3; i++) {
      this.rotate();
    }
  }
}

export { blocks, Block, NextBlock };