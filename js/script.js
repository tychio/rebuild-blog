(function (undefined) {
  'use strict';
  //nav
  var list = document.getElementById('list');
  list.onclick = function () {
      var _nav = document.getElementsByTagName('nav')[0];
      var _main = document.getElementsByTagName('main')[0];
      if (_nav.offsetHeight == 0) {
          var _link = _nav.getElementsByTagName('a');
          var _height = _link.length * _link[0].offsetHeight;
          _nav.style.height = _height + 'px';
          _main.style.paddingTop = _height + 'px'
      } else {
          _nav.style.height = '0px';
          _main.style.paddingTop = '0px';
      }
  };
  //backtop
  function scrollTop (p_top) {
      var body = document.body;
      if (typeof body.scrollTop == 'undefined' || body.scrollTop == 0) {
          body = document.documentElement;
      }
      if (p_top < 0) {
          p_top = 0;
      }
      if (p_top !== undefined && !isNaN(p_top - 0)) {
          body.scrollTop = p_top;
      } else {
          return body.scrollTop;
      }
  }
  var backtop = document.getElementById('backtop');
  var interval = 0;
  window.onscroll = function () {
      var _top = scrollTop();
      if (_top > 400) {
          backtop.style.display = 'block';
      } else {
          backtop.style.display = 'none';
      }
  };
  backtop.onclick = function (p_event) {
      interval = setInterval(function () {
          var _top = scrollTop();
          scrollTop(_top - 300);
          if (_top <= 0) {
              scrollTop(0);
              clearInterval(interval);
          }
      }, 50);
      p_event.preventDefault ? p_event.preventDefault() : event.returnValue =   false;
  };
})();