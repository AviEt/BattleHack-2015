angular.module('starter.services').
factory("Delivery", function($resource, $http) {
   $http.defaults.useXDomain = true;
   return $resource("http://localhost:8080/deploy/battle_hack/:id", {
       id: '@id'
   }, {
       update: {
           method: "PUT"
       },
       remove: {
           method: "DELETE"
       }
   });
});