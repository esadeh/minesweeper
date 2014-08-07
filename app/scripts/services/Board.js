'use strict';

(function () {
  function Cell(num) {
    this.revealed = false;
    this.flagged = false;
    this.content = num;
  }

  Cell.prototype.toggleFlag = function () {
    if (this.revealed === false) {
      this.flagged = !this.flagged;
    }
  };

  Cell.prototype.isFlagged = function () {
    return this.flagged;
  };

  Cell.prototype.setContent = function (newContent) {
    this.content = newContent;
  };
  Cell.prototype.reveal = function () {
    if (this.flagged === false) {
      this.revealed = true;
    }
  };

  Cell.prototype.isRevealed = function () {
    return this.revealed;
  };

  Cell.prototype.isMine = function () {
    return this.content === -1;
  };

  Cell.prototype.setMine = function () {
    this.content = -1;
  };

  /* @ngInject */
  function BoardFactory(rand) {
    function Board(rows, cols, mines) {
      if (mines > rows * cols) {
        throw 'Too much mines';
      }
      this.rows = rows;
      this.cols = cols;
      this.mines = mines;
      this.board = [];
      this.state = 'play';
      this.unRevealed = (rows * cols) - mines;
      this.initBoard();
      this.putMines();
      this.fillCellsWithNumbers();
    }

    Board.prototype.initBoard = function () {
      for (var i = 0; i < this.rows; i++) {
        this.board.push([]);
        for (var j = 0; j < this.cols; j++) {
          this.board[i].push(new Cell(0));
        }
      }
    };

    Board.prototype.putMines = function () {
      var randomNumber, randomRow, randomCol;
      for (var i = 0; i < this.mines; i++) {
        do {
          randomNumber = rand.getRand(this.rows * this.cols - 1);
          randomRow = Math.floor(randomNumber / this.cols);
          randomCol = randomNumber % this.cols;
        } while (this.isMine(randomRow, randomCol) === true);
        this.setMine(randomRow, randomCol);
      }
    };

    Board.prototype.setMine = function (row, col) {
      this.board[row][col].setMine();
    };

    Board.prototype.isMine = function (row, col) {
      return this.board[row][col].isMine();
    };

    Board.prototype.cellAt = function (row, col) {
      return this.board[row][col].content;
    };

    Board.prototype.fillCellsWithNumbers = function () {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          if (this.isMine(i, j) === false) {
            this.board[i][j].setContent(this.countMines(i, j));
          }
        }
      }
    };

    Board.prototype.countMines = function (row, col) {
      var minesNeighbours = 0;
      var options = [-1, 0, 1];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (this.isValidAndMine(row + options[i], col + options[j])) {
            minesNeighbours++;
          }
        }
      }
      return minesNeighbours;
    };

    Board.prototype.isValidAndMine = function (row, col) {
      return this.isValidCell(row, col) && this.isMine(row, col);
    };

    Board.prototype.isValidCell = function (row, col) {
      return this.isValidRow(row) && this.isValidCol(col);
    };

    Board.prototype.isValidRow = function (row) {
      return row >= 0 && row < this.rows;
    };

    Board.prototype.isValidCol = function (col) {
      return col >= 0 && col < this.cols;
    };

    Board.prototype.setState = function (newState) {
      if (this.state === 'play') {
        this.state = newState;
        alert(newState);
      }
    };

    Board.prototype.revealAll = function () {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.reveal(i, j);
        }
      }
    };

    Board.prototype.reveal = function (row, col) {
      if (this.isRevealed(row, col) || this.isFlagged(row, col)) {
        return;
      }

      this.board[row][col].reveal();
      if (this.isMine(row, col)) {
        this.setState('lose');
        this.revealAll();
        return;
      }

      this.unRevealed--;
      if (this.unRevealed === 0) {
        this.setState('win');
      }
      if (this.cellAt(row, col) === 0) {
        var options = [-1, 0, 1];
        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 3; j++) {
            if (this.isValidCell(row + options[i], col + options[j])) {
              this.reveal(row + options[i], col + options[j]);
            }
          }
        }
      }
    };

    Board.prototype.isRevealed = function (row, col) {
      return this.board[row][col].isRevealed();
    };

    Board.prototype.toggleFlag = function (row, col) {
      if (this.state == 'play' && this.isRevealed(row, col) === false) {
        this.board[row][col].toggleFlag();
      }
    };

    Board.prototype.isFlagged = function (row, col) {
      return this.board[row][col].isFlagged();
    };

    return Board;
  }

  angular
  .module('minesWeeperAppInternal')
  .factory('Board', BoardFactory);

})();
