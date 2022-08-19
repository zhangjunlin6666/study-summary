# 列表

markdown支持有序列表和无序列表

1、无序列表使用星号、加号、减号作为列表标记：

    星号代码：
        * red
        * green
        * blue

    加号代码：
        + red
        + green
        + blue

    减号代码：
        - red
        - green
        - blue

星号演示：

* red
* green
* blue

加号演示：

+ red
+ green
+ blue
  
减号演示：

- red
- green
- blue

2、有序列表使用数字接着一个英文句点，并且句点后需要有空格：

    代码：
        1.bird
        2.mchale
        3.parish

    在列表标记上使用的数字并不会影响输出的html结果，上面的有序列表所产生的html标记为：
        <ol>
            <li>Bird</li>
            <li>McHale</li>
            <li>Parish</li>
        </ol>

演示：

1. bird

2. mchale

3. parish

3、如果要在列表项目内放进引用，那 > 就需要缩进：

    *   A list item with a blockquote:

    > This is a blockquote
    > inside a list item.

* A list item with a blockquote:
    > This is a blockquote
    > inside a list item.

4、如果要放代码区块的话，该区块就需要缩进两次，也就是 8 个空格或是 2 个制表符：

代码：

    *   一列表项包含一个列表区块：

            <代码写在这>

    * one

        var a = 10;

演示：

* one

    var a = 10;

5、有、无序列表嵌套

代码：

    1. one
       1. one-1
       2. two-2
    2. two
        * two-1
        * two-2

演示：

1. one
    1. one-1
    2. two-2
2. two
    * two-1
    * two-2
