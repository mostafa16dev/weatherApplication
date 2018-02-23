"use strict";

angular.module('myApp')
  .service('appService',function($http){
    var apiUrl = 'https://api.worldweatheronline.com/premium/v1/weather.ashx';
    var key = '66c4c7e9ae76496583b181328181802';

    //q: City and Town Name or IP Address or UK Postcode or Canada Postal Code or US Zipcode or Latitude and Longitude (in decimal) see docs for further info   
    this.getWeather = function(numOfDays,q){
      return $http({
           method: 'GET',
           url: apiUrl,
           params: {key: key, q: q, num_of_days: numOfDays, format: 'json'},
         }).then(function(response){
           return response.data;
         });
    }

    var url = "http://ip-api.com/json";
    this.getUserData = function(){
      return $http({
           method: 'GET',
           url: url,
         }).then(function (response) {  
           return response.data;
         });
    }

  });
