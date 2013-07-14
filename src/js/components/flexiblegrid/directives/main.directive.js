//########################################################################
//###################START main###########################################
flexibleGridDirectives.main = function(tplsUrl){
  var linker = function(iScope, iElement, iAttrs){};
  return {
    restrict:    "EA",
    link:        linker,
    templateUrl: tplsUrl + 'main.tpl.html'
  };
};
//###################END main#############################################
//########################################################################
