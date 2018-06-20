---
title: docker常用命令记录
date: 2018-01-05 13:32:45
tags: [docker]
categories: docker
---

### 常用命令
```bash
#镜像下载
$ docker pull ubuntu:16.04 #镜像：版本号

#镜像列表
$ docker image ls
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              16.04               00fd29ccc6f1        2 weeks ago         111MB
jenkins             latest              5fc84ab0b7ad        3 weeks ago         809MB
mysql               5.7.20              7d83a47ab2d2        3 weeks ago         408MB
nginx               1.10.3              0346349a1a64        9 months ago        182MB
redis               3.0.6               d4deec2c521c        24 months ago       151MB

#删除镜像
$ docker image rm <镜像> #镜像短 ID、镜像长 ID、镜像名 或者 镜像摘要

#容器运行
$ docker run -it --rm \ #-i：交互操作，-t：终端： --rm：退出容器就删除 
    ubuntu:16.04 \ #以镜像为启动容器
    bash # 在镜像后的是命令 bash是进入交互式shell

#容器已运行后 再进入shell
$ docker exec -it <容器ID> bash
```



### Ngix 容器 （挂载宿主机配置）
```bash
docker run -d \  
  --name nginx-uat \  
  -p 80:80 \
  -p 9000:9000 \
  -v /home/test/nginxConf/nginx.conf:/etc/nginx/nginx.conf:ro \ # ro 表示只读  不写则可读可写 或 rw
  -v /home/test/nginxConf/default:/etc/nginx/sites-available/default:ro \
  nginx:1.10.3
```


### redis 容器 （挂载宿主机配置,根conf需提供相对应版本）
```bash
docker run -d --name redis-test  -p 6379:6379  \
-v /var/www/redis/redis.conf:/usr/local/etc/redis/redis.conf \
-v /var/www/redis/data:/data \
redis \
redis-server /usr/local/etc/redis/redis.conf

```

### mysql 容器（挂载宿主机配置）
```bash
docker run -d  --name mysql-test  -p 3033:3306 -e MYSQL_ROOT_PASSWORD=123456  -v /var/www/mysql/mysqld.cnf:/etc/mysql/mysql.conf.d/mysqld.cnf:ro --restart=always  mysql:5.7.20
```
