---
layout: post
title: 推荐一些图片工具
tags: [tool,recommend,image,图片,工具]
category: Tech
---

上周介绍了几种配色工具，这次要介绍的是一些图片和图标的生成工具。

就算你熟练掌握Photoshop之类的图片处理工具，要制作一个小小的图标还是挺费时费力的。可是网上下载的话，颜色尺寸又不一定能适合，所以制作图片的工具将是非常必要的。

### [Online Generator](http://onlinegenerator.net/) ###

[![](http://onlinegenerator.net/images/preloaders.png)](http://preloaders.net/)

Online Generator包括好几个很棒的工具，首先是Preloaders，它用于制作loading图片，它的图片种类很齐全，还有大量的3D图片，最重要的是它可以任意改变尺寸，当然也包括颜色，动画。动画可以选择方向频率等等，功能十分强大，基本上只要你能找到喜欢的图案，它就一定能制作出你想要的loading图片。
<!-- more -->
[![](http://onlinegenerator.net/images/iconizer.png)](http://iconizer.net/)

Iconizer是一个icon搜索制作工具，只要输入关键字，比如home，就会出现海量的类似图标，然后选一个就可以继续定制颜色尺寸等相关信息，然后下载你要的图标或者先存起来，之后再打包下载。

[![](http://onlinegenerator.net/images/cssload.png)](http://cssload.net/)

这样还要加载图片，是不是觉得有点烦，其实还有更简单的办法，只要你忽略ie8一下浏览器就行了，用CSS的animation实现loading动画。不会写？懒的写？好吧，那只有用CSSloader了，虽然样式有限，但是选择颜色尺寸后你就可以复制代码了。

### [IconBench](http://iconbench.com/) ###
![](http://iconbench.com/Content/Images/iconbench.png)

上面提到的iconizer虽然有海量图标，但是每种图标风格迥异，不能成套怎么办，iconizer就可以解决这个问题。它的选择过程是反的，先选颜色尺寸等属性，再选样式，然后打包下载，还有css sprite图片和css代码。其属性也很丰富，包括内外阴影，渐变颜色，描边，未来还会添加特殊效果。而样式也是非常丰富，基本涵盖了所有用途，一共5套免费的，1套收费的，每套都有上百种样式。

### [ProjectFondue](http://blog.projectfondue.com/) ###
[CSS Sprite Generator](http://spritegen.website-performance.org/)

Iconbench很贴心的把图标制作成css精灵图片是不是很好？可是如果有自己的图片需要制作时，这个CSS Sprite Generator就帮得上忙了。最强大也最无聊的是这玩意支持十几种语言。将要制作CSS精灵的图片打包成zip，然后上传，最大1Mb。你还可以选择移除相同的图片，当然还是尺寸、比例、每个图片的尺寸颜色质量等等。另外css代码也有一些配置信息，比如前缀之类的。然后点生成就可以了，非常方便。

[Favicon Generator](http://favicon-generator.org/)

这个工具的作用只有一个，每个网站都需要一个favorite.ico的文件，你不知道？就是打开网站后浏览器标签上面的小图标还有书签里的图标。因为必须是ico格式的，所以比较特殊，photoshop也歇菜了，用处虽然不大，但是非常必须。首先上传一个gif、png或者jpg格式的图片，然后最强大的地方是可以在线编辑，最后提交即可下载ico文件。

另外projectfondue还很奇葩的提供了一个unix权限计算工具，和另外2个工具好像没什么联系，大概他们的团队也只是顺便开发了这些工具（偷笑）。

### [Base64-Image](http://www.base64-image.de/) ###
![](http://www.base64-image.de/img/layout/logo.png)

Base64是一种对称加密方式，就是说可以加也可以解，而标准浏览器已经实现了对base64图片的读取，也就是说一段字符可以代替一个图片了。这个工具自然就是把图片转换成base64码的，上传图片获取代码，不用说很简单。

### [Fontello](http://fontello.com/) ###

是不是觉得base64很高端了，别急，还有更geek的玩意。像github一样的icon，就是用字体做图标。这个fontello拥有海量的字体图标，选择一些图标，然后选择尺寸，最大只有30px。然后下载，这个压缩包里包含了各种格式的字体（woff、tff、svg、eot），还有css代码，包括兼容性问题，还有可能包括动画。甚至还有一个demo的html文件。

### [Smush](http://www.smushit.com/) ###

这些工具应该已经足够用了，不过如果你还想精益求精的话，Smush可以帮你将图片文件优化，在保证质量的情况下降低文件大小。使用很简单，上传或者输入url，下载图片压缩包。它还会显示容量优化的比率。这是yahoo的一个工具。

### [PhotoRaster](http://photoraster.com/) ###

这是一个在线的photoshop，如果以上这些工具都满足不了你，那这个工具一定能让你满意。不过说实在的，除了临时没有装photoshop需要用这个，一般谁会用呢，无论功能和性能，肯定都是不如photoshop的。

