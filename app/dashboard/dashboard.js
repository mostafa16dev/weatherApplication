'use strict';

angular.module('myApp.dashboard', ['ngRoute','chart.js'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'dashboardCtrl'
  });
}])



.controller('dashboardCtrl', ['$scope','appService','Notification', function($scope,appService,Notification) {

  $scope.showMonthlyAverage = false;

  $scope.userCity;
  if(sessionStorage.getItem("userCity") === null){
    $scope.userCity = localStorage.getItem("userCity");
    $scope.getWeather($scope.userCity);
  }else{
    appService.getUserData().then(function (data) {
      $scope.userCity = data.regionName;
      $scope.getWeather($scope.userCity);
      });
  }

  $scope.getWeather = function (q) {
    appService.getWeather(10,q).then(function (data) {
      if(data.data.error != undefined){
        Notification({message: 'City not found! please enter correct city name'}, 'error');
      }
      else{
        $scope.currentWeather = data.data.current_condition[0];
        $scope.astronomy = data.data.weather[0].astronomy[0];
          $scope.hourlyTemp = [getHourlyTemp(data.data)]; //for hourlyTemp chart
          $scope.hideHourltemp = true;
        if(data.data.ClimateAverages != null){
          $scope.monthlyLabels = getmonthlyAverage(data.data)[2];//for monthlyAverage chart
          $scope.monthlyAverage = [getmonthlyAverage(data.data)[1], getmonthlyAverage(data.data)[0]]; //for monthlyAverage chart
          $scope.showMonthlyAverage = true;
        }else{
          $scope.showMonthlyAverage = false;
        }
        if(data.data.request[0].type == 'City'){
          $scope.userCity = data.data.request[0].query;
        }
        $scope.tenDaysWeather = data.data.weather;
      }
      });
      $scope.city = '';
    }

  function getHourlyTemp(data){
    var hourlyTemp = [];
    for(var i=0;i<data.weather[0].hourly.length;i++){
      hourlyTemp.push(data.weather[0].hourly[i].tempC);
    }
    return hourlyTemp;
  }

  function getmonthlyAverage(data){
    var monthlyAverage =[[[]]];
    monthlyAverage[1] = [];
    monthlyAverage[2] = [];
    for(var i=0;i<data.ClimateAverages[0].month.length;i++){
      monthlyAverage[0][i] = data.ClimateAverages[0].month[i].avgMinTemp;
      monthlyAverage[1][i] = data.ClimateAverages[0].month[i].absMaxTemp;
      monthlyAverage[2][i] = data.ClimateAverages[0].month[i].name;
    }
    return monthlyAverage;
  }

  // for hourlyTemp chart
  $scope.labels = ["1 am", "3 am", "6 am", "9 am", "12 am", "3 pm", "6 pm", "9 pm"];
  $scope.series = ['Temp in °C'];
  $scope.colors =['#DCDCDC'];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }    
      ]
    }
  };

  //for monthly average chart
  $scope.monthlySeries = ['Max Temp in °C', 'Min Temp in °C'];
}]);