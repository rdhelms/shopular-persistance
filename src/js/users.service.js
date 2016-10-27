angular.module('shopular').service('Users', function(User, localStorageService) {
  currentUser = localStorageService.get('currentUser') || {username: 'Not Logged In', signInDate: 0};

  function getUsers() {
    return localStorageService.get('users') || [];
  }

  function setUsers(users) {
    localStorageService.set('users', users);
    localStorageService.set('currentUser', currentUser);
  }

  function findUserByName(usersOld, nameToFind) {
    var userFound;
    usersOld.forEach(function(userOld) {
      if (userOld.username === nameToFind) {
        userFound = userOld;
      }
    });
    return userFound;
  }

  this.update = function(user) {
    var users = getUsers();
    var userToUpdate = findUserByName(users, user.username);
    angular.copy(user, userToUpdate);
    currentUser = userToUpdate;
    setUsers(users);
  };
  this.fetchAll = function() {
    return getUsers();
  };
  this.fetchCurrent = function() {
    return localStorageService.get('currentUser') || currentUser;
  };
  this.create = function(username) {
    var users = getUsers();
    var newUser = new User(username);
    currentUser = newUser;
    users.push(newUser);
    setUsers(users);
  };
  this.reset = function() {
    var users = [];
    setUsers(users);
  };
  this.checkLogin = function(username) {
    var users = getUsers();
    var existing = findUserByName(users, username);
    if (existing) {
        existing.signInDate = Date.now();
        this.update(existing);
    } else {
      this.create(username);
    }
  };
});
