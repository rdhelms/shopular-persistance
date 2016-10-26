angular.module('shopular').controller('listInvCtrl', function(Items, $state) {
    this.items = Items.fetch() || [];
    this.sortOrder = 'totalPrice';
    this.sortReverse = false;

    this.sortBy = function(toSortBy) {
      this.sortOrder = toSortBy;
      this.sortReverse = !this.sortReverse;
    };

    this.updateItem = function(item) {
      item.editing = false;
      Items.update(item);
    }

    this.startEditing = function(item) {
      item.editing = true;
    }
});
