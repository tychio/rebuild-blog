---
layout: post
title: 使用Pointer Lock技术
tags: [html,html5,mouse look,鼠标视角]
category: Tech
---

所谓的mouselook其实就是第一人称视角，而[pointerlock技术](http://www.w3.org/TR/pointerlock/ "pointerlock技术")（其实和第一人称没什么关系,只是说这个技术可以用来实现第一人称）其核心就是让鼠标隐藏并且无论怎么拖动鼠标，鼠标指针都不会跑出目标区域。
<!-- more -->
用法：

* requestPointerLock 是最主要的方法，进入pointerlock模式，在chrome会出现像fullscreen一样的提示，是否隐藏鼠标，按esc键可以退出该模式。需要加上浏览器前缀，moz或者webkit，像这样element.webkitRequestPointerLock()。不过在firefox中测试用不了，具体还没来得及调，不知道什么情况。

* pointerlockchange 是一个事件event，用addEventListener绑定给一个方法，在切换模式时就可以触发该方法。同样需要添加前缀。

* pointerLockElement 是当前为pointerlock模式的元素，用来检查目标元素是否进入了该模式，比如document.pointerLockElement === element。一样添加前缀。

* movementX/movementY 在pointerlock模式中，鼠标是隐藏并且不动的，因此要获取此时的鼠标动作，需要这个属性。存在与事件event中，比如在mousemove时间中，像这样e.movementX直接使用。需要加上前缀。

以下是一个简单的Demo：

    (function ($, undefined) {
        var mouse = {
            x: -1,
            y: -1
        };
        document.addEventListener('pointerlockchange', change, false);
        document.addEventListener('mozpointerlockchange', change, false);
        document.addEventListener('webkitpointerlockchange', change, false);
        $("#canvas").click(function () {
            var canvas = $("#canvas").get()[0];
            canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock 
            || canvas.oRequestPointerLock || canvas.msRequestPointerLock;
            canvas.requestPointerLock();
        });

        function change(e) {
            var canvas = $("#canvas").get()[0];
            if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas || document.webkitPointerLockElement === canvas) {
                document.addEventListener("mousemove", move, false);
            } else {
                document.removeEventListener("mousemove", move, false);
                mouse = {
                    x: -1,
                    y: -1
                };
            }
        };

        function move(e) {
            var canvas = $("#canvas").get()[0];
            var ctx = canvas.getContext('2d');
            if (mouse.x == -1) {
                mouse = _position(canvas, e);
            }
            var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
            var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
            mouse.x = mouse.x + movementX;
            mouse.y = mouse.y + movementY;
            if (mouse.x > $('#canvas').width() - 50) {
                mouse.x = $('#canvas').width() - 50;
            } else if (mouse.x < 0) {
                mouse.x = 0;
            }
            if (mouse.y > $('#canvas').height() - 50) {
                mouse.y = $('#canvas').height() - 50;
            } else if (mouse.y < 0) {
                mouse.y = 0;
            }
            ctx.clearRect(0, 0, 400, 400);
            _show(mouse.x, mouse.y, ctx);
        }

        function _position(canvas, event) {
            var x, y;
            if (event.x != undefined && event.y != undefined) {
                x = event.x;
                y = event.y;
            } else {
                x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            x -= canvas.offsetLeft;
            y -= canvas.offsetTop;
            return {
                x: x,
                y: y
            };
        }

        function _show(_x, _y, _ctx) {
            _ctx.fillStyle = 'red';
            _ctx.fillRect(0, 0, _x, _y);
        }
    })(jQuery);


[Fiddle Demo](http://jsfiddle.net/tyrantchiong/NUTt8/2/ "Fiddle Demo")