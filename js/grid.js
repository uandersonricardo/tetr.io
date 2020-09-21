class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.dom = document.querySelector(".grid");
    this.matrix = new Array(height);
    this.scoreEvent = new Event("score");
    
    for (let row = 0; row < height; row++) {
      this.matrix[row] = new Array(width);
    }
  }
  
  draw() {
    this.dom.innerHTML = "";

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        const div = document.createElement("div");

        if (this.matrix[row][col] === 1) {
          div.classList.add("grid-item block");
        } else {
          div.classList.add("grid-item");
        }

        this.dom.appendChild(div);
      }
    }
  }

  update() {
    //console.log(this.matrix)

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.matrix[row][col] === 1) {
          this.dom.children[row * this.width + col].classList.add("block");
          this.dom.children[row * this.width + col].classList.remove("scored");
        } else {
          this.dom.children[row * this.width + col].classList.remove("block");
          this.dom.children[row * this.width + col].classList.remove("scored");
        }
      }
    }
  }

  insert(block) {
    for (let i = 0; i < block.height; i++) {
      for (let j = 0; j < block.width; j++) {
        if (block.tetromino[i][j]) {
          const row = block.y + i;
          const col = block.x + j;

          if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
            this.dom.children[row * this.width + col].classList.add("block");
          }
        }
      }
    }
  }

  hasCollision(block) {
    for (let i = 0; i < block.height; i++) {
      for (let j = 0; j < block.width; j++) {
        if (block.tetromino[i][j]) {
          const row = block.y + i;
          const col = block.x + j;

          if (row >= 0 && row < this.height && col >= 0 && col < this.width){
            if (this.dom.children[row * this.width + col].classList.contains("block")) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  verify() {
    for (let row = 0; row < this.height; row++) {
      if (!this.matrix[row].includes(undefined)) {
        this.matrix[row] = new Array(this.width);
        this.moveToFloor(row);

        for (let col = 0; col < this.width; col++) {
          this.dom.children[row * this.width + col].classList.add("scored");
        }

        document.dispatchEvent(this.scoreEvent);
      }
    }
  }

  moveToFloor(row) {
    for (let i = row; i > 0; i--) {
      this.matrix[i] = this.matrix[i - 1];
    }

    this.matrix[0] = new Array(this.width);
  }
}

export { Grid };