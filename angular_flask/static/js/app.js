require.config({
    waitSeconds : 2,
    paths : {
        text : '/static/lib/bower_components/requirejs-plugins/lib/text', //text is required
        json : '/static/lib/bower_components/requirejs-plugins/src/json' //alias to plugin
    }
});

var init = false;

var setupData = {
  data: function (dataStore) {
    if (!init) {
      init = true;
      return dataStore.init();
    }
  }
};

angular.module('AngularFlask', ['ngRoute', 'angularFlaskServices', 'angularFlaskFilters'])
.config([
	'$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider, dataStore) {
	$routeProvider
	.when('/', {
		templateUrl: 'static/partials/landing.html',
		controller: IndexController
	})
  .when('/teams', {
    templateUrl: 'static/partials/competitions.html',
    controller: CompetitionsController,
    resolve: setupData
  })
  .when('/create', {
    templateUrl: 'static/partials/create.html',
    controller: CreateController,
    resolve: setupData
  })
  .when('/join/:id', {
    templateUrl: 'static/partials/join.html',
    controller: JoinController,
    resolve: setupData
  })
	.otherwise({
		redirectTo: '/competitions'
	});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}
]);
