'use strict';

$(document).ready(function(){
  console.log('ready');
  window.resize(function(){
    setEqualWidthHeight($('.sign-wrapper'));
  });
})

function setEqualWidthHeight(jObject) {
  var width = jObject.width();
  jObject.css({'height':width+'px'});
}
