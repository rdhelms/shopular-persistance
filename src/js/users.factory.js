angular.module('shopular').factory('User', function() {
  return function User(name) {
    this.id = Date.now();
    this.username = name || '';
    this.signInDate = Date.now();
  };
});
