#! /bin/bash
d=`git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3`
echo ${d}
# 先通过gitbook build构建html，并提交
gitbook build
git add .
git commit -m '内容更新'
git push origin master