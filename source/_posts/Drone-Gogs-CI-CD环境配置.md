---
title: Drone + Gogs CI-CD环境配置
date: 2018-05-10 08:45:35
tags: docker,gogs,drone,ubuntu,linux
categories: docker
---

# 安装 docker-compose (需先安装pip且在6.0版本及以上)
```bash
sudo pip install docker-compose
```
# 新建 docker-compose.yaml 文件
```bash
version: '2'

services:
  drone-server:
    image: drone/drone:0.8

    ports:
      - 8000:8000
      - 9000
    volumes:
      - /var/lib/drone:/var/lib/drone/
    restart: always
    environment:
      - DRONE_OPEN=true      
      - DRONE_HOST=http://XXXXXX # drone的访问地址
      # gogs 配置
      - DRONE_GOGS=true
      - DRONE_GOGS_URL=http://XXXXXX # gog访问网址
      - DRONE_GOGS_GIT_USERNAME=XXXXXX  # gog登录用户名
      - DRONE_GOGS_GIT_PASSWORD=XXXXXX # gog登录密码
      - DRONE_GOGS_PRIVATE_MODE=true

  drone-agent:
    image: drone/agent:0.8

    restart: always
    depends_on:
      - drone-server
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - DRONE_SERVER=drone-server:9000
      - DRONE_SECRET=${DRONE_SECRET}


```
