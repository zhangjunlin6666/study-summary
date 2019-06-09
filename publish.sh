git pull origin master
rm -fr *.md part*/*.md book.json push.sh
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