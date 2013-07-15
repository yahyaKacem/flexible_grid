//########################################################################
//###################START flexibleGrid###################################
flexibleGridDirectives.flexibleGrid = function(tplsUrl){
  var linker = function(iScope, iElement, iAttrs){
    iScope.$on('sizeChanged', function(event, data){
      if(data.type === "free"){
        iScope.$broadcast('borderSizeChanged', data);
      }else{
        iScope.$broadcast('mainSizeChanged', data);
        iScope.$broadcast('borderSizeChanged', data);
      }
    });
  };
  return {
    restrict:    "E",
    replace:     true,
    transclude:  true,
    link:        linker,
    templateUrl: tplsUrl + 'flexiblegrid.tpl.html'
  };
};
//###################END flexibleGrid#####################################
//########################################################################
