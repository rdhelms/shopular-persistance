angular.module('shopular', ['ui.router', 'LocalStorageModule'])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider.state('inv', {
        url: '/',
        abstract: true,
        template: '<ui-view></ui-view>'
      }).state('inv.login', {
        url: '',
        templateUrl: 'src/views/login.html',
        controller: 'loginInvCtrl as login'
      }).state('inv.manage', {
        url: 'inventory',
        abstract: true,
        templateUrl: 'src/views/manage.html',
        controller: 'loginInvCtrl as login'
      }).state('inv.manage.new', {
        url: '/new',
        templateUrl: 'src/views/new.html',
        controller: 'newInvCtrl as newInv'
      }).state('inv.manage.list', {
        url: '/list',
        templateUrl: 'src/views/list.html',
        controller: 'listInvCtrl as listInv'
      });
});
;angular.module('shopular').factory('Item', function() {
  var tax = ( 5.75 / 100 );
  return function Item(props) {
    props = props || {};
    this.id = props.id || Date.now();
    this.name = props.name || '';
    this.price = props.price || 0;
    this.quantity = props.quantity || 0;
    this.color = props.color || '';
    this.discount = props.discount || 0;
    this.totalPrice = (props.price * (1 + tax) - props.discount) || 0;
    this.editing = false;
  };
});
;angular.module('shopular').service('Items', function(Item, localStorageService) {
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
;angular.module('shopular').controller('listInvCtrl', function(Items, $state) {
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
;angular.module('shopular').controller('loginInvCtrl', function(Users, $state) {
  this.username = '';
  this.currentUser = Users.fetchCurrent() || {username: 'Not logged in', signInDate: 0};

  console.log(this.currentUser);

  this.newLogin = function(username) {
    Users.checkLogin(username);
    $state.go('inv.manage.new');
  };

});
;angular.module('shopular').controller('newInvCtrl', function(Items, $state) {
  this.newItem = {
    name: null,
    price: null,
    quantity: null,
    color: null,
    discount: null,
  }

  this.addNew = function() {
    console.log(this.newItem);
    Items.create(this.newItem);
    $state.go('inv.manage.list');
  }

  this.getInit = function() {
    var initItems = [{
        "id": 2957,
        "name": "widget",
        "price": 32,
        "quantity": 203,
        "color": "red",
        "discount": 31
      }, {
        "id": 89274,
        "name": "golf club",
        "price": 98,
        "quantity": 10,
        "color": "black",
        "discount": 0
      }, {
        "id": 64,
        "name": "iPhone",
        "price": 499,
        "quantity": 2,
        "color": "white",
        "discount": 0
      }, {
        "id": 87363,
        "name": "bonzai tree",
        "price": 76,
        "quantity": 2,
        "color": "green",
        "discount": 0
      }, {
        "id": 1736,
        "name": "towel",
        "price": 55,
        "quantity": 30,
        "color": "brown",
        "discount": 10
      }, {
        "id": 4836,
        "name": "dog bed",
        "price": 99,
        "quantity": 10,
        "color": "beige",
        "discount": 50
      }, {
        "id": 829,
        "name": "waste basket",
        "price": 15,
        "quantity": 40,
        "color": "silver",
        "discount": 0
      }, {
        "id": 46,
        "name": "guitar",
        "price": 899,
        "quantity": 0,
        "color": "blue",
        "discount": 150
      }, {
        "id": 17456,
        "name": "matcha tea",
        "price": 42,
        "quantity": 4,
        "color": "green",
        "discount": 11
      }, {
        "id": 3292,
        "name": "enlightenment",
        "price": 99999,
        "quantity": 1,
        "color": "red",
        "discount": 0
      }, {
        "id": 533,
        "name": "eggs",
        "price": 5,
        "quantity": 12,
        "color": "brown",
        "discount": 1
      }, {
        "id": 683,
        "name": "pillow",
        "price": 27,
        "quantity": 10,
        "color": "black",
        "discount": 12
    }];
    initItems.forEach(function(item) {
      Items.create(item);
    });
    $state.go('inv.manage.list');
  }

  this.resetInv = function() {
    Items.reset();
    $state.go('inv.manage.list');
  }
});
;angular.module('shopular').factory('User', function() {
  return function User(name) {
    this.id = Date.now();
    this.username = name || '';
    this.signInDate = Date.now();
  };
});
;angular.module('shopular').service('Users', function(User, localStorageService) {
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
