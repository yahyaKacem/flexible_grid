//########################################################################
var app = angular.module('app', ['flexibleGrid']);
//########################################################################
//######injecting the dependencies########################################
controllers.MainCtrl.$inject = ['$scope'];
//########################################################################
//####assigning the controllers and the directives to the application#####
app.controller(controllers);
app.directive(directives);
//########################################################################
