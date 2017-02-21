(function(window, angular, undefined) {
  angular.module('map')
  .controller('map-controller', ['NgMap', 'mapService', '$window',
    function(NgMap, mapService, $window) {


    var vm = this;
    vm.newCheckpoints = [];
    vm.oldCheckpoints = [];
    // ==================== Map =====================================

    // Display map
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });

    mapService.getCheckpoints().then(function(data) {
      // get current date/hour
      var today = new Date();
      var nowDay = today.getDate();
      var nowHour = today.getHours();

      // loops through data
      for (var i = 0; i < data.length; i++ ) {
        console.log('starting for loop')
        let checkpointDay = data[i].day
        let checkpointHour = data[i].hour
        // if older than a day
        if ((nowDay - checkpointDay) > 1) {
          console.log('Old checkpoints ' + data[i])
        } else if ((nowHour - checkpointHour) < 2) {
          vm.newCheckpoints.push(data[i])
          console.log('new ' + vm.newCheckpoints)
        } else if ((nowHour - checkpointHour) > 2) {
          vm.oldCheckpoints.push(data[i])
          console.log('old ' + vm.oldCheckpoints)
        } else {
          console.log('mistake')
        }
      }
      // console.log(data[0])
      // vm.checkpoints = data;

    })

    // ===================== User interaction ===============================

    vm.showDetail = function(e, checkpoint) {
      vm.checkpoint = checkpoint;
      vm.map.showInfoWindow('checkpoint', this)
    }

    vm.placeMarker = function(e) {
      // var marker = new google.maps.Marker({position: e.latLng, map: vm.map});
      vm.map.showInfoWindow('newCheckpoint', e.latLng);
      vm.lat = e.latLng.lat();
      vm.lng = e.latLng.lng();
    }

    // Allow user to add checkpoint to map
    vm.createNewCheckpoint = function() {
      var date = new Date();
      var fullDate = date.toString()
      var day = date.getDate()
      var hour = date.getHours()
      console.log(date)
      var checkpointData = {
        position: [vm.lat.toFixed(6), vm.lng.toFixed(6)],
        date: fullDate,
        day: day,
        hour: hour
      };

      mapService.postCheckpoint(checkpointData)
        .then(function(data) {
          // repopulate map
          mapService.getCheckpoints().then(function(data) {
            vm.checkpoints = data;
          });
        })
        .catch(function(data) {
          console.error('error: ' + data);
        });

      vm.lat, vm.lng = 0;
    }


  }])
})(window, window.angular);
