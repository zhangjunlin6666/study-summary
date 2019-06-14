
# markdown用法简介

[本文档参考自](http://www.markdown.cn/#block-elements)

markdown语法的目标是：成为一种适用于网络的书写语言。

markdown的理念是：能让文档更容易读、写和随意改。

不在markdown涵盖范围之内的标签，都可以直接在文档里面用html撰写，不需要额外标注这是html还是markdown，只要直接加标签就可以，意思是说，一些属于html而不属于markdown的标签可以直接在markdown中使用。

# 区块元素

## 标题

    表示h1到h6的标签
        # 这是h1
        ## 这是h2
        ### 这是h3
        #### 这是h4
        ##### 这是h5
        ###### 这是h6
    还可以这么写，选择闭合形式，在行尾加上#，数量可以不用和开头一样（建议一样），行首的#符号数量决定标题的阶数
        # 这是h1 #
        ## 这是h2 ###
        ### 这是h3 ##
        #### 这是h4 #
        ##### 这是h5 ########
        ###### 这是h6 ###

## 区块引用

用法1，在开头加上>符号即可:
    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    > consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    > Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    > id sem consectetuer libero luctus adipiscing.

例子1：
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

用法2，也可以允许只在整个段落的第一行加上>符号即可：
    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    id sem consectetuer libero luctus adipiscing.

例子2：
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.

用法3，区块引用还可以嵌套使用，只要根据层次加上不通数量的>符号即可：
    >This is the first level of quoting.
    >
    > > This is nested blockquote.
    >
    > Back to the first level.

例子3:
>This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

用法4，引用的区块内也可以使用其他的markdown语法，包括标题、列表、代码区块等：
    > ## 这是一个标题。
    > 
    > 1.   这是第一行列表项。
    > 2.   这是第二行列表项。
    > 
    > 给出一些例子代码：
    > 
    >     return shell_exec("echo $input | $markdown_script");

例子4:
> ## 这是一个标题。
> 
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。
> 
> 给出一些例子代码：
> 
>     return shell_exec("echo $input | $markdown_script");

## 列表

markdown支持有序列表和无序列表

无序列表使用星号、加号、减号作为列表标记：

    星号写法：
        * red
        * green
        * blue

    加号写法：
        + red
        + green
        + blue

    减号写法：
        - red
        - green
        - blue

星号列子：
* red
* green
* blue

加号列子：
+ red
+ green
+ blue
  
减号例子：
- red
- green
- blue

有序列表使用数字接着一个英文句点：

    写法：
        1.bird
        2.mchale
        3.parish

    在列表标记上使用的数字并不会影响输出的html结果，上面的有序列表所产生的html标记为：
        <ol>
            <li>Bird</li>
            <li>McHale</li>
            <li>Parish</li>
        </ol>

如果要在列表项目内放进引用，那 > 就需要缩进：
    *   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.

*   A list item with a blockquote:
    > This is a blockquote
    > inside a list item.

如果要放代码区块的话，该区块就需要缩进两次，也就是 8 个空格或是 2 个制表符：

    *   一列表项包含一个列表区块：

            <代码写在这>

*   一列表项包含一个列表区块：

        <代码写在这>

## 代码区块

和程序相关的写作或是标签语言原始码通常会有已经排版好的代码区块，通常这些区块我们并不希望他以一般段落文件的方式去排版，而是照原来的样子显示，markdown会用`<pre>`和`<code>`标签来吧代码区块抱起来

要在markdown中建立代码区块很简单，只要简单的缩进4个空格或是一个制表符就可以，例如：

    这是一个普通段落：
        这是一个代码区块。

    markdown会转换成：
        <p>这是一个普通段落：</p>
        <pre><code>这是一个代码区块。</code></pre>

一个代码区块会一直持续到没有缩进的那一行（或是文件结尾）。

    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>

## 分割线

你可以在一行中用三个以上的星号、减号、底线来建立一个分割线，行内不能有其他东西，你也可以在星号或是减号中间插入空格，下面每种写法都可以建立分割线：

    * * * 星号

    *** 星号

    ***** 星号

    - - - 减号

    --------------------------------------- 底线

列子：

* * *

***

*****

- - -

---------------------------------------

# 区段元素

## 链接

markdown支持两种形式的链接语法：行内式和参考式两种形式。

要建立一个行内式的链接，只要在方块括号后面紧接着圆括号并插入网址链接即可，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来即可，例如：

    This is [an example](http://example.com/ "Title") inline link.

    [This link](http://example.net/) has no title attribute.

例子：

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

参考式的链接是在链接文字的括号后面再接上另一个方括号，而在第二个方括号里面要填入用以辨识链接的标记：

    This is [an example][id] reference-style link.

    你也可以选择性地在两个方括号中间加上一个空格：

    This is [an example] [id] reference-style link.
