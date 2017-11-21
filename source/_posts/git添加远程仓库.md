---
title: git添加远程仓库
date: 2017-11-21 11:19:56
tags: git
---

### 没有本地仓库
``` bash
$ git init
$ git add .
$ git commit -m "first commit"
$ git remote add origin https://xxx.git
$ git push -u origin master
```

### 本地仓库已存在
``` bash
$ git remote add origin https://xxx.git
$ git push -u origin master
```
