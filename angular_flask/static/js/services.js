angular.module('angularFlaskServices', ['ngResource'])
  .service('dataStore', function($rootScope, $q) {
    // this.data = null;


    // this.init = function() {
    //   console.log('initing');
    //   var deferred = $q.defer();
    //   require(['json!./static/img/test.json'], function(data) {
    //     deferred.resolve('Done');
    //   });
    //   return deferred.promise;
    // };

    // this.next = function() {
    //   dataStore.currentIndex++;
    //   dataStore.currentImg = '/static/img/' + dataStore.data[dataStore.currentIndex].file_name;
    //   dataStore.currentData = dataStore.data[dataStore.currentIndex];
    // };

  });
