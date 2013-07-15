//########################################################################
var flexibleGridApp = angular.module('flexibleGrid', []);
//########################################################################
//######injecting the dependencies########################################
flexibleGridDirectives.main.$inject = ['tplsUrl'];
flexibleGridDirectives.border.$inject = ['tplsUrl'];
flexibleGridDirectives.handle.$inject = ['tplsUrl', '$window'];
flexibleGridDirectives.flexibleGrid.$inject = ['tplsUrl'];
//########################################################################
//####assigning the controllers and the directives to the application#####
flexibleGridApp.controller(flexibleGridControllers);
flexibleGridApp.directive(flexibleGridDirectives);
//########################################################################
flexibleGridApp.value('tplsUrl', '.tmp/tpls/');
