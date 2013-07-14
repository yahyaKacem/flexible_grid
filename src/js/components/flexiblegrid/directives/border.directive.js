//########################################################################
//###################START border#########################################
flexibleGridDirectives.border = function(tplsUrl){
  var linker = function(iScope, iElement, iAttrs){};
  return {
    restrict:    "EA",
    link:        linker,
    templateUrl: tplsUrl + 'border.tpl.html'
  };
};
//###################END border###########################################
//########################################################################
