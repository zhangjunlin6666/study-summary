#判断当前分支是否是gh-pages，如果是就执行判断后面的脚本
d=`git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3`
echo $d
if [ $d != "gh-pages" ];then
    echo '当前分支不是gh-pages分支不能执行该脚本';
    exit 0;
fi
# 先拉取master的代码
git pull origin master
# 删除当前
rm -fr *.md classification/**/*.md book.json push.sh
# 判断是否有_book文件
if [ -d "_book" ]; then
    echo '删除啦'
    # 将目录_book下的文件复制到当前目录下
    cp -r _book/* .
    # 删除_book文件夹
    rm -rf _book
fi
# 提交至github仓库
git add .
git commit -m '内容更新'
git push origin gh-pages