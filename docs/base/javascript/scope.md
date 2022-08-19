# 作用域

JavaScript是门动态语言，跟Java不一样，JavaScript可以随意定义全局变量和局部变量，变量会在该作用域下提升，而且JavaScript没有块级作用域。全局变量就是定义在全局的变量了，局部变量是定义在函数里的变量，每一个函数都是一个作用域，当函数执行时会优先查找当前作用域，然后逐级向上。定义在 if 和 for 语句里的变量，在大括号外面也能访问到，这就是没有块级作用域。

JavaScript是静态作用域，在对变量进行查询时，变量值由函数定义时的位置决定，和执行时的所处的作用域无关。

知道ES6的童鞋可能还会指出 JavaScript已经有块级作用域了，而且用 let 和 const 定义的变量不会提升。

来感受一下

# 第一题
```html
<script>
var a = 1;

function fn() {
    console.log('1:' + a);
    var a = 2;
    bar()
    console.log('2:' + a)
}

function bar() {
    console.log('3:' + a)
}
fn()
</script>
```


第一个 a 打印的值是 1:undefined 而不是 1。因为我们在 fn() 中定义了变量 a，用 var 定义的变量会在当前作用域提升，但是并不会携带赋给变量的值一起提升。

第二个 a 打印的值是 3:1 而不是 2。因为函数 bar 是定义在全局作用域中的，所以作用域链是 bar -> global，bar 里面没有定义a，所以就会顺着作用域链向上找，然后在 global 中找到了 a。

第三个 a 打印的值是 2:2。这句话所在的作用域链是 fn -> global，执行 console.log('2:' + a) 会首先在 fn 作用域里查找 a，找到有 a，并且值为2，所以结果就是2。

答案：
```html
// 第一题正确答案
1:undefined
3:1
2:2
```

# 第二题
```html
<script>
var a = 1;
function fn() {
  console.log('1:' + a);
  a = 2
}

a = 3;
function bar() {
  console.log('2:' + a);
}

fn();
bar();
</script>
```
第一个 a 打印的值是 1:3，既不是 undefined 也不是 1。首先， fn 中的 a = 2 是给变量 a 赋值，并没有定义变量。然后，执行函数 fn，由于代码是从上到下编译完成的，在查找变量 a 时，此时查找的变量就是全局变量 a，不过此时 a 的值为3。

第二个 a 打印的值是 2:2。函数 bar 所能访问的作用域链为 bar->global，在执行函数 bar 时，a 的值已经被修改成了 2。

答案：
```html
// 第二题正确答案
1:3
2:2
```

#第三题

```html
<script>
if(!("a" in window)){
    var a = 10;
}
console.log(a);
</script> 
```
因为 全局变量声明提升。 因为全局变量提升 所以 a声明已经存在window中。 所以if得到是"a" in window是ture 所以不走里面赋值 console.log(a) == undefined
```html
<script>
//解析 上述代码等同于
var a;
if(!("a" in window)){
    a = 10;
}
</script> 
```

```html
<script>
// 变种题
(function(){
 var  x = c =  b = {a:1}
})()

console.log(x.a); // error , x is not defined
console.log(c,b) // {a: 1} {a: 1}
</script> 
```

拆分出来var x = c = b = {a:1} 就是把{a:1}赋值给b，再把b赋值给c，再把c赋值给x，结果x、c、b的值都是{a:1}。等同于

```html
var x = {a:1};
    c = {a:1};
    b = {a:1};
```
x在函数内部用var声明，所以为局部变量，b和c并没有使用var声明，所以为全局变量

#第四题

```html
<script>
(function(){
  var a = b = 3;
})()

console.log(typeof a === "undefined"); // true
console.log(typeof b === "undefined"); // false

// 这里涉及的就是立即执行和闭包的问题,还有变量提升,运算符执行方向(=号自左向右)
// 那个函数可以拆成这样

(function()
  var a; /* 局部变量,外部没法访问*/
  b = 3; /* 全局变量,so . window.b === 3 , 外部可以访问到*/
  a = b;
})()

// 若是改成这样,这道题应该是对的
console.log(typeof b === "number" && b ===3); // true
</script> 
```

#第五题

```html
<script>
var x = 1;
if (function f(){}) {
x += typeof f;  
}
console.log(x);  // 1undefined

//因为函数体在()中会以表达式去运行。
//最后转换为true,不会存在函数整体声明提升。所以typeof为undefined
</script> 
```

#第六题

```html
<script>
function fun(n,o) {
     console.log(o)
         return {
          fun:function(m){
            return fun(m,n);
          }
     };
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3);           //输出什么 undefined 0 0 0 
var b = fun(0).fun(1).fun(2).fun(3);                    //输出什么 undefined 0 1 2
var c = fun(0).fun(1); c.fun(2); c.fun(3);              //输出什么 undefined 0 1 1
</script> 
```
第一行  fun()内部形成了闭包，第一次调用var a = fun(0)时，内部的闭包的n就为参数0所以不管怎么调用改变a.fun()参数，后续的输出都为第一次a.fun()的参数

第二行  循环链式调用闭包，闭包的n参数值每次都是上一次调用的o值，除第一次调用没传o参数，输出undefind，其余均会输出

第三行  这是将第一和第二行结合了一下，var c = fun(0).fun(1) 等同于 var a = fun(1) 

答案很显而易见。换一个形式看着道题
```html
<script> 
function fun(n,o) {
     console.log(o)
         return {
          fun:function(m){
            return fun(m,n);
          }
     };
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3);           //输出什么 undefined 0 0 0 

//fun(0)调用时候等同于
function fun(n,o) {
    var n=0;
    var o;
     console.log(o)  //undefined
         return {
          fun:function(m){
            return fun(m,n);  ---> n 就获取到fun里面的n为0的值。然后调用一次fun就会出现下面函数显示。
          }
     };
}
//a.fun(1)调用时候等同于fun(1,0)
function fun(n,o) {
    var n=1;
    var o=0;
     console.log(o)  //1
         return {
          fun:function(m){
            return fun(m,n);  ---> n 就获取到fun里面的n为0的值。
          }
     };
}
</script> 
```

#第七题  

未完待续。。。
https://www.cnblogs.com/Bond/p/4218639.html

#知识点

在JavaScript中，通过 let 和 const 定义的变量具有块级作用域的特性。

通过 var 定义的变量会在它自身的作用域中进行提升，而 let 和 const 定义的变量不会。

每个JavaScript程序都具有一个全局作用域，每创建一个函数都会创建一个作用域。

在创建函数时，将这些函数进行嵌套，它们的作用域也会嵌套，形成作用域链，子作用域可以访问父作用域，但是父作用域不能访问子作用域。

在执行一个函数时，如果我们需要查找某个变量值，那么会去这个函数被 定义 时所在的作用域链中查找，一旦找到需要的变量，就会停止向上查找。

“变量的值由函数定义时的位置决定”这句话有歧义，准确说是查找变量时，是去定义这个函数时所在的作用域链查找。

函数形参声明--->函数声明---->变量声明 。任何一种声明，如果在前面出现，都不会再次声明。

参考文章：

1.[题解JavaScript作用域](https://github.com/Mcbai/Blog/issues/3)

2.[一篇文章带你了解js作用域](https://www.imooc.com/article/70190)
