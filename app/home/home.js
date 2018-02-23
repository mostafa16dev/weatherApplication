'use strict';

angular.module('myApp.home', ['ngRoute','ngGeolocation','ui-notification'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])

.config(function(NotificationProvider) {
  NotificationProvider.setOptions({
      delay: 5000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'top'
  });
})



.controller('homeCtrl', ['$scope','$geolocation','Notification','appService',function($scope,$geolocation,Notification,appService) {

  var longitude;
  var latitude;
  var position;//longitude,latitude
  var userIPAddress;
  $scope.userCity;

  $geolocation.getCurrentPosition().then(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      position = longitude +','+latitude;
      $scope.getWeather(position);
  }).catch(function() { 
    appService.getUserData().then(function(data){
      userIPAddress = data.query;
      $scope.userCity= data.regionName;
      $scope.getWeather(userIPAddress);
    });
   });


  $scope.getWeather = function(q){
    appService.getWeather(1,q).then(function(data){
      if(data.data.error != undefined){
        Notification({message: 'City not found! please enter correct city name'}, 'error');
      }
      else{
        if(data.data.request[0].type == 'City'){
          $scope.userCity = data.data.request[0].query;
          sessionStorage.setItem("userCity", $scope.userCity);        
        } else{
          appService.getUserData().then(function(data){
            $scope.userCity= data.regionName;
            sessionStorage.setItem("userCity", $scope.userCity);        
          });        
        }
        var currentCondition = data.data.current_condition[0];
        $scope.observationTime = currentCondition.observation_time;
        $scope.tempC = currentCondition.temp_C;
        $scope.precipitation = currentCondition.precipMM;
        $scope.humidity = currentCondition.humidity;
        $scope.windSpeedKmph = currentCondition.windspeedKmph;;
        $scope.weatherDescription = currentCondition.weatherDesc[0].value;
        $scope.weatherIconUrl = currentCondition.weatherIconUrl[0].value;
      }
    });
    $scope.city = '';
  }

  
}]);


