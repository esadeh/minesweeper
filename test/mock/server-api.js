'use strict';

angular.module('minesWeeperAppMocks', ['ngMockE2E'])
  .run(function ($httpBackend) {
    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
  });
