---
layout: post
title: 键盘事件的KeyCode分析
tags: [Javascript,event,which,keycode,charcode,unicode,事件]
category: Tech
---

## keyup和keydown事件以及keyCode和which属性 ##

我想关于键盘事件最常见的实例就是回车提交表单了，恐怕每个前端都有一段烂熟于胸的代码用来实现这个功能。以前我也只是做了这样一个功能，也许它的代码是这样的：

    function enter (p_event) {
        var _keyCode = p_event.which ? p_event.which : p_event.keyCode;
        var _ENTER_CODE = 13;
        if (_ENTER_CODE === _keyCode) {
            //enter code...
        }
    }

如果需要兼容ie8及以下，那还需要这几行代码：

    if (typeof p_event === 'undefined') {
        p_event = window.event;
    }

当然，enter还需要绑定到一个键盘事件中，键盘事件有三种，我以前倾向于使用keyup [1]，这样的体验比较好，符合人的习惯，在松开按键的时候生效。不过有时候keydown也是很棒的选择，比如说用户希望可以快速触发时，比如游戏中，我还记得WOW有一款插件是专门修改为按下触发技能的。
<!-- more -->
    document.getElementById('enter_input').onkeyup = enter;

---

也许enter回车这样没问题，但其他按键呢？于是我做了一组测试，发现了一些问题

在keyup和keydown事件中：

* IE只有keyCode，which为undefined。
* Firefox的which有值，而keyCode为0，但F1-12键则恰好相反，which为0，keyCode有值。
* Chrome和Opare中which和keyCode都有值。

按键码的一些差异：

* 在IE、Safari中和Chrome、Firefox、Opare中存在差异。
* ‘+ =’键是187 => 61。
* ‘; :’键是186 => 59。
* ‘- _’键是189 => 45, Opera很诡异的是109。
* win键只有IE8和Safari是91，Opera是219，其他无法触发。
* Meta [2] 键是93，但Opera和Chrome无法触发

## keypress事件和charCode属性 ##

这里其实有一个很重要但很多人都没搞清楚过的问题，那就是另外一个事件keypress，这个事情是怎么回事？曾经我只是单纯的认为它和keydown是一样的，因为它们在按下键盘后都会一直触发直到松开。而且w3school中文上的说法是

>onkeypress 事件会在键盘按键被按下并释放一个键时发生

不过最近看到了一个属性charCode，让我初步认识到了区别所在，似乎w3school的说法不太对。起初我以为charCode和keyCode还有which是不同浏览器实现的不同名称，但似乎charCode是mozila弄出来的一个东西，那就应该和其他2个有什么区别，因此我决定好好实验一番，来分析一下这些事件与属性究竟是怎么回事。

首先在我认为最强大的Chrome中测试了一下，只有在keypress事件中，charCode才有值，而在keyup和keydown中都为0，另外我发现小键盘区域大部分按键是无法触发keypress的，还有win键、ctrl、alt、meta等都无法触发。

---

经过上面的测试，我大概发现了keypress的意义，**keypress只有按下可产出字符的按键时才会触发**，也因此keypress才能使用charCode，charCode的意义也很明显了，是**按键的字符的代码**，而不是keyCode或者which按键代码的意思。

为了进一步检验我的理解，我试验了space、enter都有charCode值，而小键盘在点亮了Num Lock之后也有了charCode，并且按住shift或者切换Caps Lock后，charCode会发生变化也足以证明charCode是字符的unicode值，比如按下“A”时，会有小写和大写的65、97之分。

---

另外关于浏览器的兼容性：

* IE8及以下和Opera12+是不支持charCode属性的。
* 而在Firefox中，keypress事件触发时keyCode是没有值的。

可以用以下代码试验。

    document.body.onkeypress = function (p_event) {
        p_event = p_event ? p_event : event;
        alert('charCode is ' + p_event.charCode);
    }

如果在测试的过程中回车之类的按键触发了某些浏览器行为，可以这样避免，在事件方法的最后加上这行代码：

    e.preventDefault ? e.preventDefault() : event.returnValue = false;

---

关于标准，在W3C标准中，其实无论是which、keyCode还是charCode都已经不推荐使用了，取而代之的是which和keyCode为key，charCode为char。不过遗憾的是目前所有浏览器都还没有实现key和char。

---

> 注1：不过IE6是不支持keyup的，只能用keydown。
> 注2：meta按键就是一般在win键旁边的一个鼠标+一个菜单样式的按键，按键一般是用来弹出鼠标右键菜单的。

---

参考文章：

* [Key codes of keydown and keyup events](http://www.javascripter.net/faq/keycodes.htm)
* [Mozilla - keypress](https://developer.mozilla.org/en-US/docs/Web/Reference/Events/keypress)
* [W3C Standard](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-keypress)
* [MSDN - charCode property](http://msdn.microsoft.com/en-us/library/ie/ff974890)


