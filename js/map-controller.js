/*
Setting up:
  - Go to https://cloudinary.com/console to get your "Cloud Name"
    and add to line 80
  - Go to https://cloudinary.com/console/settings/upload and "Enable unsigned uploads"
  - Add your "Upload Preset" name to line 82
*/

(function(window, angular, undefined) {
  angular.module('map')
  .controller('map-controller',
    ['NgMap', 'mapService', '$window', 'Upload', 'cloudinary', '$rootScope',
    function(NgMap, mapService, $window, $upload, cloudinary, $rootScope) {

    var vm = this;
    vm.newCheckpoints = []; // color red (in directive)
    vm.oldCheckpoints = []; // color yellow (in directive)
    vm.title = Date.now() // checkpoint name in DB
    vm.verified = false; // photo verification
    vm.imageUrl = ''; // saving checkpoint image URL to DB

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
        let checkpointDay = data[i].day
        let checkpointHour = data[i].hour
        // if older than a day, just log
        if ((nowDay - checkpointDay) > 1) {
          console.log('Old checkpoints ' + data[i])
        // if newer than two hours, post red
        } else if ((nowHour - checkpointHour) < 2) {
          vm.newCheckpoints.push(data[i])
          console.log('new ' + vm.newCheckpoints)
        // if older, post yellow
        } else if ((nowHour - checkpointHour) > 2) {
          vm.oldCheckpoints.push(data[i])
          console.log('old ' + vm.oldCheckpoints)
        } else {
          console.log('error retreiving checkpoints')
        }
      }
    })

    // ===================== User interaction ===============================

    // Open info window on marker click
    vm.showDetail = function(e, checkpoint) {
      vm.checkpoint = checkpoint;
      vm.map.showInfoWindow('checkpoint', this)
    }

    // Open info window on user click
    vm.placeMarker = function(e) {
      vm.map.showInfoWindow('newCheckpoint', e.latLng);
      vm.lat = e.latLng.lat();
      vm.lng = e.latLng.lng();
    }

    // Upload checkpoint image (allows for multiple images)
    vm.uploadFiles = function(files) {
      vm.files = files;
      if (!vm.files) {
        return;
      }
      angular.forEach(files, function(file) {
        if (file && !file.$error) {
          file.upload = $upload.upload({
            url: "https://api.cloudinary.com/v1_1/" + "dotkbdwdw "+ "/upload", // <--- cloud_name
            data: {
              upload_preset: "me0nxa6b", // <---- upload_preset
              tags: 'checkpoints',
              context: 'photo=' + vm.title,
              file: file
            }
          })
          .progress(function(e) {
            file.progress = Math.round((e.loaded * 100.0) / e.total);
            file.status = "Uploading... " + file.progress + "%";
          })
          .success(function(data, status, headers, config) {
            $rootScope.photos = $rootScope.photos || [];
            data.context = {custom: {photo: vm.title}};
            file.result = data;
            $rootScope.photos.push(data);
            vm.verified = true; // change boolean so that user can submit checkpoint
            vm.imageUrl = data.url; // set URL to global variable so it can be passed on upload
          })
          .error(function(data, status, headers, config) {
            file.result = data;
          });
        }
      });
    };

    // Allow user to add checkpoint to map
    vm.createNewCheckpoint = function() {
      /*
        The following 4 lines are for verifying that an image is submitted for
        each checkpoint. If you don't want to use these capabilities, simply
        delete them.
      */
      if (vm.verified == false) {
        alert("please upload a photo to verify checkpoint");
        return
      }

      if (vm.formData.info) {
        info = vm.formData.info
      };

      var date = new Date();
      var fullDate = date.toString()
      var day = date.getDate()
      var hour = date.getHours()
      var checkpointData = {
        position: [vm.lat.toFixed(6), vm.lng.toFixed(6)],
        date: fullDate, // for displaying in infowindow directive
        day: day, // for setting icon color
        hour: hour, // for setting icon color
        title: vm.title,
        url: vm.imageUrl,
        info: info
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
