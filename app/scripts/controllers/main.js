'use strict';

(function () {

  /* @ngInject */
  function MainController($scope, Board) {
    $scope.$emit('we are using controllerAes syntax, scope is used only for events and watches');

    this.startGame = function (){
      this.rows = this.rows || 10;
      this.cols = this.cols || 10;
      this.mines = this.mines || 10;
      this.board = new Board(this.rows, this.cols, this.mines);

  }

  }

  angular
    .module('minesWeeperAppInternal')
    .controller('MainController', MainController);

})();
