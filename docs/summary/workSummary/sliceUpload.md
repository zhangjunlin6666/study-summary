<!--
 * @Author: jackson
 * @Date: 2020-05-27 23:26:18
 * @LastEditors: jackson
 * @LastEditTime: 2020-05-27 23:37:24
-->

# 分片上传

``` javascript
/*
 * @Author: jackson
 * @Date: 2020-01-08 17:32:21
 * @LastEditors  : jackson
 * @LastEditTime : 2020-01-09 19:55:55
 */
import SparkMD5 from "spark-md5";
import BaseModel from "@model/BaseModel";
import { Loading } from "element-ui";
const request = new BaseModel(); // axios的封装
export default function uploadFile(requestUrl, file) {
  // 得到md5码
  return new Promise((resolve, reject) => {
    getFileMD5(file, md5 => {
      file.md5 = md5; // 存储整个文件的md5码
      uploadChunk(requestUrl, file, 0).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  });
  
}

// currentChunk为上传文件块的索引
function uploadChunk(requestUrl, file, currentChunk) {
  return new Promise((resolve,reject) => {
    var fileReader = new FileReader(),
      chunkSize = 10485760, // 上传文件块的大小，可自定义，现在为10M
      chunks = Math.ceil(file.size / chunkSize),// 计算改文件的可分为多少块
      { md5, name, size } = file;
    // 文件切割后的回调，this.result为切割的文件块
    fileReader.onload = function(e) {
      const params = {
        chunks,
        md5,
        name,
        size,
        chunk: currentChunk,
        file: new Blob([e.target.result])
      };
      let loading = Loading.service({
        lock: true,
        text: "正在上传...",
        spinner: "el-icon-loading"
      });
      // 发送请求上传分片的文件
      request.post(requestUrl, params, false).then(res => {
        if(res.errno != 200){
          reject(res.error);
          loading.close();
          return false;
        }
        currentChunk++;
        if (currentChunk < chunks) {
          loadNext(); // 继续切割下一块文件
        } else {
          loading.close();
          resolve(res);
        }
      });
    };

    //处理单片文件的上传
    function loadNext() {
      var start = currentChunk * chunkSize, // 计算切割文件的开始索引
        end = Math.min(start + chunkSize, file.size); // 计算切割文件的结束索引
      fileReader.readAsArrayBuffer(file.slice(start, end)); // 切割文件并触发fileReader.onload
    }
    // 触发文件第一块上传
    loadNext();
  });
  
}

// 分片读取文件，获得文件md5
function getFileMD5(file, callback) {
  //声明必要的变量
  var fileReader = new FileReader(),
    chunkSize = 1048576, //文件每块分割1M，计算分割详情
    chunks = Math.ceil(file.size / chunkSize), // 总块数
    currentChunk = 0, // 当前第几块
    spark = new SparkMD5(); //创建md5对象（基于SparkMD5）

  fileReader.onload = function(e) { //每块文件读取完毕之后的处理
    spark.appendBinary(e.target.result); //每块交由sparkMD5进行计算
    currentChunk++;
    if (currentChunk < chunks) { //如果文件处理完成计算MD5，如果还有分片继续处理
      loadNext();
    } else {
      callback(spark.end());
    }
  };

  //处理单片文件的上传
  function loadNext() {
    var start = currentChunk * chunkSize,
      end = start + chunkSize >= file.size ? file.size : start + chunkSize;

    fileReader.readAsBinaryString(file.slice(start, end)); // 分段读取文件数据
  }

  loadNext();

}
```

# 分片上传组件, 基于vue

``` vue
<!--
 * @Author: jackson
 * @Date: 2020-01-08 19:04:07
 * @LastEditors  : jackson
 * @LastEditTime : 2020-01-14 17:07:37
 -->
<template>
    <div class="patch-upload-file-wrap">
        <input
            :action='action'
            :accept="accept"
            type="file"
            ref='files'
            style="display: none" 
            @change='selectFile'>
        <button
            @click='uploadFile'
            class='upload-file-btn'>
            <i class='el-icon-upload upload-file-icon'></i>上传文件</button>
        <div style="color: rgb(220, 223, 230);" slot="tip">支持扩展名：{{accept}}</div>
    </div>
</template>

<script>
import upload from './upload';
export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props:{
        accept: {
            type: String,
            default: ''
        },
        action:{
            type: String,
            required: true
        }
    },
    methods: {
        selectFile(e){
            let { name } = e.target.files[0],
                  accept = this.accept.split(','),
                  regArr = [];
            for(let i = 0, len = accept.length; i < len; i ++){
                regArr.push(new RegExp('(\\' + accept[i] + ')$', 'gi'))
            }
            const bool = regArr.some(item => {
                return item.test(name);
            })
            if(!bool){
                return this.$message.error(`请上传${this.accept}格式的文件!`);
            }
            upload(this.action, e.target.files[0]).then(data => {
                this.$refs.files.value = ''; // 这里很重要，当上传成功后，需要重置掉file的value值，不然不触发change事件
                this.$message.success('上传成功');
                this.$emit('uploadSuccess', data);
            }).catch(error => {
                this.$message.error(error);
            })
        },
        uploadFile(){
            this.$refs.files.click();
        },
    }
}
</script>

<style lang="less" scoped>
.upload-file-btn{
    width: 120px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: none;
    outline: none;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    color: #409EFF;
    cursor: pointer;
    .upload-file-icon{
        font-size: 20px;
        color: #C0C4CC;
        position: relative;
        top: 1px;
        margin-right:3px;
    }
}
</style>

```

# 用法

``` vue
<!--
 * @Author: jackson
 * @Date: 2019-12-20 10:58:08
 * @LastEditors: jackson
 * @LastEditTime: 2020-03-11 19:45:13
 -->
<template>
    <div>
        <patch-upload
            @uploadSuccess='uploadSuccess'
            action='你的上传请求接口'
            accept='上传文件的格式'
            />
    </div>
</template>

<script>
import patchUpload from "./../../components/patchUpload";
export default {
    data(){
        return {
        }
    },
    components: {
        patchUpload
    },
    methods: {
        // 上传成功
        uploadSuccess(res){
            console.log("上传成功后拿到的数据", res)
        }
    }
}
</script>

```
