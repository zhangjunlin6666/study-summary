# js调用打印机

``` javascript
// 打印类属性、方法定义
const Print = function (dom, options) {
    // 检测print方法是否是直接调用，如果直接调用就new print
    if (!(this instanceof Print)) return new Print(dom, options);

    // 合并选项，.no-print为默认的css类名
    this.options = this.extend({
        'noPrint': '.no-print'
    }, options);

    // 检测挂载点的类型，获取挂载点
    if ((typeof dom) === "string") {
        this.dom = document.querySelector(dom);
    } else {
        this.isDOM(dom)
        this.dom = this.isDOM(dom) ? dom : dom.$el;
    }

    // 初始化
    this.init();

};
Print.prototype = {
    init: function () {
        // 获取当前页面的所有样式和所有页面内容
        var content = this.getStyle() + this.getHtml();
        this.writeIframe(content);
    },
    extend: function (obj, obj2) {
        for (var k in obj2) {
            obj[k] = obj2[k];
        }
        return obj;
    },

    getStyle: function () {
        var str = "",
        styles = document.querySelectorAll('style,link');
        for (var i = 0; i < styles.length; i++) {
            str += styles[i].outerHTML;
        }
        str += `
            <style>
                ${this.options.noPrint ? this.options.noPrint : '.no-print'}
                {display:none;}
            </style>
        `;

        return str;
    },

    getHtml: function () {
        var inputs = document.querySelectorAll('input');
        var textareas = document.querySelectorAll('textarea');
        var selects = document.querySelectorAll('select');

        for (var k = 0; k < inputs.length; k++) {
            if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
                if (inputs[k].checked == true) {
                    inputs[k].setAttribute('checked', "checked")
                } else {
                    inputs[k].removeAttribute('checked')
                }
            } else if (inputs[k].type == "text") {
                inputs[k].setAttribute('value', inputs[k].value)
            } else {
                inputs[k].setAttribute('value', inputs[k].value)
            }
        }

        for (var k2 = 0; k2 < textareas.length; k2++) {
            if (textareas[k2].type == 'textarea') {
                textareas[k2].innerHTML = textareas[k2].value
            }
        }

        for (var k3 = 0; k3 < selects.length; k3++) {
            if (selects[k3].type == 'select-one') {
                var child = selects[k3].children;
                for (var i in child) {
                    if (child[i].tagName == 'OPTION') {
                        if (child[i].selected == true) {
                            child[i].setAttribute('selected', "selected")
                        } else {
                            child[i].removeAttribute('selected')
                        }
                    }
                }
            }
        }

        return this.dom.outerHTML;
    },

    writeIframe: function (content) {
        var w, doc, iframe = document.createElement('iframe'),
        f = document.body.appendChild(iframe);
        iframe.id = "myIframe";

        iframe.setAttribute('style',
        'position:absolute;width:0;height:0;top:-10px;left:-10px;');

        w = f.contentWindow || f.contentDocument;
        doc = f.contentDocument || f.contentWindow.document;
        doc.open();
        doc.write(content);
        doc.close();
        var _this = this;
        var userAgent = window.navigator.userAgent;
        if(userAgent.indexOf("Safari") > -1){
            if(userAgent.indexOf("Chrome") > -1){
                iframe.onload = function(){
                    _this.toPrint(w);
                    setTimeout(function () {
                        document.body.removeChild(iframe)
                    }, 100)
                }
            }else{
                var _timer = setInterval(function() {
                    if (doc.readyState == 'complete') {
                        _this.toPrint(w);
                        setTimeout(function () {
                            /*
                                这里的处理目前是一个折中方案，并不是完善的，
                                主要针对safari浏览器的打印，
                                点击取消之后再次打印不能打印的问题处理
                            */
                            document.body.removeChild(iframe)
                        }, 5000)
                        clearInterval(_timer);
                    }
                }, 100);
            }
        }else{
            /*
                console.log("不支持safari浏览器打印功能，因为打开打印机点击打印没问题，
                但是点击取消之后就不能打印了，除非刷新页面或者重新进入页面，
                功能不完善暂时禁止safari打印")
            */
            iframe.onload = function(){
                _this.toPrint(w);
                setTimeout(function () {
                    document.body.removeChild(iframe)
                }, 100)
            }
        }

    },

    toPrint: function (frameWindow) {
        let userAgent = window.navigator.userAgent;
        try {
            setTimeout(function () {
                frameWindow.focus();
                try {
                    if(!frameWindow.document.execCommand('print', false, null)){
                        frameWindow.print();
                    }
                } catch (e) {
                    frameWindow.print();
                }
                frameWindow.close();
            }, 10);
        } catch (err) {}
    },

    // 检测HTMLElement的类型，调用不同的检测方法
    isDOM: (typeof HTMLElement === 'object') ?
        function (obj) {
            return obj instanceof HTMLElement;
        } :
        function (obj) {
            return  obj &&
                    typeof obj === 'object' &&
                    obj.nodeType === 1 &&
                    typeof obj.nodeName === 'string';
        }
};

// 通过vue插件系统，将print挂载到vue的原型上
const MyPlugin = {}
MyPlugin.install = function (Vue, options) {
  Vue.prototype.$print = Print
}
export default MyPlugin

```

# 用法

main.js中导入该js，使用Vue.use()注册该插件，然后在代码中调用this.$print(dom)，其中参数dom为需要打印的页面区域。

# npm包

[vue-print npm包](https://www.npmjs.com/package/vue-printjs)
