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
    joined: true,
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
    pool.players = pool.friends.length;
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

  // TODO: hacked friend count
  $scope.friends = $scope.pool.data.friends || $scope.user.friends;

  $scope.started = dataStore.started;
  $scope.ended = dataStore.ended;
};
