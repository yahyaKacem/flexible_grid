//########################################################################
//###################START main###########################################
flexibleGridDirectives.main = function(tplsUrl){
  var linker = function(iScope, iElement, iAttrs){
    iScope.$on('mainSizeChanged', function(event, data){
      iElement.css('bottom', $('footer').height() + data.getNewSize() + 8 + "px");
    });
  };
  return {
    restrict:    "E",
    replace:     true,
    transclude:  true,
    link:        linker,
    templateUrl: tplsUrl + 'main.tpl.html'
  };
};
//###################END main#############################################
//########################################################################
