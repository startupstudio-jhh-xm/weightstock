// /* Controllers */

var IndexController = function($scope, $location) {
  $location.path('/competitions');
};

var CompetitionsController = function($scope, $location) {
};

var JoinController = function($scope, $location) {
};

var dateIfy = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      var newd = new Date(arr[i][j].replace( /(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1'));
      arr[i][j] = newd;
    }
  }
  return arr;
};
