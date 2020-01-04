###
 # @Author: jackson
 # @Date: 2020-01-03 11:49:25
 # @LastEditors  : jackson
 # @LastEditTime : 2020-01-04 17:28:42
 ###
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/zhangjunlin6666/study-summary.git master:gh-pages

cd -