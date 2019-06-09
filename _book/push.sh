#! /bin/bash
#判断当前分支是否是master，如果是就执行判断后面的脚本
d=`git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3`
echo $d
if [ $d != "master" ];then
    echo '当前分支不是master分支不能执行该脚本';
    exit 0;
fi
# 先通过gitbook build构建html，并提交
gitbook build
git add .
git commit -m '内容更新'
git push origin master