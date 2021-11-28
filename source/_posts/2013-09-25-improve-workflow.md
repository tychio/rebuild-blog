---
layout: post
title: 改进我的Workflow
tags: [workflow,grunt,bower,sublime text,chrome,github,git,node]
category: Tech
---

有人说过程序员和码农的本质区别就是程序员会不断探索提高生产力的方法。思维模式的转变是提高生产力的最好方式，但打磨我们的工具也是十分有意义的事，本文将从开发环境，自动化开发，开发工具等几个方面针对前端开发效率的提升和代码质量的提高来展开讨论。

每件事都是一个程序，开发也像程序一样，每个步骤都是一段代码，当开发规模随着文档、代码、需求而增加时，重复的步骤变得越来越多。此时，如果可以像抽象代码一样抽象出一些相同操作就可以大大提升开发效率。因此，出现了更多更优质的工具来代替人工做一些不断重复的开发以减少程序员的工作量。
<!-- more -->
### 开发环境 ###

##### Nodejs #####

首先，需要搭建一个自动化高效率的开发环境。以前我们有shell、java、ruby来进行一些自动化脚本的执行。但自从Nodejs将Javascript带入了服务器，Front End开发环境也发生了翻天覆地的变化。Nodejs不仅仅可以让Jser开发服务端，还让Javascript成为了服务器脚本语言之一，可以用于文件的操作。

安装Nodejs的方法目前来说很简单，[点这里下载安装包](http://nodejs.org/download/)，选择对应的平台的安装包即可。不过不得不说的是Source Code包，这是源码需要编译，虽然由C++写成，但gyp进行管理，所以编译时需要Python2.6+和C++编译器一起工作。通过命令 `node -v` 来检验是否安装成功，成功则返回当前版本号。

另外Nodejs还有一样必备的工具npm，就像ruby中的gem一样，是一个Nodejs的包管理器，可以为Nodejs添加一些包。npm的安装非常简单[1]，可以说不用安装，在Linux下只有一行命令： `make install` 
, 而Windows和Mac都默认带有npm。当然如果想专门安装npm也是可以的，Linux下仍然是一行代码：

    curl https://npmjs.org/install.sh | sudo sh

而Windows会稍微麻烦一点，在[https://npmjs.org/dist/](https://npmjs.org/dist/)下载源码，然后放到和node.exe一个文件夹下即可。

使用npm来安装一些包很简单，使用这样的命令 `npm install <package_name>` ，一般来说会默认安装在当前目录中。但如果使用参数 `-g` 就可以安装在全局。另外通过在项目中添加一个 `package.json` 文件，就可以定义项目依赖的Nodejs包，然后直接在该目录中执行 `npm install` 指令就会将package文件指定的包全部安装在当前目录。

##### Shell #####

不管是Linux还是Mac都天然的拥有Shell环境，但是Windows中的CMD是无法和Shell相提并论的，而且很多开发工具也需要Shell环境。

还好Windows中有MSYS[2]，全称是Minimal GNU（POSIX）system on Windows，它是一个GNU工具集，包括了bash，make，gawk和grep。可以直接下载 

[http://www.mingw.org/wiki/MSYS](http://www.mingw.org/wiki/MSYS)

如果需要整个Unix环境和C的库的话，还需要minGW。也可以直接安装Git Bash工具，会附带有这个，这样环境和Git就会一起装好。

[http://git-scm.com/downloads](http://git-scm.com/downloads)

另外在Windows中使用Shell时，有几点需要注意。文件路径的根目录为Git Bash的文件根路径，但是可以使用斜杠和盘符代表Windows的磁盘，比如进入D盘下的workspace文件夹就这样：

    $ cd /d/workspace/

而Windows特有的文件夹名称中带有空格的问题可以通过两个方法解决。

    $ mkdir /c/"work space"
    $ rmdir /c/work\ space

用引号括起来带有空格的文件名或者使用反斜杠来转义空格。

##### Git #####

Git的安装很分散[12]，每种平台都不一样，Linux中也分为两种使用yum或者apt-get来安装：

    // as Fedora
    $ yum install git-core
    // as Ubuntu
    $ apt-get install git

Mac上是最简单的，在这里安装[http://code.google.com/p/git-osx-installer](http://code.google.com/p/git-osx-installer)

Windows也很方便，因为有了[Msysgit](http://msysgit.github.com/)，也一样直接安装。

##### 编辑器 #####

编辑器是每个程序员最常用的工具，它在很大程度上决定了单纯Coding的效率。原来有人将Vim和Emacs奉为上古神器，不过我喜欢新的东西，SublimeText是目前编辑器中的新贵，拥有海量插件，使用Python编写，配置和操作都非常方便。可以到这里下载：

* [SublimeText2](http://www.sublimetext.com/)

现在第3版正在进行beta测试，但是由于升级为Python3，原来的插件都因为API更新的问题而无法使用了，相信在正式版发布后插件将会陆续升级。这是第三版的下载地址，不会覆盖第二版。

* [SublimeText3](http://www.sublimetext.com/3)

此外，虽然它是付费软件，不过作者好像从来不怕没有人付费，如果没有注册仅仅会偶尔在保存时弹出Lisence声明，但确认会弹出官方页面，点取消即可。好像还有破解版本的出现，不过作者已经这么大度了，用破解版好像有点说不过去。国内曾经还有人组织过团购，但是作者表示不存在团购一说，只有公司批量购买，最终只有不了了之，售价$70。

##### 浏览器 #####

作为前端最基本的环境，浏览器是必不可少的。Chrome是我最喜欢的浏览器，因为它的快速高效以及很棒的开发者工具。虽然Firefox也是一款出色的浏览器，但Firebug作为一款插件，效率总是差那么一点，当然Firefox现在也推出了自己的调试工具。用于测试的IE浏览器也是常备工具之一，此外还有Opera和Safari。

Chrome和Firefox很强大的一个原因就是，它们对W3C的标准都很快速的支持，许多最新的特性都可以体现在最新版的Chrome以及Firefox中。特别需要一说的是，它们都有一个每日更新的版本，用户可以体验到最新的功能，而浏览器厂商可以获取崩溃信息等反馈来提高品质。Chrome的每日更新版叫[Chrome Canary](https://www.google.com/intl/zh-CN/chrome/browser/canary.html),Firefox的比较直接，[Firefox Nightly](http://nightly.mozilla.org/)。

还有一款很神奇的浏览器，它不会渲染，也没有界面，基于Webkit内核，它叫[PlantomJS](http://phantomjs.org/index.html)，图标的幽灵和名字都突出了这一特点。也许看起来没什么用，但在测试或者做研究时，浏览器不厌其烦的弹出来时，它就有大用处了。

### 自动化开发 ###

##### Yeoman #####

Yeoman按照官方说法[3]，它不只是一个工具，还是一个工作流。它其实包括了三个部分yo、grunt、bower，分别用于项目的启动、文件操作、包管理。但我并不太认同这是一个工作流的说法，至少目前来看还不够成熟，在真实的生产环境中会遇到许多问题。而未来的可能性大致应该有两条路可走，也许会产生某些工作流的标准来定义前端开发的软件质量，不过我更认为Yeoman应该走向高可定制的工作流工具的方向，而不是自身作为一个工作流来存在。

###### Yo ######

Yo是一个项目初始化工具，可以生成一套启动某类项目必须的项目文件。可以通过npm安装它到全局：

    npm install -g yo

然后还需要安装一些generator，这是一个用于创建某个指定类型项目的生成器。比如安装一个最常用的webapp的生成器，然后就可以在项目路径下生成项目启动需要的所有文件，像这样：

    npm install -g generator-webapp
    cd /project_folder/
    yo webapp

但是这种机制有一个很严重的问题，generator产生的文件结构是谁制定的？没有一个官方的相应的标准或者说Guide，generator的形式参差不齐，甚至我发现Firefox OS的generator生成的是一个API接口的Demo而不是一个种子，如果要进行开发需要进行很多删减。

不过产生这些generator的generator[4]却是一个很好的工具，它应该是一个创造性的工具。首先需要安装generator-generator，然后使用它，接着会看到字符拼接的yeoman，像这样：

    npm install -g yo generator-generator
    $ mkdir ~/dev/generator-blog && cd $_
    $ yo generator

        _-----_
       |       |
       |--(o)--|   .--------------------------.
      `---------´  |    Welcome to Yeoman,    |
       ( _´U`_ )   |   ladies and gentlemen!  |
       /___A___\   '__________________________'
        |  ~  |
      __'.___.'__
    ´   `  |° ´ Y `

当然使用它之前应该将写好的项目文件放入 `app/templates` 文件夹中，并在 `templates` 同级的路径中加入 `index.js` 进行配置就可以了。这里的index.js是运行在Nodejs中的，也就是说由它将templates中的项目文件放入该放的地方并且填入一些变量去构建整个项目。这里才是体现一个generator是否是一个好的generator的地方，如果仅仅是将一堆写好的项目文件下载下来那什么意义也没有，不存在万用种子。只有在使用generator生成项目时高度定制才是其意义所在，而相关标准才是最难的部分。

##### Bower #####

Bower是一个类似于npm的包管理器，但不同的是Bower主要针对前端，并且直接从Github查找需要的库下载到本地缓存。使用很简单，用npm安装bower后可以安装Github的项目并指定版本号，还可以重命名。默认会下载到项目中的 `bower_components` 文件夹中。[5]

    npm install -g bower
    bower install jQuery
    bower install jQuery#1.10.3
    bower install jQueryOld=jQuery#1.6.4

还可以通过bower.json文件来配置需要安装的包，使用 `bower init` 命令就可以生成bower.json文件，然后在其中写入需要的包及其版本即可

    {
      "name": "my_project",
      "version": "0.1.0",
      "main": [js/js.js, css/css.css],
      "ignore": [
        ".jshintrc",
        "**/*.txt"
      ],
      "dependencies": {
        "<name>": "<version>",
        "<name>": "<folder>",
        "<name>": "<package>"
      },
      "devDependencies": {
        "<test-framework-name>": "<version>"
      }
    }

当然它也可以搜索包，像这样搜索一下jquery。

    bower search jquery

如果觉得bower_components的文件夹名太长不好，可以在 `.bowerrc` 中以json的形式修改它的路径

    {
      "directory": "lib"
    }

还有许多其他的配置，可以在Bower存放在Google Doc的文档[7]中查看。

但是Bower还有一个Bug[6]，jQuery在Github上的项目文件是分模块的，必须使用项目中的Grunt才能打包成jquery.js文件，而官方的说法是使用小写q的 `jquery` 来获取components项目中的jquery文件，但是目前Bower是大小写不分的，所以无法获取独立的jQuery文件。如果bower可以指定获取某个项目中的某个或某些指定的文件将会更加犀利。

甚至Bower可以在Nodejs中运行一个 `bower.commands` 文件来让你编写安装各种包的node程序，并且可以监听 `end` 事件在安装结束后进行操作，这是异步的，这样就可以随心所欲的安装包和控制顺序了。

    var bower = require('bower');
    bower.commands
        .install(['jquery'], { save: true }, { /* custom config */ })
        .on('end', function (installed) {
            console.log(installed);
    });

##### Grunt #####

Grunt目前来说是这三个Yeoman中最成熟最强大的，最关键的是Grunt有各种各样的插件，可以集成大部分能想得到的开发工具来进行自动化开发。另外Grunt的作者还开发了一整套的插件来适应常规的开发，这套插件以 `grunt-contrib-` 为前缀（下文中如无特殊说明，均指带有该前缀的插件名），除了文件的基本操作，还包括有测试、编译、压缩、代码检查等各种功能的插件，而且不止一个选择。

安装Grunt和Bower不太一样[8]，需要先在全局安装一个Grunt的客户端，然后在每个项目中安装Grunt。

    npm install -g grunt-cli
    cd /project/
    npm install grunt

不过和Bower相似的是，可以通过编写配置json文件来使用 `npm install` 来安装Grunt和所有需要的插件，另外Grunt的插件也都是npm管理的，所以可以直接在 `package.json` 中直接编写。

    {
        "name": "myProject",
        "version": "0.1.0",
        "devDependencies": {
            "grunt": "*",
            // other plugin...
            "grunt-contrib-watch": "*"
        }
    }

安装完成后在项目根目录中建立 `Gruntfile.js` 文件来配置Grunt的工作流程。下面以 `copy` 插件为例使用Grunt进行开发。在 `exports` 中Grunt会以参数形式被传入函数，它有3个方法， `initConfig` 、 `loadNpmTasks` 、 `registerTask`，分别用来定义插件操作，载入插件，注册任务。

    module.exports = function (grunt) {
        grunt.initConfig({
            copy: {
                main: {
                    files: {
                        src: ['path/**'], 
                        dest: 'dest/'
                    }
                }
            }
        });
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.registerTask('default', ['copy']);
    };

在配置中以插件名为键定义一个Object作为该插件的配置，其中还可以再定义一层以任务名为键，比如 `main` ，然后是插件的部分，copy插件使用 `files` 来定义对文件的具体操作， `src` 是要复制的文件， `dest` 则是要复制到的路径。

然后使用 `loadNpmTasks` 加载插件，需要写全名，包括grunt-contrib前缀。

最后是注册一个任务，这里的任务即是执行操作时需要调用的东西。比如代码中注册了 `default` 任务，包括一个数组中的所有任务，这样在执行default任务时就会执行相应的所有任务。另外default是一个特殊的任务名，如果在执行任务时没有指定名称，则执行该任务。当然直接运行copy任务也是可以的，甚至可以指定一个子任务，比如main。所以下面4行代码是相同的效果。
    
    grunt
    grunt default
    grunt copy
    grunt copy:main

不过需要特别注意的是，注册的任务名不能和原有的任务相同，这样会报错，比如这样：

    grunt.registerTask('copy', ['copy']);

和copy类似的文件基本操作还有 `clean` 清除, `concat` 连接, `rename` 重命名, `compress` 打包, `crypt` 编码等等，相关的配置可以在npmjs.org上的对应项目介绍中找到。

还有四个用于压缩的插件 `htmlmin` , `cssmin` , `uglify` , `imagemin` 分别对应HTML文件、CSS文件、JS文件和图片文件；以及两个用于检查代码的插件 `csslint` , `jshint` 分别检查CSS代码和JS代码。

当然，最重要的是，Grunt可以编译一些CSS和JS的其他形式代码。`coffee` 用于编译CoffeeScript，而CSS就更多了，比如[SASS](http://sass-lang.com/)可以使用 `compass` 或者 `sass`, 还有 `less` 和 `stylus`，我最喜欢的是[Stylus](http://learnboost.github.io/stylus/)，因为它使用的是Javascript来编译，而不像SASS是Ruby编译的，还需要准备Ruby的环境，非常麻烦。而且在Stylus中还可以写类似JS的条件语句和循环语句。这个国旗icon的项目很好的使用了Stylus以很短的代码完成了上百个国家的图标的CSS Sprite - [National Flag on Github](https://github.com/tychio/national_flag/blob/master/country.styl)。还有许多种Javascript模板的预编译插件，`haml` , `jst` , `jade` , `hogan` 等等。

除了用于编码的插件，还有许多用于测试的插件，在grunt-contrib中提供了三个测试框架的插件， `nodeunit` 用于Nodejs，`qunit` 用于Qunit，是来自jQuery团队的测试框架，还有Junit的后继者 `jasmine`。另外Mocha也有自己的Grunt插件 `grunt-mocha` 。用于捕获多个浏览器测试框架karma也有相应的插件 `grunt-karma` 。

此外，contrib中还有一些其他插件，比如 `connect` 用于http等协议的请求，支持https， `commands` 用于执行shell命令， `manifest`
 用于生成离线应用所需的 `manifest.appcache` 文件，还有用于插件YUI文档的 `yuidoc` 。

最最重要的一个插件就是 `watch` ，它可以随时监听某些指定的文件，当它们发生改变时执行相应的任务。再次使用copy做例子，添加watch任务后可以在原有文件发生改变时，将复制过去的副本也同步改变。

    module.exports = function (grunt) {
        grunt.initConfig({
            watch: {
                copy: {
                    files: 'path/**',
                    tasks: 'copy'
                }
            },
            copy: {
                main: {
                    files: {
                        src: ['path/**'], 
                        dest: 'dest/'
                    }
                }
            }
        });
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.registerTask('default', ['copy', 'watch']);
    };

由此，项目开发中的大部分工作都交由程序代替了人工，Yo和Bower可以快速的启动一个项目，Grunt在开发中可以自动化的持续完成编码中重复性的工作以及自动化检查和测试代码以提高质量。

### 开发工具 ###

##### SublimeText #####

在自动化开发的前提下，仍然有很多编码工作是需要亲手完成的，此时编辑器的效率决定了剩下的开发效率。SublimeText一款很棒的编辑器，通过配置和插件的选择可以达到几乎所有需求。

首先从GUI来说，ST的侧边栏可以随意的拖入文件夹并对其进行操作，而文本区则可以选择多种组合方式，包括网格、最多四栏、最多四列的布局。其滚动条也已经不是一个条了，而是一个代码的缩略图，拖动起来非常方便和清晰。每个文件的标签就像Chrome一样可以随意的拖出拖入。此外，代码的颜色样式可以有几十种方案供选择，还可以下载针对每种语言的颜色方案，目前我知道的仅有最新的Stylus的styl文件没有对应的颜色方案。

在功能方面，ST最大的特色之一就是会自动生成一份正在打开的文件的拷贝，而且会自动保存，也就是说即使是断电关机，重新打开后原本打开的文件也还是存在不会丢失任何代码。其次，多处编辑也是非常的强大，在代码中选择多处后会出现多个光标，可以同时编辑，而选中一个词后，按 `Ctrl+D` 就可以多选下一个相同的代码。另外通过 'Ctrl+P' 可以搜索文件，配合 `@` 或者直接按 `Ctrl+R` 就可以前往指定的方法和函数，配合 `:` 或者直接按 `Ctrl+G` 就可以前往指定的行数。按住 `Shift+Ctrl+Up/Down` 就可以移动选中行的代码上下移动。其他编辑都有的一般的快捷键自然也都有。

不过最强大的是，这些功能都可以利用插件实现，比如Emmet也就是大名鼎鼎的Zencoding的继任者就可以通过插件指定一个命令并分配一个快捷键来实现。我还喜欢使用Markdown preview，比如现在我就可以通过它预览一下博客的大致效果。还有刚刚提到的针对每种语言的颜色高亮方案也是插件的形式。还有一款老牌版本控制的工具Tortoise，因为公司还在用SVN这种老古董，Tortoise自然成了不二选择。还有很多插件，可以从官方网站搜索。
[https://sublime.wbond.net/search/](https://sublime.wbond.net/search/)

说到插件，自然少不了管理它的工具，SublimeText的管理工具是Package Control，原来的安装十分麻烦，不过现在官方给出了方法。使用 `Ctrl+~` 打开控制台，然后复制[这里官方给出的代码](https://sublime.wbond.net/installation)到控制台并执行，Package Control就安装好了。之后使用 `Ctrl+Shift+P` 调出命令面板后就会有一组Package Control的命令，主要会用到 `install` 和 `remove`
两个用于安装和卸载插件。

关于用户配置，有很多内容，可以参考 `Settings - Default` 。比如这样：

    {
        "caret_style": "phase",
        "font_size": 16.0,
        "overlay_scroll_bars": "enabled",
        "save_on_focus_lost": true,
        "scroll_past_end": false,
        "tab_size": 4,
        "translate_tabs_to_spaces": true,
        "word_wrap": true,
        "wrap_width": 80
    }

这些配置看到名字就基本可以猜出意思了，主要是wrap_width就是每行的字符数，设置到80，这样可以保持代码的简短，避免长语句。而translate_tabs_to_spaces就是用空格代替制表符。

##### Chrome #####

我始终喜欢Chrome多过Firefox，因为Chrome的启动速度比Firefox快上许多，Firefox原先有点过于臃肿了，不按标准的地方也不少，虽然后来在Google注资之后，不但版本号追了上来，功能也提升很多。不过Chrome仍是我开发的主要环境，Firefox一般仅作为研究和测试之用。

Chrome的开发者工具界面非常清爽，无论是在Elements中的HTML还是Sources中的Js，代码阅读和编辑都非常方便，而且在Element中可以修改和添加对应元素的CSS代码，而在Sources中可以直接修改CSS文件。Resources中列出了所有加载的文件，还有session、cookie和本地存储之类的缓存信息，可以方便的对其进行操作。而Network则列出了所有请求，以及相关的信息，甚至可以点击下面的圆点按钮 `preserve log upon Navigation` 进行请求响应时间的监视。在Timeline中还有更详细的时间监视，包括事件、加载以及内存的使用状况，可以方便的对程序的性能进行调试。在Profiles中可以对Js、CSS、DOM进行统计。还有Audits可以对网站性能和网络性能进行统计。

最重要的是Console[11]，在这里可以直接写入Javascript代码进行调试，还可以收集到程序中输出的各种信息和报错。不过最特别的是它是有API的可编程。一般常用到 `log` 方法，像下面的代码这样来输出一些变量，当然还有不同的类型，比如 `error` 方法、 `warn` 方法。它们的参数也很自由，多个参数将会被空格连接输出，还可以在第一个参数中使用占位符来按类型加入后面的参数。

    console.log('hello ' + world);
    console.error('Error:', 'nothing...');
    console.warn('Warn: %s < %d', 'age', 18);

除了上面三个方法以及类似log的 `info` 和 `debug` 方法还有一个特别的方法，那就是断言 `assert` 方法，它可以判断条件，在false时报错，一般用于测试。

另外还有三个关于时间的方法， `time` ， `timeEnd` 和 `timeStamp` 。time和timeEnd配合使用可以记录程序运行的时间并输出，而timeStamp可以在Timeline的统计中标出一个时间点。

Chrome的插件也非常的多，这里介绍三款和页面密切相关的工具。

[Visual Event](https://chrome.google.com/webstore/detail/visual-event/pbmmieigblcbldgdokdjpioljjninaim) 是一个捕获页面事件的插件，它会将页面所有绑定的事件全部以可视化的方式呈现出来，并且可以点击查看某个元素的事件详细信息。我经常用来检查事件是否正确的绑定到了目标元素上。

[Edit This Cookie](https://chrome.google.com/webstore/detail/edit-this-cookie/fngmhnnpilhplaeedifhccceomclgfbg) 顾名思义，用来编辑Cookie的，虽然DevTools也带有这样的功能，但是它更加便利，还可以导出导入，随意修改每个Cookie中的任意条目。虽然它很强大，不过好像利用率最高的功能是一键清空Cookie。

[Code Cola](https://chrome.google.com/webstore/detail/code-cola/lomkpheldlbkkfiifcbfifipaofnmnkn) 可以用来修改CSS，与DevTools不同的是，它的操作是左右滑动滑块，而且主要针对CSS3的空间样式，可以快速将元素变成各种角度各种尺寸。

不过Chrome还是有弱点的，当tab开的太多时会非常卡，因为Chrome每个tab都是一个单独的进程。所以还有一个插件也是很有用的，虽然和开发没有太大关系，[One Tab](https://chrome.google.com/webstore/detail/onetab/chphlpgkkbolifaimnlloiipkdnihall) 可以把当前的所有tab都集合起来变成一个页面，当需要打开时在点击链接即可，这样有效防止了过多tab造成的内存不足问题。

### 代码管理 ###

##### Git #####

关于Git Workflow的讨论很多，最著名的当属[Vincent Driessen](http://nvie.com/)的那篇博客[13]。Vincent的工作流的结构很棒，首先有2个主要分支，`master` 和 `develop`，分别是主分支和开发分支。然后还有3类次分支，它们可能数量很多，并且不会长时间存在，分别是开发新功能用的feature，发布用的release和修复bug用的hotfix。大致的Git操作可以理解为这样：

    # create branch
    git checkout -b develop master
    git checkout -b feature develop
    # commit something
    git add widget.js
    git commit -m "add a function"
    # merge to develop
    git checkout develop
    git merge --no-ff feature
    # delete branch
    git branch -d feature

首先创建开发分支 `develop` ，然后再从开发分支创建一个次分支，接着提交代码并注释提交，合并会开发分支 `develop` ，最后删除这个临时的次分支。--no-ff的意思是不使用快速合并。其他开发过程中也是大同小异，release分支还有hotfix分支可能需要在确认没问题时合并到develop和master两个分支中然后删除。

不过这个工作流是考虑到团队开发而设计的，很标准简约，但细节不足。而[Benjamin Sandofsky](https://sandofsky.com)的文章[14]则更加趋向于对commit的管理，也许不能算做工作流，至少算是一种理念。他强调一定要保留有一个私人的分支只存在于本地，然后在合并到主分支时清除原本的commit log。这里会用到一个 `merge` 命令的参数 `--squash` 这样合并后不会带来任何commit log。

    # create brach
    git checkout -b private master
    # commit something
    git add widget.js
    git commit -m "add a function"
    # merge brach but don't commit
    git checkout master
    git merge --squash private
    # commit once
    git commit -m "only this commit"

但我认为Git工作流和其他一切工程过程一样，不存在银弹。不过这种合并的方式可以成为一种很好的操作流来完成属于每个人自己的工作流。另外从这两种不同风格的Git工作流中也许能找出一些有趣的点。以下是我的看法：

* 主分支数由开发流程复杂度决定，而开发流程复杂度应该由项目主管根据项目规模确定，所以项目规模决定了主分支数，除了develop也许还需要test、build等等。

* 次分支数由人员和实际情况决定，bug数会决定hotfix的数量，也许产品经理会决定feature的数量，多个不同版本的同类产品也可能会增加release的数量。如果项目规模足够大时，几个小组解决一个问题时也会产生多个临时分支。

* 多人协作以及长时间开发都可能导致日志混乱无法管理，使用squash参数配合临时分支可以清理对别人不必要的commit信息。

* 应使用--no-ff可以避免快速合并，使每次合并等于一次提交，记录在log中，保持分支健康。

因此，在实际开发的工作流中应该按照实际情况创建分支，但应按照以上规范合并分支。

##### Github #####

Github不止是每个Coder的FaceBook，还是一个非常棒的远程Git仓库，甚至有很多小组将生产项目托管在上面。其实Github上和Git没有太多差别，只是多了一个远程仓库Remote的操作，另外相信每个初入Github的新手都为私钥公钥头疼了好久，下文将会讨论Github的仓库创建和日常操作两部分。

首先需要在本地建立与Github帐户的联系，在shell中安装SSH，然后像这样使用SSH安装SSH密钥：

    ssh-keygen -t rsa -C "your_email@example.com"
    # Creates a new ssh key, using the provided email as a label
    # Generating public/private rsa key pair.
    # Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): [Press enter]
    ssh-add id_rsa

然后会让你输入一个密码，随意输入就可以了，接着就会生成一个公钥一个私钥。在用户文件夹下的 `.ssh` 文件夹中找到id_rsa.pub，这个文件里就是公钥，复制里面的内容，然后在Github的Account Settings中的SSH Key页面，点击Add SSH Key按钮，输入一个用于说明的title，接着粘贴公钥到Key中就可以了。

然后必须在Github上点击 `Create a new repo` 按钮来创建一个空项目。当然如果选择适当的选项就可以自动生成README文件、Git忽略文件和版权分享声明文件。之后该项目会有一个仓库的地址，可以使用HTTPS和SSH，甚至还有SVN地址：

    https://github.com/<username>/<reponame>.git
    git@github.com:<username>/<reponame>.git
    https://github.com/<username>/<reponame>

以我的一个对话框jQ插件为例，首先在项目中初始化git，然后添加一个远程仓库，然后就可以往上面提交代码了。

    git remote add myGithub https://github.com/tychio/dialog.git
    git push myGithub master

因为我使用的HTTPS方式提交，之后会需要输入用户名和密码，如果使用SSH方式则用使用公钥而无需额外操作。使用HTTPS纯属为了记住Github的密码，每天都在敲就不会忘记了。

### 总结 ###

工作流应该是一个人最习惯和熟悉的流程，而不应该是照猫画虎，邯郸学步。还是那句话，不存在银弹，所以不会有万用的工作流，只能从中汲取有用的实践，完善改进自己的工作流，达到提高工作效率的目的。

和学习其他技术一样，应用于工作流之中的工具有无数种，但真正需要和适合的只有自己知道，发现问题，带着问题寻找工具才能真的改进工作流。如果仅仅为了使用前沿的工具而使用，只会使自己的工作效率大打折扣。记得两年前我还在疯狂的复制代码，每当我意识到不能再这样下去的时候，工作流就会自己进化，合适的工具近在眼前，工作效率逐渐提升。我发现问题实在是很好的老师，可以让一个人快速的成长，解决它就可以获得一次提升。

永远有人有跟你相同的问题，永远有能解决你当前问题的工具，善于使用问题来选择它们就能打造更完善的工作流。如果遇到没有工具能解决的问题，那说明造轮子的时机到了。

### 参考文档 ###

1. [NPM Readme](https://npmjs.org/doc/README.html)

2. [MSYS Wiki](http://www.mingw.org/wiki/MSYS)

3. [Yeoman home](http://yeoman.io/)

4. [Yeoman generators](http://yeoman.io/generators.html)

5. [Bower home](http://bower.io/)

6. [Bower jquery bug](https://github.com/bower/bower/issues/859)

7. [Bower configuration](https://docs.google.com/document/d/1APq7oA9tNao1UYWyOm8dKqlRP2blVkROYLZ2fLIjtWc/edit#heading=h.4pzytc1f9j8k)

8. [Grunt getting started](http://gruntjs.com/getting-started)

9. [Top 10 SublimeText2 plugins](http://www.henriquebarroso.com/my-top-10sublime-2-plugins/)

10. [Install package control](https://sublime.wbond.net/installation)

11. [Using the console API](https://developers.google.com/chrome-developer-tools/docs/console#using_the_console_api)

12. [Getting Started Installing Git](http://git-scm.com/book/en/Getting-Started-Installing-Git)

13. [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)

14. [Understanding the Git Workflow](https://sandofsky.com/blog/git-workflow.html)

15. [Generating SSH Keys](https://help.github.com/articles/generating-ssh-keys)