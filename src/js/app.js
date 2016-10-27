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
