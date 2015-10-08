angular.module('starter.services').
factory("Delivery", function($resource, $http,BASE_URL) {
   return $resource(BASE_URL + "/battle_hack/:id", {
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