
# 流程图

由于默认情况下markdown不支持流程图，需要安装gitbook相关插件进行编译。

使用npm安装，npm install gitbook-plugin-flow --save-dev [插件地址](https://www.npmjs.com/package/gitbook-plugin-flow)

代码1：

    ```flow                     // 流程
    st=>start: 开始|past:> http://www.baidu.com // 开始
    e=>end: 结束              // 结束
    c1=>condition: 条件1:>http://www.baidu.com[_parent]   // 判断条件
    c2=>condition: 条件2      // 判断条件
    c3=>condition: 条件3      // 判断条件
    io=>inputoutput: 输出     // 输出
    //----------------以上为定义参数-------------------------

    //----------------以下为连接参数-------------------------
    // 开始->判断条件1为no->判断条件2为no->判断条件3为no->输出->结束
    st->c1(yes,right)->c2(yes,right)->c3(yes,right)->io->e
    c1(no)->e                   // 条件1不满足->结束
    c2(no)->e                   // 条件2不满足->结束
    c3(no)->e                   // 条件3不满足->结束
    ```

演示1:

代码1

```flow
st=>start: 开始|past:> http://www.baidu.com
e=>end: 结束
c1=>condition: 条件1:>http://www.baidu.com[_parent]
c2=>condition: 条件2
c3=>condition: 条件3
io=>inputoutput: 输出
st->c1(yes,right)->c2(yes,right)->c3(yes,right)->io->e
c1(no)->e
c2(no)->e
c3(no)->e
```
