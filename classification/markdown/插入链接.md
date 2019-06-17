# 链接

markdown支持两种形式的链接语法：行内式和参考式两种形式。

1、要建立一个行内式的链接，只要在方块括号后面紧接着圆括号并插入网址链接即可，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来即可，例如：

代码：

    This is [an example](http://example.com/ "Title") inline link.

    [This link](http://example.net/) has no title attribute.

演示：

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

2、参考式的链接是在链接文字的括号后面再接上另一个方括号，而在第二个方括号里面要填入用以辨识链接的标记：

代码：

    基本语法：
        This is [an example][id] reference-style link.
        你也可以选择性地在两个方括号中间加上一个空格：
        This is [an example] [id] reference-style link.

    代码：
        I get 10 times more traffic from [Google] [1] than from
        [Yahoo] [2] or [MSN] [3].

    [1]: http://google.com/        "Google"
    [2]: http://search.yahoo.com/  "Yahoo Search"
    [3]: http://search.msn.com/    "MSN Search"

演示：

I get 10 times more traffic from [Google] [1] than from
[Yahoo] [2] or [MSN] [3].

  [1]: http://google.com/        "Google"
  [2]: http://search.yahoo.com/  "Yahoo Search"
  [3]: http://search.msn.com/    "MSN Search"
