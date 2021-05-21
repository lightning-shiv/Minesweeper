let tile;
let flag;
let mine;
var grid;
var cols;
var rows;
var w = 40;
var boardWidth = 600;
var boardHeight = 600;
var hintsRemaining = 5;

function setup() {
  createCanvas(1000, 1000);
  tile = loadImage("/images/tile.png");
  flag = loadImage("/images/flag.png");
  mine = loadImage("/images/mine.png");
  one = loadImage("/images/1.png");
  two = loadImage("/images/2.png");
  three = loadImage("/images/3.png");
  four = loadImage("/images/4.png");
  five = loadImage("/images/5.png");
  six = loadImage("/images/6.png");
  seven = loadImage("/images/7.png");
  eight = loadImage("/images/8.png");
  cols = floor(boardWidth / w);
  rows = floor(boardHeight / w);
  grid = makeGrid(40, 40);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Tile(i, j, w);
    }
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countMines();
    }
  }
}

function draw() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

function makeGrid(rows, cols) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function mousePressed() {
  if (mouseButton == LEFT) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].flagged) {
          grid[i][j].click();
          if (grid[i][j].hasMine()) {
            revealAll();
          } else if (grid[i][j].numAdjacentMines == 0) {
            floodFill(i, j);
          }
        }
      }
    }
  }
}

function keyPressed() {
  if (keyCode == RETURN) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          if (grid[i][j].flagged) {
            grid[i][j].unflag();
          } else {
            grid[i][j].flag();
          }
        }
      }
    }
  }
}

function revealAll() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].click();
    }
  }
}

function floodFill(row, col) {
  for (var xOffset = -1; xOffset <= 1; xOffset++) {
    for (var yOffset = -1; yOffset <= 1; yOffset++) {
      var x = row + yOffset;
      var y = col + xOffset;
      if (x > -1 && x < cols && y > -1 && y < rows) {
        if (!grid[x][y].isRevealed()) {
          grid[x][y].click();
          if (grid[x][y].numAdjacentMines == 0) {
            floodFill(x, y);
          }
        }
      }
    }
  }
}
