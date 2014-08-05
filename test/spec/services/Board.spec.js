'use strict';

describe('Service: Board', function () {
  var randomNumbersArr = [0, 10, 15, 19, 3, 17];
  // load the service's module
  beforeEach(function () {
    module('minesWeeperAppInternal');
    var getRandMock = (function () {
      var i = 0;
      return function () {
        var nextNum = i < randomNumbersArr.length ? randomNumbersArr[i] :  -1;
        i++;
        return nextNum;
      };
    })();

    var randMock = {getRand: getRandMock};
    //add your mocks here
    module({
      rand: randMock
    });
  });

  // instantiate service
  var Board;
  beforeEach(inject(function (_Board_) {
    Board = _Board_;
  }));

  it('should build a board', function () {
    expect((new Board()).constructor.name.toString()).toBe('Board');
  });

  it('should build a board with cols and rows', function () {
    var board = new Board(4, 5);
    expect(board.rows).toBe(4);
    expect(board.cols).toBe(5);
  });

  it('should build a board with mines', function () {
    var board = new Board(4, 5, 6);
    expect(board.mines).toBe(6);
  });

  it('should build a board with array ', function () {
    var board = new Board(4, 5, 6);
    expect(board.board.length).toBe(4);
  });

  it('should build a board with array of arrays', function () {
    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    for (var i = 0; i < rows; i++) {
      expect(game.board[i].length).toBe(cols);
    }
  });

  it('should build board with six mines ', function () {
    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    var mines = 0;
    randomNumbersArr = [0, 10, 15, 19, 3, 17];
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        if (game.isMine(i, j)) {
          mines++;
        }
      }
    }
    expect(mines).toBe(6);
  });

  it('should build board with six numbers when given numbers are not unique ', function () {
    var rows = 4;
    var cols = 5;
    randomNumbersArr = [0, 10, 15, 19, 3, 19, 19, 3, 19, 3, 19, 3, 3, 17];
    var game = new Board(rows, cols, 6);
    var mines = 0;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        if (game.isMine(i, j)) {
          mines++;
        }
      }
    }
    expect(mines).toBe(6);
  });

  it('should fill cells according to the mines around them ', function () {
    randomNumbersArr = [0, 5, 7, 14, 3, 12];

    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    expect(game.cellAt(0, 1)).toBe(3);
    expect(game.cellAt(0, 2)).toBe(2);
    expect(game.cellAt(0, 4)).toBe(1);

    expect(game.cellAt(1, 1)).toBe(4);
    expect(game.cellAt(1, 3)).toBe(4);
    expect(game.cellAt(1, 4)).toBe(2);

    expect(game.cellAt(2, 0)).toBe(1);
    expect(game.cellAt(2, 1)).toBe(3);
    expect(game.cellAt(2, 3)).toBe(3);

    expect(game.cellAt(3, 0)).toBe(0);
    expect(game.cellAt(3, 1)).toBe(1);
    expect(game.cellAt(3, 2)).toBe(1);
    expect(game.cellAt(3, 3)).toBe(2);
    expect(game.cellAt(3, 4)).toBe(1);
  });

  it('cell should keep state revealed after called reveal ', function () {
    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    game.reveal(3, 3);
    expect(game.isRevealed(3, 3)).toBe(true);
  });

  it('cell should toogle flagged after called with flag ', function () {
    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    game.toggleFlag(3, 3);
    expect(game.isFlagged(3, 3)).toBe(true);
    game.toggleFlag(3, 3);
    expect(game.isFlagged(3, 3)).toBe(false);
  });

  it('should initialized with state "play"', function () {
    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    expect(game.state).toBe('play');
  });

  it('should change game state to lose when revealing a mine', function () {
    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    game.reveal(0, 0);
    expect(game.state).toBe('lose');
  });

  it('should not reveal a flagged cell', function () {
    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    game.toggleFlag(0, 0);
    game.reveal(0, 0);
    expect(game.isRevealed(0, 0)).toBe(false);
    expect(game.state).toBe('play');
  });

  it('should change game state to win after revealing all numbers', function () {
    randomNumbersArr = [0, 5, 7, 14, 3, 12];

    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    game.reveal(0, 1);
    game.reveal(0, 2);
    game.reveal(0, 4);
    expect(game.state).toBe('play');

    game.reveal(1, 1);
    game.reveal(1, 3);
    game.reveal(1, 4);
    expect(game.state).toBe('play');

    game.reveal(2, 0);
    game.reveal(2, 1);
    game.reveal(2, 3);
    expect(game.state).toBe('play');

    game.reveal(3, 0);
    game.reveal(3, 1);
    game.reveal(3, 2);
    game.reveal(3, 3);
    game.reveal(3, 4);
    expect(game.state).toBe('win');
  });

  it('should not change game state to win after lose already even after revealing all numbers', function () {
    randomNumbersArr = [0, 5, 7, 14, 3, 12];

    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    game.reveal(0, 1);
    game.reveal(0, 2);
    game.reveal(0, 4);
    expect(game.state).toBe('play');

    game.reveal(1, 1);
    game.reveal(1, 3);
    game.reveal(1, 4);
    expect(game.state).toBe('play');

    game.reveal(1, 2);
    expect(game.state).toBe('lose');

    game.reveal(2, 0);
    game.reveal(2, 1);
    game.reveal(2, 3);
    expect(game.state).toBe('lose');

    game.reveal(3, 0);
    game.reveal(3, 1);
    game.reveal(3, 2);
    game.reveal(3, 3);
    game.reveal(3, 4);
    expect(game.state).toBe('lose');
  });

  it('should not flag a revealed cell', function () {
    randomNumbersArr = [0, 5, 7, 14, 3, 12];

    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    game.reveal(0, 1);
    game.toggleFlag(0, 1);
    expect(game.isFlagged(0, 1)).toBe(false);
  });

  it('should reveal neighbours with content 0 when revealing cell contains 0', function () {
    randomNumbersArr = [0, 1, 2, 3, 4, 5];

    var rows = 4;
    var cols = 5;
    var game = new Board(rows, cols, 6);
    game.reveal(2, 2);

    expect(game.isRevealed(2, 2)).toBe(true);
    expect(game.isRevealed(2, 3)).toBe(true);
    expect(game.isRevealed(2, 4)).toBe(true);

    expect(game.isRevealed(3, 0)).toBe(true);
    expect(game.isRevealed(3, 1)).toBe(true);
    expect(game.isRevealed(3, 2)).toBe(true);
    expect(game.isRevealed(3, 3)).toBe(true);
    expect(game.isRevealed(3, 4)).toBe(true);

    expect(game.isRevealed(1, 1)).toBe(false);
    expect(game.isRevealed(1, 2)).toBe(false);
    expect(game.isRevealed(1, 3)).toBe(false);
    expect(game.isRevealed(1, 4)).toBe(false);

    expect(game.isRevealed(2, 0)).toBe(false);
    expect(game.isRevealed(2, 1)).toBe(false);
  });

});
