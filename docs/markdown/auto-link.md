
# 自动邮箱链接

1、Markdown 支持以比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用方括号包起来， Markdown 就会自动把它转成链接。
一般网址的链接文字就和链接地址一样，例如：

    <http://example.com/> Markdown 会转为：

    <a href="http://example.com/">http://example.com/</a>

演示：

<http://example.com/>

2、邮址的自动链接也很类似，只是 Markdown 会先做一个编码转换的过程，把文字字符转成 16 进位码的 HTML 实体，
    这样的格式可以糊弄一些不好的邮址收集机器人，例如：

    <address@example.com> Markdown 会转成：

    <a href="mailto:address@example.com">address@example.com</a>

    在浏览器里面，这段字串（其实是 <a href="mailto:address@example.com">address@example.com</a>）
    会变成一个可以点击的「address@example.com」链接。（这种作法虽然可以糊弄不少的机器人，但并不能全部挡下来，
    不过总比什么都不做好些。不管怎样，公开你的信箱终究会引来广告信件的。）

演示：

<341234212@qq.com>
