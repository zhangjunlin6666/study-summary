# 网速检测

``` javascript

function measureBW(fn,time) {
	time = time || 1;
	var startTime, endTime, fileSize;
	var count = time ;
	function measureBWSimple () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if(!fileSize){
                    fileSize = xhr.responseText.length;
                }
                count --;
                if(count <= 0){
                    endTime = Date.now();
                    var speed = fileSize * time  / ((endTime - startTime)/1000) / 1024;
                    fn && fn(Math.floor(speed));
                }
            }
        }
        xhr.onerror = err => fn && fn(0)
        xhr.open("GET", `当前项目下某个图片的路径?` + Math.random(), true);
        xhr.send();
	}
	startTime = Date.now();
	for(var x = time; x > 0; x--){
		measureBWSimple()
	}
}
function checkNet({ countDown = 200, time = 10, loop = false}, fn) {
	let checkNetCountDown = 0;
	let netArr = []
	loopFun({checkNetCountDown, countDown, time, loop},(speed) => {
		if (loop) {
			fn(exportText(speed),speed)
		} else {
			if (netArr.length >= time) {
				let average = netArr.reduce((acc, val) => acc + val, 0) / netArr.length;
				fn(exportText(average),average)
				return
			}
			netArr.push(speed)
		}
	})
}
function loopFun({ checkNetCountDown, countDown, time, loop }, fn) {
	measureBW(speed => {
		checkNetCountDown++
		if (loop) {
			fn && fn(speed)
			setTimeout(() => loopFun({ checkNetCountDown, countDown, time }, fn, loop), countDown)
		} else {
			fn(speed)
			setTimeout(() => {
				if (checkNetCountDown <= time) {
					loopFun({ checkNetCountDown, countDown, time,loop }, fn)
				}
			}, countDown)
		}
	});
}
function exportText(speed) {
	if (speed >= 1280) {
		return "优";
	} else if (speed >= 512) {
		return "良好";
	} else if (speed < 512 && speed > 0) {
		return "差";
	} else {
		return "无网络";
	}
}

export default {
	measureBW,
	checkNet
}
```

# 用法

``` javascript

import netUtil from "./network.js";

netUtil.checkNet({ countDown: 200, time: 10 }, (text, speed) => {
    console.log("当前网络文字描述",text);
    console.log("当前网络速度",speed)
});

```