#! /bin/bash
gitbook build
git add .
git commit -m '内容更新'
git push origin master