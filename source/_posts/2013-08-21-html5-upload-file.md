---
layout: post
title: HTML5实现图片上传
tags: [html5,html,file,upload]
category: Tech
---

最近公司项目准备更换图片上传的插件，原来的是一个Flash控件，其实用起来还是不错的，还有进度条，浏览器支持情况也不错。不过因为某些页面的图片上传涉及到了跨域的问题，Flash似乎解决不了了，所以准备索性换成HTML5的，高端大气上档赤。然后这个HTML5上传图片功能自然落到了我的手上了。

一般来说图片上传无非就是文件操作的问题，本来这是服务器对文件流的一个操作问题，前端应该是管不上的，不过HTML5再次赋予了我们前端神圣而伟大的权利，有了HTML5部分后端失业了lol。

其实以前写过一个上传图片的插件，不过那时还活在IE6年代，只能用iframe搞定，虽然还挺好使的，不过在HTML5面前就是一个战斗力负5的渣渣，不仅需要后端返回各项数据，还必须把保存的临时图片地址再发给后端保存，实际请求是2次，而且还无法告诉用户上传进度与速度。
<!-- more -->
### 如何使用 FileReader ? ###

首先FileReader是一个用于读取文件的类，我们可以用new关键字实例化一个文件读取器，像这样：
    
    var fr = new FileReader();

但是还有一个问题，这是一个HTML5的API，只有部分浏览器支持它，所以还得加上判断，另外它的支持情况是这样的：

    var fr = false;
    if (typeof window.FileReader === 'undefined') {
        fr = new FileReader();
    }

---
<table style="text-align: center;">
    <tr>
        <th width="20%">IE</th>
        <th width="20%">Chrome</th>
        <th width="20%">Firefox</th>
        <th width="20%">Opera</th>
        <th width="20%">Safari</th>
    </tr>
    <tr>
        <td>10</td>
        <td>7</td>
        <td>3.6</td>
        <td>12.02</td>
        <td>6.02</td>
    </tr>
</table>
---


使用FileReader很简单，它提供了四个简单的接口用来读取文件，分别是abort，readAsBinaryString，readAsDataURL，readAsText。

##### readAsXXX #####

接口名清楚明白的说明了它的作用，以readAs开头的三个接口自然是用来读取文件的。很显然，所谓的文件，在不同的环境中有不同的格式不同的解释方式，这也正是这三个接口的不同之处。

但在我们弄清楚读取文件获得了什么之前，也许我们更应该关心目标文件是什么，怎么获取。幸运地是DOM中老早就存在一个files方法可以获取我们要的文件，并且它还提供了一些方法和属性。主要的属性有name，size，type，显然这是文件名、文件尺寸和文件类型，虽然它也提供了3个读取文件的方法getAsXXX，但是由于FileReader的存在已经被废弃很久了，同样被废弃的还有fileName和fileSize。

另外不得不说，Chrome在文件操作方面做的最出色，早在chrome13就已经实现了文件的写入，而其他浏览器至今还没有实现。

然后说说读取文件吧，这个过程是需要时间的，所以必须异步读取它，还好我们有load方法，像这样：

    var fr = false;
    if (typeof window.FileReader === 'undefined') {
        fr = new FileReader();
        fr.readAsXXX(document.getElementById('input_file').files[0]);
        fr.onload = function (p_fr) {
            console.log(p_fr.target.result);
        };
    }

###### readAsBinaryString ######

readAsBinaryString的result应该是一个二进制流，而log出的结果是一个夹杂着乱码符号的文本，里面还能看到图片是用PS保存的之类的信息。

###### readAsDataURL ######

readAsDataURL的result则是一个Base64的图片代码，可以直接放入HTML的img标签的属性src上。

###### readAsText ######

readAsText的result和二进制的显示出来基本是一样的，包括一个信息头，接着大段的乱码应该是图片本身。

该方法还有一个可选的参数[encoding]，即文本的编码方式，默认为urf-8。

##### Abort #####

abort是一个特别的方法，用来打断读取。当图片上传超时或者其他操作需要打断时就可以调用这个接口打断。另外还可以监听abort事件来处理打断后的情况。

### 使用FormData组织表单数据 ###

解决了预览的问题，现在该解决上传的正事了，如果使用HTML5的上传方式那么就必须使用Ajax请求来与服务器通信，但表单中的文件应该如何以参数的方式通过ajax请求传送呢？

在DOM API中，Form提供了一个方法FormData，它可以将表单元素的DOM对象直接转换为参数，通过Ajax请求传送。用起来很简单，使用new关键字将DOM对象传入参数即可：

    var _fd = new FormData(document.getElementsByTagName('form')[0]);

然后只需要在Ajax请求中送出即可：

    xhr.send(_fd);

##### append #####

当然我们也可以加入不在表单中的额外参数，使用append方法即可：
    
    var xhr = new XMLHttpRequest();  
    var formData = new FormData(document.getElementsByTagName('form')[0]);
    formData.append('param1', 'a parameter');
    xhr.open('POST', 'uploader.php');
    xhr.send(formData);

append方法一般可以传入一对键值组合的参数用来添加到表单数据之中，但它还提供了另外一种用法，传入参数名以及一个Blob或者File，另外还有第三个可选的参数，是该参数的文件名。

至于Blob，是一个类似于文件的Object，我的理解是它在某些环境中可以解析为文件，但是在浏览器中是无法识别的。

##### 支持情况 #####

作为一个HTML5的方法自然也是有浏览器支持的问题的，如下表：

---
<table style="text-align: center;">
    <tr>
        <th width="20%">IE</th>
        <th width="20%">Chrome</th>
        <th width="20%">Firefox</th>
        <th width="20%">Opera</th>
        <th width="20%">Safari</th>
    </tr>
    <tr>
        <td>10</td>
        <td>7+</td>
        <td>4.0</td>
        <td>12+</td>
        <td>5+</td>
    </tr>
</table>
---

不过append方法的支持情况就有点不尽人意了，只有Chrome完全支持，Firefox在22以后才支持，其他浏览器均不支持。

### 上传文件 ###

一般来说提交form数据到服务器，上传文件即可交由后端完成。但HTML5需要获取上传进度，就会比较特殊，所以还需要为Ajax请求绑定一些事件来处理不同的情况。

##### Event #####

一般来说，只需要使用XMLHttpRequest的addEventListener方法来绑定事件，像这样

    xhr.addEventListener('load', function (p_event) {
        // your code...
    }, false);

除了load事件以外，还有一下一些事件，可以满足上传过程中遇到的各种问题。

1.abort 上传中断时触发。
2.error 上传出错时触发。
3.load 文件成功读取完成时触发。
4.loadend 文件读取结束时无论是否成功触发。
5.loadstart 文件读取开始时触发。
6.progress 文件读取过程中每秒触发一次。

###### progress ######

progress方法比较特殊，会在上传过程中一直触发，并获取当前上传的量 `loaded` 和总量等数据 `total` 。
主要需要用到的有2个数据，loaded已上传的部分和total总量，单位都是b，利用它们算出上传进度就可以显示百分比或设置进度条的宽度，甚至记录进度改变时花费的时间就能算出上传速度。

另外progress的监听比较特殊，像这样：

    xhr.upload.addEventListener('progress', function (p_event) {
        var _loaded = p_event.loaded;
        var _total = p_event.total;
        var _percent = Math.round(_loaded * 100 / _total);
        // using percent...
    }, false);

需要使用xhr.upload的addEventListener方法来监听事件，而不是直接使用xhr。

### INPUT标签 ###

最后，是一个文件上传的老问题，无论是HTML5还是4，file类型的input标签样式总是无法统一，也无法美化。所以我们只能以暴制暴，不能化妆那就整容，用其他元素把它彻底覆盖掉。众所周知的做法是把input隐藏，然后问题来了，如何触发上传。

###### trigger ######

一般首先想到的是模拟触发，比如jQuery中的trigger方法，可以让我们点击甚至其他动作时触发input标签。但是IE由于安全性问题不允许模拟触发file类型的input标签事件，所以如果不支持IE的项目可以使用这个方法轻松搞定。

###### 透明化按钮 ######

既然不能模拟，真实用户的点击行为自然是没问题了吧，于是另一个方法诞生了，将input标签变成透明的，覆盖在一个按钮样式的标签上，如此用户看到的是一个美化的按钮，点击的却是Input标签。但是有一个问题，file类型的Input标签在各浏览器中的尺寸和位置都是不太一致的，尤其是改变其尺寸后，有的浏览器甚至无法改变。所以如何按钮较大或者直接是一个区域时则会出现问题。

###### 鼠标跟随 ######

方法继续进化，虽然点击区域的尺寸可能会很大，但鼠标的点击永远只是一个点，于是只要让Input标签一直跟随鼠标在区域内移动，将可点击部分随时对准鼠标指针，就可以让鼠标在区域内点击到Input标签了。这个方法解决了所有问题，但它的效率很成问题，甚至不能过分使用函数节流，因为移动过快时可能点击不到。

###### Label触发 ######

后来在StackOverflow上看到了一个很不错的方法，就是利用Labal标签的for属性去触发input标签，只要将for的值写成Input的Id即可。但在我的测试中Firefox好像是不能触发的，不知道是否还有其他的属性需要设置。

这四种方法各有各的优劣，只能根据具体情况选择使用了。

##### 多文件上传 Multiple #####

在Input标签上也出现了一个很实用的HTML5的新功能，那就是多文件上传，实现也非常简单，只要加上multiple的属性即可

    <input type="file" name="files[]" multiple="multiple" />

如此在上传的时候就可以选择多个文件，另外在后端接受数据时，每个属性都变成了一个数组，以PHP为例：

    <?php
        header('Content-type: text/json');
        print_r($_FILES["upload"]["name"]);
        $rtn = array(
            "code" => 0,
            "data" => ''
        );
        if ($_FILES["upload"]["error"] > 0) {
            $rtn["code"] = -1;
        } else {
            $rtn["data"] = array(
                "name" => $_FILES["upload"]["name"],
                "type" => $_FILES["upload"]["type"],
                "size" => $_FILES["upload"]["size"],
                "path" => ""
            );
            if (file_exists("img/".$rtn["data"]["name"])) {
                $rtn["code"] = 1;
            } else {
                move_uploaded_file($_FILES["upload"]["tmp_name"],
                    "img/".$_FILES["upload"]["name"]);
                $rtn["code"] = 0;
                $rtn["data"]["path"] = "img/".$rtn["data"]["name"];
            }
        }
        echo json_encode($rtn);
    ?>


### 参考文档： ###

* [W3C FileReader Interface](http://www.w3.org/TR/FileAPI/)
* [MDN FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader?redirectlocale=en-US&redirectslug=DOM%2FFileReader)
* [MDN DOM Files](https://developer.mozilla.org/en-US/docs/Web/API/File)
* [Using FormData to send forms with xhr as key/value pairs](http://robertnyman.com/2013/02/11/using-formdata-to-send-forms-with-xhr-as-keyvalue-pairs/)
* [MDN FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
* [Whatwg Interface FormData](http://xhr.spec.whatwg.org/#interface-formdata)
* [W3C Forms multiple](http://www.w3.org/html/wg/drafts/html/master/forms.html#multipart-form-data)
* [File upload and Progress events with HTML5](http://www.sagarganatra.com/2011/04/file-upload-and-progress-events-with.html)