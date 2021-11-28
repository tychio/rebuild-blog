---
layout: post
title: Stylus使用指南
tags: [css,stylus,sass,less]
category: Tech
---

![Stylus Logo](/images/stylus.jpg)
Stylus似乎并不是很有名，以至于很多人不知道它是做什么的，但提到SASS相信有不少人听说过甚至使用过很长时间。其实无论是LESS、SASS还是Stylus甚至是Absurd这些预处理工具，都是对CSS的一种延伸和强化。出现这些工具的原因很简单，CSS本身只是一种描述性质的东西，甚至它不能算是语言而是样式表，所以我们需要一个有条件语句和变量甚至是函数的东西去动态生成CSS代码来达到提高效率和增强可维护性的目的。

本文主要以Stylus语法本身和简单的使用为主要内容，它的目的是介绍和简单指南。将不会过多涉及Javascript的API调用等问题。

### 介绍 ###

官方的介绍非常简短而精炼：

>Expressive, dynamic, robust CSS

<!-- more -->
富有表现力的动态的强壮的CSS，它反应了一些主要特点。

首先Stylus相较于SASS更加简洁，甚至冒号也都可以省略，初学Stylus时感到它太神奇了，仅仅以空格分隔属性名和多个属性值就可以生成想要的CSS，而且还可以拼接字符串等等。与此同时，类似Ruby或Python完善的缩进语法，Stylus在简约自由中有效的防止了语法歧义。

```
body
  border 10px*.1 soli+'d' darken(red,10%)

// =>
body {
    border: 1px solid #e60000;
}
```

其次是动态，这正是其精髓所在，Stylus由Javascript编译，其结构语句也和Javascript相差不多，前端人员可以很轻松的上手。虽然这方面Absurd是一个极端，但Stylus较之LESS则要优越不少，不仅仅是可定义变量，如Javascript般的条件语句和循环语句也为Stylus带来各种可能，加上丰富的内置函数，可以轻松判断和操作各种变量。而利用这样的动态性，就可以写出非常强壮的CSS以满足不同环境和条件下的需要。

```
pos(type, args)
  i = 0
  position unquote(type)
  {args[i]} args[i + 1] is a 'unit' ? args[i += 1] : 0
  {args[i += 1]} args[i + 1] is a 'unit' ? args[i += 1] : 0

absolute()
  pos('absolute', arguments)
fixed()
  pos('fixed', arguments)

#prompt
  absolute top 150px left 5px
  width 200px
  margin-left -(@width / 2)
#logo
  fixed top left

// =>
#prompt {
  position: absolute;
  top: 150px;
  left: 5px;
  width: 200px;
  margin-left: -100px;
}
#logo {
  position: fixed;
  top: 0;
  left: 0;
}
```

### 简单指南 ###

可以看到上面的代码中使用了Mixin（混合）还有三目运算符等手段构建了一个针对position的方法，用来快速生成一个定位代码片段。有底向上来看这段代码，#prompt和#logo是2个ID选择器，在其中调用了一些Mixin，其实Mixin与Function的区别在于，Mixin的内容是一段CSS代码，而Function应该是一个值并自动返回，所以调用它们的时候，前者将会替换为一段CSS，而后者将返回一个Boolean或者像素或者颜色之类的东西，也许用于判断也许直接放入CSS。然后其中的absolute和fixed分别调用了pos这个Mixin。

##### 前缀 ######

而且在调用时，也不一定要使用括号的形式，可以使用CSS的形式，直接Mixin名加空格然后写参数。所以有时候可以直接写一个Mixin来修改CSS属性的功能，比如看看下面这个兼容所有标准浏览器阴影的写法，可以很方便的为标准调用加上各标准浏览器的前缀：

```
box-shadow()
  -webkit-box-shadow arguments
  -moz-box-shadow arguments
  -ms-box-shadow arguments
  -o-box-shadow arguments
  box-shadow arguments
box-shadow 2px 1px 10px red

// =>
-webkit-box-shadow: 2px 1px 10px #f00;
-moz-box-shadow: 2px 1px 10px #f00;
-ms-box-shadow: 2px 1px 10px #f00;
-o-box-shadow: 2px 1px 10px #f00;
box-shadow: 2px 1px 10px #f00;
```
可以看到调用时的写法与一般的写法一样，但是因为Mixin的存在，box-shadow不再是一个属性，可以变成5行带有各浏览器前缀的CSS。不仅仅是box-shadow，CSS3的许多属性都需要添加前缀，那是不是可以更近一步呢，来写一个前缀Mixin吧：

```
// add prefix for attribute
prefix(p_attr, argu...)
  $pfs = webkit moz ms o
  for $pf in $pfs
    -{$pf}-{p_attr} argu
  {p_attr} argu
// box shadow mixin
box-shadow()
  prefix(box-shadow, arguments)
// run
box-shadow 2px 1px 10px red
```

##### 颜色 #####

如同其他CSS预处理工具一样，Stylus在颜色方面也拥有许多内置函数，无论是判断，提取还是修改都十分强大。函数 `red` , `blue` , `green` , `alpha` 将分别返回颜色对应的rgba值，`dark` 和 `light` 用于判断颜色属于亮色还是暗色，`hue` , `saturation` , `lightness` 则分别返回颜色的色相、饱和度以及亮度，其中色相是在色环上的角度，单位是deg。我经常用的是`lighten` 和 `darken` 这两个函数，其作用是增加或减少一个颜色的亮度，另外还有饱和度的操作函数 `desaturate` 和 `satucate`。

似乎没有用于修改色相的函数，不过这个需求很容易通过其他办法搞定。首先使用hue等函数将原始色的色相、饱和度、亮度以及透明度取出，然后对色相的角度进行修改，比如加90deg，最后再使用hsla函数，把去除的对应值当作参数传入即可。下面用一组三态按钮来举个栗子：

<p data-height="300" data-theme-id="1870" data-slug-hash="CKrwL" data-user="tychio" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/tychio/pen/CKrwL'>Single Button</a> by Zhang zhengzheng (<a href='http://codepen.io/tychio'>@tychio</a>) on <a href='http://codepen.io'>CodePen</a></p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

可以看到Stylus中的第一行代码 `$clr = #99ff22` 只要修改这个颜色值就可以改变按钮的整体风格，并无需考虑hover和active状态时对应的颜色。比如边框使用 `darken` 来加深，阴影泛光可以使用 `lighten` 来加亮，在触碰时整体使用了 `saturate` 来改变饱和度，按下的Active状态我使用了 `invert` 函数，可以翻转颜色，在视觉设计中这个颜色叫做对位色，即色相处于色环的对面的两种颜色，比如绿对红，黄对蓝，例子中使用了黄绿，所以对位色就是紫色。当然也可以使用上面提到的复杂一些的方法来修改色相，达到使用间隔色之类的效果。

##### 响应式 #####

对于响应式的支持，Stylus的media也可以省略花括号，但和Sass有一些区别。Stylus在@media的括号中会原样输出，也就是说，我们不能使用变量或混合还有计算等手段来直接写media query。比如一般情况下需要写一个min-width，如果这样写

```
$mobiWidth = 768px
@media screen and (min-width $mobiWidth - 1px)
  body
    margin 0
```

产生的CSS代码则仍然是

```
@media screen and (min-width $mobiWidth - 1px) {
  body {
    margin: 0;
  }
}
```

这不是一个bug，尽管在Github上有无数的人提出issue或者在其后+1，作者仍然不为所动，原因不明，不过幸运地是有很多人都提出解决办法，下面是一个比较好的方法：

```
media()
  join(' and ', arguments)
$mobiWidth = 768px
$media = media('screen', '(min-width: ' + ($mobiWidth - 1px) + ')')
@media $media
  body
    margin 0

/// =>

@media screen and (min-width: 767px) {
  body {
    margin: 0;
  }
}
```
这样就可以使用变量来作为media的参数了，只是写起来会比sass麻烦一些，但我觉得这样也许更自由，你可以改进这个方法，比如传一个object来作为query条件，而不是拼接一个字符串。另外这个方法还用到了 `join` 内置函数，和Javascript中的Array方法join一样，很容易使用，除了它还有 `push` , `unshift` 函数。

关于数组的定义，对于响应式来说有非常好的帮助，因为响应式往往是一系列的尺寸或设备，无论如何，使用数组可以轻松的定义多组对应与索引的配套值。比如我的blog，对于不同宽度的设备中有不同的内容宽度以及边距，来看看简化的代码：

```
$screen = 1920px 1280px 1024px 768px 640px 320px
$width = 1600px 1080px 840px 600px 480px 300px
$margin = 180px 100px 80px 40px 20px 0
media()
  join(' and ', arguments)
responsive(p_index)
  body
    width $width[p_index]
    margin-left $margin[p_index]
responsive(0)
for $i in 0 1 2 3 4 5
  $media = media('screen', '(max-width: ' + $screen[$i] + ')')
  @media $media
      responsive($i)

// =>
body {
  width: 1600px;
  margin-left: 180px;
}
@media screen and (max-width: 1920px) {
  body {
    width: 1600px;
    margin-left: 180px;
  }
}
// ...
@media screen and (max-width: 320px) {
  body {
    width: 300px;
    margin-left: 0;
  }
}

```

当然响应式不是简单的改变尺寸，如果你需要控制某些内容的显示则可以使用一个Boolean的数组来判断是否显示，控制结构或样式则可以字符串的数组来放置一些预先写好的Mixin名称。

##### CSS Sprite #####

对于CSS Sprite相信是所有切图者的主要工作产出，以前我也推荐过一些在线的制作Sprite的工具，不过现在有了Stylus，也许我们可能更快的完成这一切。之前公司有需要国旗icon，所以做了这个小项目[national_flag](https://github.com/tychio/national_flag)用来创建和维护国旗icon的CSS Sprite。由于国家数目众多，每个国家对应一个国家代码，所以我定义了一个二维数组用来表现图片中国旗的位置，然后在数组中填入代码，用来拼接图标的class名称，然后按照数组中的序号和尺寸就可以生成对应的background-position了。主要代码如下：

```
iconBuild(id, col, row)
    .country-{id}
        background-position (0px - (row * $size)) (0px - (col * $size))
/*r /c-> 00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16*/
$row00 = CN AF AZ BH BD BN KH TL IN ID IR IQ IL JP JO KZ KW
$row01 = KG LA LB MY MV MN MM NP KP OM PK PS PH QA SA SG KR
$row02 = LK SY TJ TH TM AE UZ VN YE DZ AO BJ BW BF BI CM CV
$row03 = CF RO KM CG CI CD DJ EG GQ ER ET GA GH GN GW KE LS
$row04 = LR __ MG MW ML MR MU MA MZ NA NE NG RW ST SN SC SL
$row05 = SO ZA SD __ TZ __ TG TN UG ZM ZW __ __ __ __ __ __
$row06 = JM PR DO KN VC LC TT CR __ SV GT HN NI PA __ DE __
$row07 = MK AT __ __ __ BG CY __ __ DK SK SI ES EE FI FR __
$row08 = GR HU IE IS IT LV LI LT LU MT MD MC ME NO NL PL PT
$row09 = UK CZ __ RU SM __ SE CH TR UA EU __ CA __ MX __ US
$row10 = AR BO BR CL CO EC GY __ __ PE __ UY VE HK LY NZ RS
$row11 = PY AU SR TJ FM AI __ __ __ __ __ __ __ __ __ __ __
$pos = $row00 $row01 $row02 $row03 $row04 $row05 $row06 $row07 $row08 $row09 $row10 $row11
for $rowList, $row in $pos
    for $country, $col in $rowList
        if $country != __
            iconBuild($country, $row, $col)
```
其中for不同于Javascript，rowList为数组遍历出的一个元素，而$row为索引，可以这样理解 `for [value], [index] in [array]` 。所以可以在两个嵌套的for中获取纵横的位置以及国家代码，来生成CSS。

### Stylue应用 ###

作为预处理工具，Stylus自然也需要预处理器，不过它不像Sass需要Ruby环境，Stylus由Javascript实现，所以有Javascript就可以处理Stylus。

##### 编译工具 #####

* [SublimeText2-Stylus2CSS](https://github.com/edmundask/SublimeText2-Stylus2CSS)是一款SublimeText2的Stylus插件。另外我使用[这个项目](https://github.com/billymoon/Stylus)的SublimeText2插件来高亮styl文件的代码。
* 另外今年8月WebStorm7也才刚刚支持 - [Stylus Support](http://blog.jetbrains.com/webstorm/2013/08/webstorm-7-eap-130-1630-stylus-support/)。
* [CodePen](http://codepen.io/)支持各种CSS预处理，自然包括Stylus，上面的按钮例子就是嵌入的CodePen。
* [Stylus官方在线](http://learnboost.github.io/stylus/try.html)其实是一些示例，不过它是可编辑的，所以你也可以随便写些什么，即时可以看到结果。不过好像还在使用低版本的Stylus，比如一些内置函数就不可用。

##### Grunt插件 #####

不过说到处理文件，Grunt还是我的最爱，尤其Stylus是由Javascript实现，在Nodejs中自然是得天独厚。npmjs上有许多用来处理Stylus的插件，下面简单介绍一下Grunt的官方Stylus插件[grunt-contrib-stylus](https://npmjs.org/package/grunt-contrib-stylus)。先来看看最简单的配置方法：

```
stylus: {
  compile: {
    files: {
      'path/to/result.css': 'path/to/source.styl'
    }
  }
}
```
如此就可以利用Grunt将source.styl文件中的Stylus代码编译为result.css的CSS代码。当然还可以使用数组来进行多个Stylus文件的打包编译。当然不仅于此，先来看看主要的几个配置项：

`paths` 将自动使用@import来引入一些Stylus文件，比如一些Mixin集合，放在一个Stylus文件中进行维护，写在paths中后，就可以在每个Stylus文件中调用它们。`define` 可以定义一些全局变量，然后在Stylus中使用，但我不喜欢使用这个配置，而是更喜欢把全局变量放在一个单独的Stylus文件中，然后将这个文件加入paths的数组中。一句话，把所有不会直接产出CSS的Stylus代码分成若干个Stylus文件，然后全部添加到paths中，这样在所有Stylus文件中都可以随时调用了，但要注意这些Stylus文件的调用关系和使用先后顺序。

`compress` 及 `linenos` 是两个Boolean值，用来控制是否压缩处理后的CSS代码以及是否在CSS代码中保留注释。

`banner` 是一个字符串，会被放置在CSS文件的最前面，一般我用来写注释，比如

```
banner: '\/** \n * <%= pkg.name %> - <%= pkg.description %>\n * version <%= pkg.version %> \n * author <%= pkg.author %> \n * date <%= grunt.template.today() %> \n**/\n'
```

`firebug` 将控制是否使用一个Firebug的Stylus插件[FireStylus for Firebug](https://addons.mozilla.org/en-US/firefox/addon/firestylus-for-firebug/)，可以在Firefox中调试Stylus。

`use` 可以引入一些Stylus的其他grunt插件。

配合watch等Grunt插件就可以达到自动化的Stylus开发，写样式将会非常有效率。

### 总结 ###

Stylus是一个由Javascript实现的CSS预处理工具，文件后缀为styl，其拥有变量、函数、混合、条件及循环语句等功能，还有丰富的内置函数用于处理颜色、数字、数组等数据。在grunt的辅助下，Stylus将带来极大的开发效率。

我还在[slides](http://slid.es)上制作了一个[Stylus简介的幻灯片](http://slid.es/tychio/stylus)，还没有经过实践，可能内容有些空泛，不过将持续改进。