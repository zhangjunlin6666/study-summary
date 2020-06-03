<!--
 * @Author: jackson
 * @Date: 2020-05-28 01:07:54
 * @LastEditors: jackson
 * @LastEditTime: 2020-06-02 22:18:01
-->

# 图片压缩

[vue、js实现图片等比缩放](https://blog.csdn.net/baidu_29701003/article/details/90520673)

``` html
<!DOCTYPE>
<html>
<head>
    <meta name="baidu-site-verification" content="LDyoKvyTEK" />
    <link rel="shortcut icon " type="images/x-icon" href="img/gt.ico">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>图片等比处理</title>
    <style type="text/css">
        img {
            width: 300px;
            height: auto;
        }
    </style>
</head>
<!-- https://blog.csdn.net/baidu_29701003/article/details/90520673 -->
<body class="base-transition">
    <div class="page-wrap homepage" id="vue" v-cloak>
        <p>选择的图片任意一边大于1024，以最长边等比压缩图片，否则不处理</p>
        <input id="photo" type="file" accept="image/png,image/jpeg,image/jpg" @change="handkeFileChange($event)" />
        <h4>
            <span>选择图片长：<span>{{sw}}px</span>&nbsp;&nbsp;&nbsp;&nbsp;宽：<span>{{sh}}px</span></span>
            <br />
            <span>处理后图片长：<span>{{rw}}px</span>&nbsp;&nbsp;&nbsp;&nbsp;宽：<span>{{rh}}px</span></span>
        </h4>
        <img :src="usableImage" />
    </div>
    <script type="text/javascript" src="js/vue.min.js" ></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script>
        var vue = new Vue({
            el: '#vue',
            data: {
                usableImage: '',
                sw: 0,
                sh: 0,
                rw: 0,
                rh: 0
            },
            computed: {},
            watch: {},
            mounted: function() {},
            methods: {
                handkeFileChange: function(event) {
                    let that = this;
                    that.gate = false;
                    let file = event.target.files[0];
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function(event) {
                        that.imageSrc = event.target.result;
                        //加载图片获取图片真实宽度和高度
                        let image = new Image();
                        image.onload = function() {
                            let width = image.width;
                            that.sw = width;
                            let height = image.height;
                            that.sh = height;
                            if(width > 1024 && width > height) {
                                that.dealImage(that.imageSrc, {
                                    width: 1024,
                                    quality: 1
                                }, function(base) {
                                    that.usableImage = base;
                                })
                            } else if(height > 1024 && height > width) {
                                that.dealImage(that.imageSrc, {
                                    height: 1024,
                                    quality: 1
                                }, function(base) {
                                    that.usableImage = base;
                                })
                            } else {
                                that.rw = width;
                                that.rh = height;
                                that.usableImage = that.imageSrc;
                            }
                        }
                        image.src = that.imageSrc;
                    }
                },
                /**
                 * 图片压缩，默认同比例压缩
                 * @param {Object} path 
                 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
                 * @param {Object} obj
                 *   obj 对象 有 width， height， quality(0-1)
                 * @param {Object} callback
                 *   回调函数有一个参数，base64的字符串数据
                 */
                dealImage: function(path, obj, callback) {
                    let ts = this;
                    var img = new Image();
                    img.src = path;
                    img.onload = function() {
                        var that = this;
                        console.log(that);
                        // 默认按比例压缩
                        var w = that.width,
                            h = that.height,
                            scale = w / h;
                        w = obj.width || (obj.height * scale);
                        h = obj.height || (obj.width / scale);
                        var quality = 0.7; // 默认图片质量为0.7
                        //生成canvas
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext('2d');
                        // 创建属性节点
                        var anw = document.createAttribute("width");
                        anw.nodeValue = w;
                        ts.rw = w;
                        var anh = document.createAttribute("height");
                        anh.nodeValue = h;
                        ts.rh = h;
                        canvas.setAttributeNode(anw);
                        canvas.setAttributeNode(anh);
                        ctx.drawImage(that, 0, 0, w, h);
                        // 图像质量
                        if(obj.quality && obj.quality <= 1 && obj.quality > 0) {
                            quality = obj.quality;
                        }
                        // quality值越小，所绘制出的图像越模糊
                        var base64 = canvas.toDataURL('image/jpeg', quality);
                        // 回调函数返回base64的值
                        callback(base64);
                    }
                }
            }
        });
    </script>
</body>
</html>

```
****