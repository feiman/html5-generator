  //用于生成唯一id的服务
  app.factory('StyleCalc',function(){
    var getTransformStyles = function(animateConfig){
      var rtn = {};
      if(!animateConfig.offsetX && !animateConfig.offsetY 
          && !animateConfig.rotate && !animateConfig.scale) return rtn;
      rtn['transform'] = [];
      rtn['transform'].push('translate('+(animateConfig.offsetX||0)+'px,'+(animateConfig.offsetY||0)+'px)');

      rtn['transform'].push('rotate('+(animateConfig.rotate||0)+'deg)');

      rtn['transform'].push('scale('+(animateConfig.scale)+')');
      
      rtn['transform'] = rtn['transform'].join(' ');
      rtn['-webkit-transform'] = rtn['transform'];
      return rtn;
    };

    var packStyle2Css = function(style,cssSelecter){
      var itemCss = [];
      angular.forEach(style, function(v,k){
        this.push(k+':'+v+';');
      },itemCss);
      return cssSelecter+'{'+itemCss.join('')+'}';
    };
    
    var getTransistionStyles = function(transitionConfig){
      var styles = {};
      var prefixs = ['','-webkit'];
      styles['transition'] = [
                              'all',
                              (transitionConfig.duration||0.6)+'s',
                              transitionConfig.timingFunction||'ease',
                              (transitionConfig.delay||0)+'s'
                             ].join(' ');
      styles['-webkit-transition'] = styles['transition'];
      return styles;
    };
    
    
    var getAnimateStyles = function(animationName,animateConfig){
      var styles = {};
      styles['animation'] =[
              animationName,
              (animateConfig.duration||0.6)+'s',
              animateConfig.timingFunction||'ease',
              (animateConfig.delay||0)+'s',
              animateConfig.direction||'normal',
              animateConfig.iterationInfinite?'infinite':animateConfig.iterationCount||1,
             ].join(' ');
      styles['-webkit-animation'] = styles['animation'];
      return styles;
    };
    
    return {
      transform:getTransformStyles,
      transition:getTransistionStyles,
      animation:getAnimateStyles,
      style2css:packStyle2Css
    }
  });
