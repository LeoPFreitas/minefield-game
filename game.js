// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Minesweeper
// Video: https://youtu.be/LFU5ZlrR21E

function matriz(colunas, linhas) {
  var arr = new Array(colunas);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(linhas);
  }
  return arr;
}

var grid;
var colunas;
var linhas;
var w = 20;

var bombs = 30;

function setup() {
  createCanvas(401, 401);
  colunas = floor(width / w);
  linhas = floor(height / w);
  grid = matriz(colunas, linhas);
  for (var i = 0; i < colunas; i++) {
    for (var j = 0; j < linhas; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // Pick bombs spots
  var options = [];
  for (var i = 0; i < colunas; i++) {
    for (var j = 0; j < linhas; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < bombs; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].bomb = true;
  }

  for (var i = 0; i < colunas; i++) {
    for (var j = 0; j < linhas; j++) {
      grid[i][j].countBombs();
    }
  }
}

function gameOver() {
  for (var i = 0; i < colunas; i++) {
    for (var j = 0; j < linhas; j++) {
      grid[i][j].open = true;
    }
  }
}

function mousePressed() {
  for (var i = 0; i < colunas; i++) {
    for (var j = 0; j < linhas; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();

        if (grid[i][j].bomb) {
          gameOver();
        }
      }
    }
  }
}

function draw() {
  background(255);
  for (var i = 0; i < colunas; i++) {
    for (var j = 0; j < linhas; j++) {
      grid[i][j].show();
    }
  }
}
