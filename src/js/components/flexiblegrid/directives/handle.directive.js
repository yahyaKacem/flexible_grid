//########################################################################
//###################START handle#########################################
flexibleGridDirectives.handle = function(tplsUrl){
  var linker = function(iScope, iElement, iAttrs){};
  return {
    restrict:    "EA",
    link:        linker,
    templateUrl: tplsUrl + 'handle.tpl.html'
  };
};
//###################END handle###########################################
//########################################################################
