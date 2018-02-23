'use strict';

angular.module('myApp').directive("navBar", function($location) {
    return {
        templateUrl : "navbar/navbar.html",
		link: function($scope, element, attrs) {
            $scope.isActive = function(viewLocation) {
				return viewLocation === $location.path();                
            }
        }
    };
});