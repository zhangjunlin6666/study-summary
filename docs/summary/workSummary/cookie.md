# cookie

``` javascript
export const Cookie = (key, value, options) => {
  /* read 读取 */
  // 如果没有传递 value ，则表示根据 key 读取 cookie 值
  if (typeof value === "undefined") {
    // 读取
    // 获取当前域下所有的 cookie，保存到 cookies 数组中
    let cookies = document.cookie.split("; ");
    // 遍历 cookies 数组中的每个元素
    for (let i = 0, len = cookies.length; i < len; i++) {
      // cookies[i] : 当前遍历到的元素，代表的是 "key=value" 意思的字符串，
      // 将字符串以 = 号分割返回的数组中第一个元素表示 key，
      // 第二个元素表示 value
      let cookie = cookies[i].split("=");
      // 判断是否是要查找的 key，对查找的 key 、value 都要做解码操作
      if (decodeURIComponent(cookie[0]) === key) {
        return decodeURIComponent(cookie[1]);
      }
    }
    // 没有查找到指定的 key 对应的 value 值，则返回 null
    return null;
  }

  /* 存入 设置 */
  // 设置 options 默认为空对象
  options = options || {};
  // key = value，对象 key，value 编码
  let cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
  // 失效时间
  if (typeof options.expires !== "undefined") {
    // 有配置失效时间
    if (typeof options.expires === "number") {
      // 失效时间为数字
      var days = options.expires,
        t = (options.expires = new Date());
      t.setDate(t.getDate() + days);
    }
    cookie += ";expires=" + options.expires.toUTCString();
  }
  // 路径
  if (typeof options.path !== "undefined") cookie += ";path=" + options.path;
  // 域名
  if (typeof options.domain !== "undefined") cookie += ";domain=" + options.domain;
  // 安全连接
  if (options.secure) cookie += ";secure";

  // 保存
  document.cookie = cookie;
};

// 从所有的 cookie 中删除指定的 cookie
export const RemoveCookie = (key, options) => {
  options = options || {};
  // 将失效时间设置为 1 天前
  options.expires = -1;
  Cookie(key, "", options);
};

```

# cookie for mdn

[cookie for mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

# js-cookie npm

[js-cookie npm](npmjs.com/package/js-cookie);
