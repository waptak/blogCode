---
title: docker compose 部署mongodb相关记录
date: 2019-07-11 09:31:25
tags: [docker,ubuntu,linux]
---

### docker-compose 发布mongodb
```yml
version: '3'
services:
  mongo:
    image: mongo:4.1.13
    restart: always
    volumes:
    # 数据挂载
    - ./mongodb/data/db:/data/db
    # 备份目录挂载
    - ./mongodb/backup:/data/backup:rw
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root 
```

### 进入容器 备份命令
```bash
$ docker-compose exec mongo /bin/sh
# dump出 publish表  用户 root 密码 root  
$ mongodump -d publish -u root -p root --authenticationDatabase admin -o /data/backup
# export出 collection
$ mongoexport -d publish -u root -p root --authenticationDatabase admin  -c servers -o /data/backup/json/server.json
```

### 恢复命令
```bash
# restore导入 --drop为删除原表后还原
mongorestore -d publish -u root --password root --authenticationDatabase admin /data/backup/publish   --drop
# import导入
# 使用备份文件/data/mongobackup/servers.json导入数据到publish数据库的servers集合中,--upsert表示更新现有数据,如果不使用--upsert,则导入时已经存在的文档会报_id重复,数据不再插入.也可以使用--drop删除原数据.
mongoimport -d publish -u root --password root --authenticationDatabase admin -c servers /data/backup/json/server.json --upsert

```

### 使用docker compose 备份命令，可用于宿主机定时任务
```bash
$ docker-compose exec -T <mongo容器名称> mongodump -d publish -u root -p root --authenticationDatabase admin -o /data/backup
```