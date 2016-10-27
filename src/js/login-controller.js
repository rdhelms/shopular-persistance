angular.module('shopular').controller('loginInvCtrl', function(Users, $state) {
  this.username = '';
  this.currentUser = Users.fetchCurrent() || {username: 'Not logged in', signInDate: 0};

  console.log(this.currentUser);

  this.newLogin = function(username) {
    Users.checkLogin(username);
    $state.go('inv.manage.new');
  };

});
