angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
      $scope.listings.push({
        'code': $scope.buildingCode,
        'name': $scope.buildingName,
        'coordinates': {
          'latitude': $scope.buildingCoor.latitude,
          'longitude': $scope.buildingCoor.longitude,
        },
        'address': $scope.buildingAddr
      });

      $scope.buildingCode = undefined;
      $scope.buildingName = undefined;
      $scope.buildingCoor.latitude = undefined;
      $scope.buildingCoor.longitude = undefined;
      $scope.buildingAddr = undefined;

      $('#addModal').modal({
        close: true
      });
    };

    $scope.deleteListing = function(index) {
      console.log(index);
      $scope.listings.splice(index, 1);
    };

    $scope.showDetails = function(index) {
      $scope.code = index.code;
      $scope.name = index.name;
      $scope.coor = index.coordinates;
      $scope.addr = index.address;
    };
  }
]);
