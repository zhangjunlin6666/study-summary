<!--
 * @Author: jackson
 * @Date: 2020-05-25 22:53:48
 * @LastEditors: jackson
 * @LastEditTime: 2020-05-25 22:59:12
--> 
# 获取base64的图片

``` javascript

export function getBase64Image(url) {
	return new Promise((resolve, reject) => {
		var image = new Image();
		image.crossOrigin = '';
		image.src = url;
		image.onload = function () {
			var canvas = document.createElement("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
	
			var ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0, image.width, image.height);
			var ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();
			var dataURL = canvas.toDataURL("image/" + ext);
			resolve(dataURL)
		}
	})
}

```

# 函数防抖

``` javascript

let timer = null;
export default function debounce(cb, time = 60){
    clearTimeout(timer);
    timer = setTimeout(() => {
        cb && cb()
    }, time);
}

```

# 函数节流

``` javascript

let bool = false;
export default function throttle(cb, time = 60){
    if(bool) {
        return;
    }
    bool = true;
    setTimeout(() => {
        bool = false;
        cb && cb();
    }, time)
}

```