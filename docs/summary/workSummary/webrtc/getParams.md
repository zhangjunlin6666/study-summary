<!--
 * @Author: jackson
 * @Date: 2020-05-25 22:31:39
 * @LastEditors: jackson
 * @LastEditTime: 2020-05-25 22:39:42
-->

# 获取当前摄像头、麦克风是否开启的参数

``` javascript

export function checkMedia(constraints = { video: true, audio: true }){
    return  new Promise((resolve, inject) => {
        // 当前浏览器是否支持mediaDevices api
        if(!navigator.mediaDevices){
            inject(false)
        } else {
            navigator.mediaDevices
            .getUserMedia(constraints)
            .then(stream => {
                // 如果video或者audio只检测一个
                if(!constraints.video || !constraints.audio){
                    resolve(true);
                } else {
                    // 获取当前音频轨道和视频轨道
                    const getAudioTracks = stream.getAudioTracks(),
                            getVideoTracks = stream.getVideoTracks(),
                            media = {
                                audio: true,
                                video: true
                            };
                    // 判断是否有音频轨道，没有就没有开启麦克风
                    if(!getAudioTracks.length){
                        media.audio = false
                    };
                    // 判断是否有视频轨道，没有就没有开启摄像头
                    if(!getVideoTracks.length){
                        media.video = false;
                    }

                    resolve(media);
                }
            }).catch(err => {
                resolve(false);
            })
        }
    })
}
/**
 *  type为audio时，只检测麦克风是否可用
 *  type为video时，只检测摄像头是否可用
 *  type为both时，检测麦克风和摄像头
 *  当为both时，分为四种情况：
 *        当为boolean（true、false）值时，表示当前有可用的麦克风和摄像头设备或者无设备
 *        当为string（video、audio）值时，表示有摄像头无麦克风或者有麦克风无摄像头 
 */
export async function returnCheckResult(type){
    let constraints = {};
    switch(type){
        case "audio":
            constraints = {
                audio: true
            };
            break;
        case "video":
            constraints = {
                video: true
            };
            break;
        case "both":
            constraints = {
                video: true,
                audio: true
            };
            break;
    };
    const result = await checkMedia(constraints);
    if(typeof result === "boolean"){
        return Promise.resolve(result);
    } else {
        const { video, audio } = result;
        if(video && audio){
            return  Promise.resolve("bothIsTrue");
        } else if(!video && !audio){
            return Promise.resolve("bothIsFalse");
        } else if(video && !audio){
            return Promise.resolve("onlyVideo");
        } else if(!video && audio){
            return Promise.resolve("onlyAudio");
        }
    }
}

// 两个都检测
export async function outputConfig(type){
    const result = await returnCheckResult(type);
    let constraints;
    switch(type){
        case "audio":
            constraints = {
                audio: result
            };
            break;
        case "video":
            constraints = {
                video: result
            };
            break;
        case "both":
            if(typeof result === "boolean"){
                constraints = result; // 此时的boolean值为false
            } else {
                if(result === "bothIsTrue"){
                    constraints = {
                        video: true,
                        audio: true
                    };
                } else if(result === "bothIsFalse"){
                    constraints = {
                        video: false,
                        audio: false
                    };
                } else if(result === "onlyVideo"){
                    constraints = {
                        video: true,
                        audio: false
                    };
                } else if(result === "onlyAudio"){
                    constraints = {
                        video: false,
                        audio: true
                    };
                }
            }
            break;
    }
    return constraints;
}

```

# 用法

``` javascript

// 检测麦克风和摄像头
let result = await outputConfig("both"), obj = { video:true,audio:true };
if(typeof result === "boolean" && result === false){
    const video = await outputConfig("video"), audio = await outputConfig("audio");
    obj = {
        ...video,
        ...audio
    }
} else {
    obj = result;
};

```

# webrtc for 阮一峰

[webrtc简介](http://w3cbus.com/htmlapi/webrtc.html)