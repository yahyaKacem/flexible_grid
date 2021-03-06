//########################################################################
//###################START handle#########################################
flexibleGridDirectives.handle = function(tplsUrl, $window){
  var linker = function(iScope, iElement, iAttrs){
    var __slice  = [].slice;
    var throttle = function(delay, fn) {
      var throttled = false;
      return function() {
        if (throttled) {
          return;
        }
        throttled = true;
        setTimeout((function() {
          return throttled = false;
        }), delay);
        return fn.call.apply(fn, [this].concat(__slice.call(arguments)));
      };
    };
    iScope.trackMove = function($event) {
      $event.preventDefault();
      var target    = iElement.parent();
      var classes   = iElement[0].className.split(' ');
      for(i = 0; i < classes.length; i++){
        if(classes[i] === 'bottom' || classes[i] === 'top'){
          var handle      = 8;
          var coord       = "pageY";
          var offset      = "offsetY"; // make the options module
          var initialSize = iElement.parent().height();
        }else if(classes[i] === 'left' || classes[i] === 'right'){
          var handle      = 0;
          var coord       = "pageX";
          var offset      = "offsetX";
          var initialSize = iElement.parent().width();
        }
        if(classes[i] === 'top' || classes[i] === 'left'){
          var scale = 1;
        }else if(classes[i] === 'bottom' || classes[i] === 'right'){
          var scale = -1;
        }
      }
      var initialCoord  = $event[coord] - $event[offset] + handle;
      var element       = iElement[0];
      var mouseMove     = throttle(10, function(e){
        e.preventDefault();
        if(typeof element.setCapture === "function"){
          element.setCapture();
        }
        return iScope.$apply(function() {
          if(iAttrs.type === "free"){
            var boundries = {
              max: parseInt(iAttrs.max) - 8 || $window.outerWidth,
              min: parseInt(iAttrs.min) || 0
            };
          }else{
            var boundries = {
              max: $('footer#footer').offset().top + 8,
              min: $('header#header').outerHeight() + 7
            };
          }
          var inRange = function(){
            return (boundries.max > e[coord]) && (boundries.min < e[coord]);
          };
          var setTargetSize = function(size){
            for(i in classes){
              if(classes[i] === 'bottom' || classes[i] === 'top'){
                target.height(size);
              }else if(classes[i] === 'left' || classes[i] === 'right'){
                target.width(size);
              }
            }
          };
          while(inRange()){
            var targetSize     = initialSize + scale * (e[coord] - initialCoord);
            var direction      = (scale === 1 ? ((coord === "pageY") ? "top": "left") : ((coord === "pageY") ? "bottom" : "right"));
            iScope.constrained = targetSize !== initialSize;
            iScope.$emit('sizeChanged', {
              type: iAttrs.type,
              direction: direction,
              getNewSize: function(){
                return targetSize;
              }
            });
            setTargetSize(targetSize);
            return iScope.moving = true;
          }
        });
      });
      var mouseUp = function(e) {
        e.preventDefault();
        iScope.$apply(function() {
          iScope.constrained   = false;
          return iScope.moving = false;
        });
        $window.removeEventListener("mousemove", mouseMove, true);
        $window.removeEventListener("mouseup", mouseUp, true);
        return typeof element.releaseCapture === "function" ? element.releaseCapture() : void 0;
      };
      element.unselectable  = "on";
      element.onselectstart = function() {
        return false;
      };
      element.style.userSelect = element.style.MozUserSelect = "none";
      $window.addEventListener("mousemove", mouseMove, true);
      return $window.addEventListener("mouseup", mouseUp, true);
    };
  }
  return {
    scope: {
      options: "="
    },
    restrict:    "E",
    replace:     true,
    link:        linker,
    templateUrl: tplsUrl + 'handle.tpl.html'
  };
};
//###################END handle###########################################
//########################################################################
