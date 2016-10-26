angular.module('shopular').service('Items', function(Item, localStorageService) {
  function getItems() {
    return localStorageService.get('items') || [];
  }

  function setItems(items) {
    localStorageService.set('items', items);
  }

  function findItemById(itemsOld, idToFind) {
    var itemFound;
    itemsOld.forEach(function(itemOld) {
      if (itemOld.id === idToFind) {
        itemFound = itemOld;
      }
    });
    return itemFound;
  }

  this.update = function(item) {
    var items = getItems();
    var itemToUpdate = findItemById(items, item.id);
    angular.copy(item, itemToUpdate);
    setItems(items);
  }

  this.fetch = function() {
    return getItems();
  }
  this.create = function(itemProps) {
    var items = getItems();
    var newItem = new Item(itemProps);
    items.push(newItem);
    setItems(items);
  }
  this.reset = function() {
    var items = [];
    setItems(items);
  }
});
