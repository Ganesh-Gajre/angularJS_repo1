(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // ToBuyController
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var showToBuyList = this;
    showToBuyList.items = ShoppingListCheckOffService.getToBuyItems();

    showToBuyList.buyItem = function (itemIndex, item) {
      ShoppingListCheckOffService.buyItem(itemIndex, item.name, item.quantity);
    }
  }

  // AlreadyBoughtController
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var showAlreadyBoughtList = this;
    showAlreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

    showAlreadyBoughtList.removeItem = function (itemIndex, item) {
      ShoppingListCheckOffService.removeItem(itemIndex, item.name, item.quantity);
    }
  }

  // ShoppingListCheckOffService
  function ShoppingListCheckOffService() {
    var service = this;

    // List of to buy shopping items
    var toBuyItems = [
      { name: "pendrive", quantity: 5 },
      { name: "headphones", quantity: 2 },
      { name: "charger", quantity: 3 },
      { name: "power-banks", quantity: 4 },
      { name: "selfie-sticks", quantity: 8 }
    ];

    // List of already bought shopping items
    var alreadyBoughtItems = [];

    service.buyItem = function (itemIndex, itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      alreadyBoughtItems.push(item);
      toBuyItems.splice(itemIndex, 1);
    };

    service.removeItem = function (itemIndex, itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      toBuyItems.push(item);
      alreadyBoughtItems.splice(itemIndex, 1);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getAlreadyBoughtItems = function () {
      return alreadyBoughtItems;
    };

  }

})();
