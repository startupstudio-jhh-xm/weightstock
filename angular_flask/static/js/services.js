angular.module('angularFlaskServices', ['ngResource'])
.service('dataStore', function($rootScope, $q) {
  this.user = null;
  this.pool = null;
  this.started = null;
  this.ended = null;

  var dataStore = this;

  this.init = function() {
    var deferred = $q.defer();
    require(['json!./static/data/user.json', 'json!./static/data/pool.json', 'json!./static/data/started.json', 'json!./static/data/ended.json'], function(user, pools, started, ended) {
      dataStore.user = user;
      dataStore.started = started;
      dataStore.ended = ended;

      dataStore.pools = pools.map(function(el) {
        return {
          data: el,
          joined: false,
          start: false,
          end: false
        };
      });

      deferred.resolve('Done');
    });
    return deferred.promise;
  };
});
