(function(window, angular, undefined) {
    angular.module('map')
    .factory('mapService', ['$http', function($http) {

      mapService = {};

      mapService.getCheckpoints = getCheckpoints;
      mapService.postCheckpoint = postCheckpoint;

      return mapService;

/*
Setting up:
  - Create an account at https://mlab.com/
  - Create a database at https://mlab.com/create
    - A Single Node Sandbox plan is free
    - Name it "checkpoints" or whatever you like
  - Create a collection and name it "checkpoints"
  - Enable a public API key (http://docs.mlab.com/data-api/#authentication)
  - Add the API request url to the GET and POST requests with your API key at the end
    - EX."https://api.mlab.com/api/1/databases/checkpoints/collections/checkpoints?apiKey=######""
*/

      // GET checkpoints from database
      function getCheckpoints() {
        return $http.get('https://api.mlab.com/api/1/databases/checkpoints/collections/checkpoints?apiKey=hKnILZUwXU2sIgdi9aH1aJ1jg7LIBn3i')
          .then(handleSuccess, handleError('Did not receive checkpoints'));
      };

      // POST new ccheckpoint to database
      function postCheckpoint(checkpointData) {
        return $http.post('https://api.mlab.com/api/1/databases/checkpoints/collections/checkpoints?apiKey=hKnILZUwXU2sIgdi9aH1aJ1jg7LIBn3i', checkpointData)
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
