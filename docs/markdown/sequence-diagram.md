
# 时序图

## 基本用法

由于默认情况下markdown不支持时序图，需要安装gitbook相关插件进行编译。

使用npm安装，npm install gitbook-plugin-sequence --save-dev [插件地址](https://www.npmjs.com/package/gitbook-plugin-sequence)

代码1

    ```sequence
    A->>B: 你好
    Note left of A: 我在左边     // 注释方向，只有左右，没有上下
    Note right of B: 我在右边
    B-->A: 很高兴认识你
    ```

    A->>B: 你好 后面可以不写文字，但是一定要在最后加上：
    Note left of A 代表注释在A的左边

演示：

```sequence
A->>B: 你好
Note left of A: 我在左边
Note right of B: 我在右边
B-->A: 很高兴认识你
```

代码2

    ```sequence
    起床->吃饭: 稀饭油条
    吃饭->上班: 不要迟到了
    上班->午餐: 吃撑了
    上班->下班:
    Note right of 下班: 下班了
    下班->回家:
    Note right of 回家: 到家了
    回家-->>起床:
    Note left of 起床: 新的一天
    ```

演示2：

```sequence
起床->吃饭: 稀饭油条
吃饭->上班: 不要迟到了
上班->午餐: 吃撑了
上班->下班:
Note right of 下班: 下班了
下班->回家:
Note right of 回家: 到家了
回家-->>起床:
Note left of 起床: 新的一天
```

## 符号含义

|符号|含义|
|:-:|:-:|
|`-`|实线|
|`>`|实心箭头|
|`--`|虚线|
|`>>`|空心箭头|
