//########################################################################
//###################START border#########################################
flexibleGridDirectives.border = function(tplsUrl){
  var linker = function(iScope, iElement, iAttrs){
    var classes = iElement[0].className.split(' ');
    var setTargetSize = function(target, size){
      for(i in classes){
        if(classes[i] === 'bottom' || classes[i] === 'top'){
          target.height(size);
        }else if(classes[i] === 'left' || classes[i] === 'right'){
          target.width(size);
        }
      }
    };
    iScope.$on('borderSizeChanged', function(event, data){
      for(i in classes){
        if(data.direction === classes[i]){
          setTargetSize(iElement, data.getNewSize());
        }
      }
    })
  };
  return {
    restrict:    "E",
    replace:     true,
    transclude:  true,
    link:        linker,
    templateUrl: tplsUrl + 'border.tpl.html'
  };
};
//###################END border###########################################
//########################################################################
