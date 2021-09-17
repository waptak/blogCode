---
title: 迁移Docker Desktop 镜像文件 (WSL2)
date: 2021-08-17 11:26:40
tags: [docker , WSL2]
---

### 迁移目录，到 D:\WSL2
* 删除所有容器。
* 退出 Docker Desktop
* 迁移命令
  ```bash
  # 关闭所有
  wsl --shutdown

  # 查看是否都是 stop 状态
  wsl --list --verbose

  # 备份已有image数据
  wsl --export docker-desktop-data D:\WSL2\docker-desktop-data.tar

  # 注销当前的docker-desktop-data发行版, 该命令执行完成之后，再次使用wsl --list --verbose命令查看，docker-desktop-data就已经不在了。
  wsl --unregister docker-desktop-data
  
  # 重新导入备份的docker-desktop-data
  wsl --import docker-desktop-data D:\WSL2\docker-desktop-data D:\WSL2\docker-desktop-data.tar --version 2

  # 同上迁移 docker-desktop
  wsl --export docker-desktop D:\WSL2\docker-desktop.tar
  wsl --unregister docker-desktop
  wsl --import docker-desktop D:\WSL2\docker-desktop D:\WSL2\docker-desktop.tar --version 2

  # 查看状态
  wsl --list --verbose
  ```