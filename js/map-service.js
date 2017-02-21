(function(window, angular, undefined) {
    angular.module('map')
    .factory('mapService', ['$http', function($http) {

      mapService = {};

      mapService.getCheckpoints = getCheckpoints;
      mapService.postCheckpoint = postCheckpoint;

      return mapService;

/*
Checkout the README.md for instructions on setting up your own public api
EX. "https://api.mlab.com/api/1/databases/checkpoints/collections/checkpoints?apiKey=######""
*/

      // GET checkpoints from database
      function getCheckpoints() {
        return $http.get('[public_API]')
          .then(handleSuccess, handleError('nope'));
      };

      // POST new ccheckpoint to database
      function postCheckpoint(checkpointData) {
        return $http.post('[public_API]', checkpointData)
          .then(handleSuccess, handleError('Could not post checkpoint'));
      }


      // ==================== private functions ==============================

      function handleSuccess(res) {
        return res.data;
      }

      function handleError(error) {
        return function () {
          return { success: false, message: error };
        };
      }

    }]);
})(window, window.angular);
