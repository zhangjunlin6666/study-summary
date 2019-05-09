#! /bin/bash
git add .
git commit -m '内容更新'
git push origin master
# 每次都下载新的插件
gitbook install
# 编译
gitbook build