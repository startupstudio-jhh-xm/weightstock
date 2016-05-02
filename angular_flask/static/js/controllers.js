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

var CheckinController = function($scope, $location, $route, dataStore, $timeout) {
};

var CreateController = function($scope, $location, $route, dataStore, $timeout) {
  $scope.user = dataStore.user;
  $scope.pool = {};

  var pool = $scope.pool;
  var poolId = dataStore.pools.length;

  pool.friends = pool.friends || [];

  // need pot, players, initiator, goal, time

  $scope.start = function() {
    dataStore.user.balance -= pool.pledge;
    pool.pot = (pool.pledge + (pool.friends.length * pool.pledge) / 2).toFixed(2);
    pool.players = pool.friends.length;
    pool.initiator = 'Jonathan Huang';
    pool.start_date = pool.startDate.toLocaleDateString();
    pool.end_date = pool.endDate.toLocaleDateString();
    console.log(pool);
    dataStore.pools.push(formatPool(pool));

    $location.path('/join/' + poolId);
  };

  $scope.invite = function(friend) {
    friend.invited = true;
    pool.friends.push(friend);
  };
};

var JoinController = function($scope, $location, $route, dataStore, $timeout) {
  var poolId = $route.current.params.id;
  $scope.user = dataStore.user;
  $scope.pool = dataStore.pools[poolId];

  var defaultPoolState = {
    "to_end": 0,
    "to_goal": 0,
    "goal": "N/A - Pending Weigh-In",
    "last_weigh_in": "N/A - Pending Weigh-In" ,
    "last_date":  $scope.pool.data.end_date || $scope.pool.data.endDate.toLocaleDateString(),
    "pounds_lost": 0,
    "initial_weigh_in": "N/A - Pending Weigh-In",
    "next_weigh_in": $scope.pool.data.start_date || $scope.pool.data.startDate.toLocaleDateString(),
    "recents": []
  };

  // TODO: hacked friend count
  $scope.friends = $scope.pool.data.friends || $scope.user.friends;

  $scope.started = dataStore.started[poolId] || defaultPoolState;
  $scope.ended = dataStore.ended[poolId] || defaultPoolState;

  $scope.like = function(recent) {
    recent.likes++;
  };

  $scope.dislike = function(recent) {
    recent.dislikes++;
  };
};
