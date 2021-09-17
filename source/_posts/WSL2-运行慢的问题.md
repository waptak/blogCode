---
title: WSL2 运行慢的问题
date: 2021-09-05 11:30:56
tags: [WSL2]
---

### 问题描述 官方issue (https://github.com/microsoft/WSL/issues/4197)
* 项目放在挂载的`/mnt`目录会有I/O 慢的问题

### 解决
* 项目文件不要放在`/mnt`目录即可