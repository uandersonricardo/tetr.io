class GridNext {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.dom = document.querySelector(".next");
      this.matrix = Array(height).fill(Array(width).fill(0));
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
      for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
          if (this.matrix[row][col] === 1) {
            this.dom.children[row * this.width + col].classList.add("block");
          } else {
            this.dom.children[row * this.width + col].classList.remove("block");
          }
        }
      }
    }
  
    insert(block) {
      for (let i = 0; i < block.height; i++) {
        for (let j = 0; j < block.width; j++) {
          if (block.tetromino[i][j]) {
            const row = i;
            const col = j;
            
            if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
              this.dom.children[row * this.width + col].classList.add("block");
            }
          }
        }
      }
    }
  }
  
  export { GridNext };