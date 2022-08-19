# 区块引用

1、代码1，在开头加上>符号即可:

    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    > consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    > Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    > id sem consectetuer libero luctus adipiscing.

演示1：

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

2、代码2，也可以允许只在整个段落的第一行加上>符号即可：

    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    id sem consectetuer libero luctus adipiscing.

演示2：

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.

3、代码3，区块引用还可以嵌套使用，只要根据层次加上不通数量的>符号即可：

    >This is the first level of quoting.
    >
    > > This is nested blockquote.
    >
    > Back to the first level.

演示3:

>This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

4、代码4，引用的区块内也可以使用其他的markdown语法，包括标题、列表、代码区块等：

    > 这是一个标题。
    > 
    > 1.   这是第一行列表项。
    > 2.   这是第二行列表项。
    > 
    > 给出一些例子代码：
    > 
    >     return shell_exec("echo $input | $markdown_script");

演示4:

> 这是一个标题。
> 
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。
> 
> 给出一些例子代码：
> 
>     return shell_exec("echo $input | $markdown_script");

5、代码5，单行式

    > hello world

演示5:

> hello world

代码6，多层嵌套

    > aaaaaaaaa
    >> bbbbbbbbb
    >>> cccccccccc

6、演示6:

> aaaaaaaaa
>> bbbbbbbbb
>>> cccccccccc
