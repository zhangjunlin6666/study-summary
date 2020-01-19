<!--
 * @Author: jackson
 * @Date: 2019-11-01 15:57:26
 * @LastEditors: jackson
 * @LastEditTime: 2020-01-05 22:13:11
 -->

# 图片

Markdown 使用一种和链接很相似的语法来标记图片，同样也允许两种样式： 行内式和参考式。

1、行内式的图片语法看起来像是：

语法：

        ![Alt text](/path/to/img.jpg)

        ![Alt text](/path/to/img.jpg "Optional title")

        详细叙述如下：

            一个惊叹号 !
            接着一个方括号，里面放上图片的替代文字
            接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上 选择性的 'title' 文字。

演示：

![Alt text](/img/timg.jpeg "感觉她萌萌哒")

2、参考式的图片语法则长得像这样：

语法：

    ![Alt text][id]
    [id]是图片参考的名称，图片参考的定义方式则和连结参考一样：

    [id]: "url/to/image"  "Optional title attribute"
    到目前为止， Markdown 还没有办法指定图片的宽高，如果你需要的话，你可以使用普通的 <img> 标签。

演示：

![Alt text][id]
[id]:/img/timg.jpeg "感觉她萌萌哒"
