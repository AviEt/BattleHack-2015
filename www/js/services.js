angular.module('starter.services', ["ngResource"])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
}).factory('Routes', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var routes = [{
      id: 0,
      name: 'Ben Sparrow',
      startText: 'Tel-Aviv',
      fullStartAddress: 'Tel-Aviv, 64 Dizengof st.',
      destinationText: 'Nethanya',
      fullDestinationAddress: 'Nethanya, 10 Giborey Israel st.',
      face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
      id: 1,
      name: 'Max Lynx',
      startText: 'Tel-Aviv',
      fullStartAddress: 'Tel-Aviv, 64 Dizengof st.',
      destinationText: 'Nethanya',
      fullDestinationAddress: 'Nethanya, 10 Giborey Israel st.',
      face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
      id: 2,
      name: 'Adam Bradleyson',
      startText: 'Tel-Aviv',
      fullStartAddress: 'Tel-Aviv, 64 Dizengof st.',
      destinationText: 'Nethanya',
      fullDestinationAddress: 'Nethanya, 10 Giborey Israel st.',      face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
      id: 3,
      name: 'Perry Governor',
      startText: 'Tel-Aviv',
      fullStartAddress: 'Tel-Aviv, 64 Dizengof st.',
      destinationText: 'Nethanya',
      fullDestinationAddress: 'Nethanya, 10 Giborey Israel st.',      face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
    }, {
      id: 4,
      name: 'Mike Harrington',
      startText: 'Tel-Aviv',
      fullStartAddress: 'Tel-Aviv, 64 Dizengof st.',
      destinationText: 'Nethanya',
      fullDestinationAddress: 'Nethanya, 10 Giborey Israel st.',      face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    return {
      all: function() {
        return routes;
      },
      remove: function(route) {
        routes.splice(routes.indexOf(route), 1);
      },
      get: function(routeId) {
        for (var i = 0; i < routes.length; i++) {
          if (routes[i].id === parseInt(routeId)) {
            return routes[i];
          }
        }
        return null;
      }
    };
  }).

factory('FutureDeliveries', function() {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var deliveries = [{
        id: 0,
        startText: 'Tel-Aviv',
        fullStartAddress: 'Tel-Aviv, 64 Dizengof st.',
        destinationText: 'Nethanya',
        fullDestinationAddress: 'Nethanya, 10 Giborey Israel st.',
        date: 'Oct 9th 2015'
      }];

      return {
        all: function() {
          return deliveries;
        },
        remove: function(delivery) {
          deliveries.splice(deliveries.indexOf(delivery), 1);
        },
        get: function(deliveryId) {
          for (var i = 0; i < deliveries.length; i++) {
            if (deliveries[i].id === parseInt((deliveryId))) {
              return deliveries[i];
            }
          }
          return null;
        }
      };
    }).

factory('DeliveriesUpdater', function($http) {
  var lastDeliveriesTimeStamp = 0;

  return {
    lastDeliveriesUpdate: function() {
      return lastDeliveriesTimeStamp;
    },

    updateDeliveries: function() {
      lastDeliveriesTimeStamp = lastDeliveriesTimeStamp + 1;
    }
  }
});
