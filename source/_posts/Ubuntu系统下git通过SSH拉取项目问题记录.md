---
title: Ubuntu系统下git通过SSH拉取项目问题记录
date: 2017-12-14 17:57:04
tags: git
categories: 操作备忘
---

# ***~/.ssh*** 目录和文件权限
```bash
#不可用 sudo 否则是属于root用户 不用root用户可能读取不到此文件配置 导致以下提示：
#ssh: Could not resolve hostname gogs: Name or service not known
#fatal: Could not read from remote repository.
$ vim config 

#Bad owner or permissions on /home/uat/.ssh/config
$ sudo chmod 600 ~/.ssh/config

#git clone 报错 Load key "/home/uat/.ssh/xxxxx": bad permissions
$ sudo chmod 600 ~/.ssh/xxxxx
```
