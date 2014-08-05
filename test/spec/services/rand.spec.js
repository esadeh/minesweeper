'use strict';

describe('Service: rand', function () {

  // load the service's module
  beforeEach(function () {
    module('minesWeeperAppInternal');

    //add your mocks here
  });

  // instantiate service
  var rand;
  beforeEach(inject(function (_rand_) {
    rand = _rand_;
  }));

  it('should do something', function () {
    for (var i = 0; i < 100; i++) {
      var random = rand.getRand(50);
      expect(random >= 0).toEqual(true);
      expect(random <= 50).toEqual(true);
    }
  });

});
