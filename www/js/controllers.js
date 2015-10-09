angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, BASE_URL, Delivery, DeliveriesUpdater) {

  var deliveriesLastUpdate = DeliveriesUpdater.lastDeliveriesUpdate();



  setInterval(function() {
    var newLastUpdate = DeliveriesUpdater.lastDeliveriesUpdate();
     if(newLastUpdate > deliveriesLastUpdate) {
      $scope.loadDeliveries();
      deliveriesLastUpdate = newLastUpdate;
      $scope.$digest();
     }
  }, 1000);

  $scope.loadDeliveries = function() {
    $http.get(BASE_URL + "/battle_hack/earnings")
          .success(function(result) {
            $scope.earned = result;
          });

    Delivery.query(function (deliveries) {
      $scope.deliveries = deliveries;
    });
  }

  $scope.loadDeliveries();

  $scope.completedDelivery = function(delivery) {
    delivery.type = "PAST";
    $http.get(BASE_URL + "/battle_hack/completed-delivery?id=" + delivery.id);
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('DeliveryCtrl', function($scope, Delivery) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  Delivery.query(function (deliveries) {
    $scope.deliveries = deliveries;
  });
  $scope.remove = function(deliveries) {
    Delivery.remove(delivery);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('DeliveryDetailCtrl', function($scope, $stateParams, $http, BASE_URL, Delivery, DeliveriesUpdater) {
  Delivery.query(function(deliveries) {
    for (i = 0; i < deliveries.length; i++) {
      if(deliveries[i].id == $stateParams.deliveryId) {
        $scope.delivery = deliveries[i];
        break;
      }
    }

  });
  $scope.rideApproved = false;

  $scope.takeRide = function() {
    $scope.rideApproved = true;

    $http.get(BASE_URL + "/battle_hack/accept-delivery?id=" + $scope.delivery.id);

    DeliveriesUpdater.updateDeliveries();

  }
})

.controller('AccountCtrl', function($scope, $http, BASE_URL) {
  $scope.accountCreated = false;

  $scope.createAccount = function() {
    $scope.accountCreated = true;
    $http.post(BASE_URL + "/bh/submerchant")
  }
})
.controller('MapCtrl', function($scope, $ionicLoading, $compile, $stateParams, Delivery) {
        function initialize() {

          var delivery = $scope.delivery;
          var site = new google.maps.LatLng(parseFloat(delivery.startLongitue), parseFloat(delivery.startLatitue));
          var hospital = new google.maps.LatLng(parseFloat(delivery.destinationLongitue), parseFloat(delivery.destinationLatitue));

          var mapOptions = {
            streetViewControl:true,
            center: site,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.TERRAIN
          };
          var map = new google.maps.Map(document.getElementById("map"),
              mapOptions);

          //Marker + infowindow + angularjs compiled ng-click
          var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
          var compiled = $compile(contentString)($scope);

          var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
          });

          var marker = new google.maps.Marker({
            position: site,
            map: map,
            title: 'Strathblane (Job Location)'
          });

          var hospitalRoute = new google.maps.Marker({
            position: hospital,
            map: map,
            title: 'Hospital (Stobhill)'
          });

          var infowindow = new google.maps.InfoWindow({
               content:"Pickup"
          });

          infowindow.open(map,marker);

          var hospitalwindow = new google.maps.InfoWindow({
               content:"Delivery Destination"
          });

          hospitalwindow.open(map,hospitalRoute);

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });

          $scope.map = map;

          var directionsService = new google.maps.DirectionsService();
          var directionsDisplay = new google.maps.DirectionsRenderer();

          var request = {
              origin : site,
              destination : hospital,
              travelMode : google.maps.TravelMode.DRIVING
          };
          directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
              }
          });

          directionsDisplay.setMap(map);

        }

        Delivery.query(function(deliveries) {
                      for (i = 0; i < deliveries.length; i++) {
                        if(deliveries[i].id == $stateParams.deliveryId) {
                          $scope.delivery = deliveries[i];
                          initialize();
                          break;
                        }
                      }
        });

        $scope.centerOnMe = function() {
          if(!$scope.map) {
            return;
          }

          $scope.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
          });
          navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            $scope.loading.hide();
          }, function(error) {
            alert('Unable to get location: ' + error.message);
          });
        };

        $scope.clickTest = function() {
          alert('Example of infowindow with ng-click')
        };

});