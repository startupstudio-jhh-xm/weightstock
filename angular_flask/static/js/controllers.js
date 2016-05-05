// /* Controllers */

var IndexController = function($scope, $location) {
  $location.path('/teams');
};

var CompetitionsController = function($scope, $location, dataStore) {
  $scope.user = dataStore.user;
  $scope.pools = dataStore.pools;
  $scope.globalFund = dataStore.globalFund.toFixed(2);
};

var formatPool = function(el) {
  return {
    data: el,
    joined: true,
    start: false,
    end: false
  };
};

var getDate = function() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10){
      dd='0'+dd;
  }
  if(mm<10){
      mm='0'+mm;
  }

  today = dd+'/'+mm+'/'+yyyy;

  return today;
};

var CheckinController = function($scope, $location, $route, dataStore) {
  var poolId = $route.current.params.id;
  $scope.user = dataStore.user;
  $scope.pool = dataStore.pools[poolId];

  $scope.weighIn = function() {
    var out = {};
    out.date = getDate();
    out.weight = $scope.weight;
    out.photo = $scope.photo || '/static/img/jon-pool1.jpg';
    out.likes = 0;
    out.dislikes = 0;

    dataStore.started[poolId].recents.unshift(out);
    $location.path('/join/' + poolId);
  };
};

var CreateController = function($scope, $location, $route, dataStore) {
  $scope.user = dataStore.user;
  $scope.pool = {};

  $scope.globalFund = dataStore.globalFund.toFixed(2);

  var pool = $scope.pool;
  var poolId = dataStore.pools.length;

  pool.friends = pool.friends || [];

  // need pot, players, initiator, goal, time

  $scope.start = function() {
    dataStore.user.balance -= pool.pledge || 0;
    pool.pot = (pool.pledge + (pool.friends.length * pool.pledge) / 2).toFixed(2);
    pool.players = pool.friends.length;
    pool.initiator = 'Jonathan Huang';
    pool.start_date = pool.startDate.toLocaleDateString();
    pool.end_date = pool.endDate.toLocaleDateString();

    pool.picture = '/static/img/jon-pool1.jpg';
    dataStore.pools.push(formatPool(pool));

    $location.path('/join/' + poolId);
  };

  $scope.invite = function(friend) {
    friend.invited = true;
    pool.friends.push(friend);
  };
};

var JoinController = function($scope, $location, $route, dataStore) {
  var poolId = $route.current.params.id;
  $scope.user = dataStore.user;
  $scope.pool = dataStore.pools[poolId];
  $scope.poolId = poolId;

  $scope.globalFund = dataStore.globalFund.toFixed(2);

  var defaultPoolState = {
    "to_end": 0,
    "to_goal": 0,
    "goal": "N/A - Pending Weigh-In",
    "last_weigh_in": "N/A - Pending Weigh-In" ,
    "last_date":  $scope.pool.data.end_date || $scope.pool.data.endDate.toLocaleDateString(),
    "pounds_lost": 0,
    "initial_weigh_in": "N/A - Pending Weigh-In",
    "next_weigh_in": $scope.pool.data.start_date || $scope.pool.data.startDate.toLocaleDateString(),
    "recents": [],
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
