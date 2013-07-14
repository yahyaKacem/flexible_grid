//########################################################################
var flexibleGridApp = angular.module('flexibleGrid', []);
//########################################################################
//######injecting the dependencies########################################
flexibleGridDirecitves.main.$inject = ['tplsUrl'];
flexibleGridDirecitves.border.$inject = ['tplsUrl'];
flexibleGridDirecitves.handle.$inject = ['tplsUrl'];
flexibleGridDirecitves.flexibleGrid.$inject = ['tplsUrl'];
//########################################################################
//####assigning the controllers and the directives to the application#####
flexibleGridApp.controller(flexibleGridControllers);
flexibleGridApp.directive(flexibleGridDirecitves);
//########################################################################
angular.value('tplsUrl', '.tmp/tpls/');
