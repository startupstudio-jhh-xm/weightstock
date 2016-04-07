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
		controller: IndexController,
	})
  .when('/competitions', {
    templateUrl: 'static/partials/competitions.html',
    controller: CompetitionsController,
  })
  .when('/join', {
    templateUrl: 'static/partials/join.html',
    controller: JoinController,
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
