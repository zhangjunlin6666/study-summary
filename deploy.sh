###
 # @Author: jackson
 # @Date: 2020-01-03 11:49:25
 # @LastEditors  : jackson
 # @LastEditTime : 2020-01-04 18:10:18
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
#git push -f https://github.com/zhangjunlin6666/study-summary.git master:gh-pages

# 如果使用 travis 持续集成 
# travis ci平台 https://www.travis-ci.org/zhangjunlin6666/study-summary/settings
# vuepress从搭建到部署 https://www.jianshu.com/p/a7435b8bc8bc
git push -f https://${access_token}@github.com/zhangjunlin6666/study-summary.git master:gh-pages

cd -