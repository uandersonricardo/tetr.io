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
}

export { blocks, Block };