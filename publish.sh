# 切换到该分支后，执行该脚本，首先删除除了.sh、.gitignore文件
rm -fr `ls ./ | egrep -v '(publish.sh|.gitignore)'`
# 将master的代码合并到当前分支
git fetch all
git reset --hard origin/gh-pages
git pull origin master
# 删除当前目录下以part开头、以.md为结尾的文件
rm -fr *.md part*/*.md book.json 
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