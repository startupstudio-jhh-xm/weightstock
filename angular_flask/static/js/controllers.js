// /* Controllers */

var IndexController = function($scope, $location) {
  $location.path('/teams');
};

var CompetitionsController = function($scope, $location, dataStore) {
  $scope.user = dataStore.user;
  $scope.pools = dataStore.pools;
};

var formatPool = function(el) {
  return {
    data: el,
    joined: false,
    start: false,
    end: false
  };
};

var CreateController = function($scope, $location, $route, dataStore, $timeout) {
  $scope.user = dataStore.user;
  $scope.pool = {};

  var pool = $scope.pool;
  var poolId = dataStore.pools.length;

  // need pot, players, initiator, goal, time

  $scope.start = function() {
    dataStore.user.balance -= pool.pledge;
    pool.pot = (pool.pledge + (pool.friends.length * pool.pledge) / 2).toFixed(2);
    pool.investors = pool.friends.length;
    pool.leader = 'Jonathan Huang';
    pool.start_date = pool.startDate.toLocaleDateString();
    pool.end_date = pool.endDate.toLocaleDateString();

    dataStore.pools.push(formatPool(pool));
    $location.path('/join/' + poolId);
  };

  // TODO: need to fix this bug
  $scope.invite = function(friend) {
    friend.invited = true;
    pool.friends = pool.friends || [];
    pool.friends.push(friend);
  };
};

var JoinController = function($scope, $location, $route, dataStore, $timeout) {
  var poolId = $route.current.params.id;
  $scope.user = dataStore.user;
  $scope.pool = dataStore.pools[poolId];
  $scope.started = dataStore.started;
  $scope.ended = dataStore.ended;

  $scope.join = function() {
    // change joined
    dataStore.pools[poolId].joined = !dataStore.pools[poolId].joined;
    dataStore.user.balance -= dataStore.pools[poolId].data.low_bet;
    dataStore.pools[poolId].data.players++;
    dataStore.pools[poolId].data.pot += dataStore.pools[poolId].data.low_bet;

    $scope.fireStart = function() {
      dataStore.pools[poolId].start = true;
      dataStore.pools[poolId].data.investors += dataStore.started.investors;
      dataStore.pools[poolId].data.pot += (dataStore.started.investors * dataStore.pools[poolId].data.low_friend_bet);
    };

    $scope.fireEnd = function() {
      dataStore.pools[poolId].end = true;
      dataStore.ended.reward = (0.5 * dataStore.ended.portion).toFixed(2);
    };
  };

  // TODO: need to fix this bug
  $scope.invite = function(friend) {
    friend.invited = true;
  };
};
