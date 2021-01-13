function Tile(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.revealed = false;
  this.numAdjacentMines = 0;
  this.flagged = false;
  if (random(1) < 0.18) {
    this.mine = true;
  } else {
    this.mine = false;
  }
}

// Draws the cell and if conditions met, whether it has a mine or not.
Tile.prototype.show = function () {
  image(tile, this.x, this.y);
  if (this.revealed) {
    if (this.mine) {
      if (this.flagged) {
        fill(0, 255, 0);
        rect(this.x, this.y, this.w, this.w);
        noFill();
      } else {
        fill(255, 0, 0);
        rect(this.x, this.y, this.w, this.w);
        noFill();
      }
      image(mine, this.x, this.y);

    } else {
      fill(169, 169, 169);
      rect(this.x, this.y, this.w, this.w);
      noFill();
      if (this.numAdjacentMines == 1) {
        image(one, this.x + 3, this.y + 3);
      }
      if (this.numAdjacentMines == 2) {
        image(two, this.x + 3, this.y + 3);
      }
      if (this.numAdjacentMines == 3) {
        image(three, this.x + 3, this.y + 3);
      }
      if (this.numAdjacentMines == 4) {
        image(four, this.x + 3, this.y + 3);
      }
      if (this.numAdjacentMines == 5) {
        image(five, this.x + 3, this.y + 3);
      }
      if (this.numAdjacentMines == 6) {
        image(six, this.x + 3, this.y + 3);
      }
      if (this.numAdjacentMines == 7) {
        image(seven, this.x + 3, this.y + 3);
      }
      if (this.numAdjacentMines == 8) {
        image(eight, this.x + 3, this.y + 3);
      }
    }
  } else if (this.flagged) {
    image(flag, this.x + 10, this.y + 10);
  }
}

// Sets boolean revealed to true.
Tile.prototype.click = function () {
  this.revealed = true;
}

Tile.prototype.flag = function () {
  this.flagged = true;
}

Tile.prototype.unflag = function () {
  this.flagged = false;
}

Tile.prototype.countMines = function () {
  if (!this.mine) {
    for (var xOffset = -1; xOffset <= 1; xOffset++) {
      for (var yOffset = -1; yOffset <= 1; yOffset++) {
        var i = this.i + xOffset;
        var j = this.j + yOffset;
        if (i > -1 && i < cols && j > -1 && j < rows) {
          if (grid[i][j].hasMine()) {
            this.numAdjacentMines++;
          }
        }
      }
    }
  }
}

Tile.prototype.isRevealed = function () {
  return this.revealed;
}
Tile.prototype.hasMine = function () {
  return this.mine;
}

Tile.prototype.returnX = function () {
  return this.x;
}

Tile.prototype.returnY = function () {
  return this.y;
}

Tile.prototype.returnAdjMines = function () {
  return this.numAdjacentMines;
}

// Returns true if (x, y) are inside the edges of the cell.
Tile.prototype.contains = function (x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}
