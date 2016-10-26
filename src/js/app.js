angular.module('shopular', ['ui.router', 'LocalStorageModule'])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider.state('inv', {
        url: '/',
        abstract: true,
        template: '<ui-view></ui-view>'
      }).state('inv.new', {
        url: '',
        templateUrl: 'src/views/new.html',
        controller: 'newInvCtrl as newInv'
      }).state('inv.list', {
        url: 'list',
        templateUrl: 'src/views/list.html',
        controller: 'listInvCtrl as listInv'
      });
});
