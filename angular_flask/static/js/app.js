require.config({
    waitSeconds : 2,
    paths : {
        text : '/static/lib/bower_components/requirejs-plugins/lib/text', //text is required
        json : '/static/lib/bower_components/requirejs-plugins/src/json' //alias to plugin
    }
});

var init = false;

angular.module('AngularFlask', ['ngRoute', 'angularFlaskServices', 'angularFlaskFilters'])
.config([
	'$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider, dataStore) {
	$routeProvider
	.when('/', {
		templateUrl: 'static/partials/landing.html',
		controller: IndexController
	})
  .when('/competitions', {
    templateUrl: 'static/partials/competitions.html',
    controller: CompetitionsController,
    resolve: {
      data: function (dataStore) {
        if (!init) {
          init = true;
          return dataStore.init();
        }
      }
    }
  })
  .when('/join/:id', {
    templateUrl: 'static/partials/join.html',
    controller: JoinController,
    resolve: {
      // This is unnecessary but good for testing
      data: function (dataStore) {
        if (!init) {
          init = true;
          return dataStore.init();
        }
      }
    }
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
