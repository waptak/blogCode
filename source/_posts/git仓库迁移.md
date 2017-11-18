---
title: git仓库迁移
date: 2017-11-18 13:19:09
tags: git
categories: 操作备忘
---

### 从原地址克隆一份裸版本库
```bash 
git clone --bare git://github.com/username/project.git
```

### 到新的git服务器上创建新项目 newProject

### 以镜像推送方式上传代码到服务器上
```bash
cd project.git
git push --mirror git@gitlab:group/newproject.git
```

### 删除本地代码
```bash
cd ..
rm -rf project.git
```

### 从新服务器上clone
```bash
git clone git@gitlab:group/newproject.git
```