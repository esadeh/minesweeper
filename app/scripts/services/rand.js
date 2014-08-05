'use strict';

(function () {

  /* @ngInject */
  function Rand() {
    this.getRand = function (maxNum) {
      return Math.floor((Math.random() * maxNum));
    };
  }

  angular
    .module('minesWeeperAppInternal')
    .service('rand', Rand);

})();
