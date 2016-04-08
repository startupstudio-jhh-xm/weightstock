// /* Controllers */

var IndexController = function($scope, $location) {
  $location.path('/competitions');
};

var CompetitionsController = function($scope, $location, dataStore) {
  $scope.user = dataStore.user;
  $scope.pools = dataStore.pools;
};

var JoinController = function($scope, $location, $route, dataStore, $timeout) {
  var poolId = $route.current.params.id;
  $scope.user = dataStore.user;
  $scope.pool = dataStore.pools[poolId];
  $scope.started = dataStore.started;
  $scope.ended = dataStore.ended;

  $scope.join = function() {
    dataStore.pools[poolId].joined = !dataStore.pools[poolId].joined;
    dataStore.user.balance -= dataStore.pools[poolId].data.low_bet;
    dataStore.pools[poolId].data.players++;
    dataStore.pools[poolId].data.pot += dataStore.pools[poolId].data.low_bet;

    // TODO: fix timeout hack
    // Change Timeout
    $timeout(function() {
      console.log(dataStore.pools);
      dataStore.pools[poolId].start = true;
      dataStore.pools[poolId].data.investors += dataStore.started.investors;
      dataStore.pools[poolId].data.pot += (dataStore.started.investors * dataStore.pools[poolId].data.low_friend_bet);

      $timeout(function() {
        dataStore.pools[poolId].end = true;
        dataStore.ended.reward = (0.5 * dataStore.ended.portion).toFixed(2);
      }, 10000);
    }, 5000);
  };


  // TODO: need to fix this bug
  $scope.invite = function(friend) {
    friend.invited = true;
  };
};
