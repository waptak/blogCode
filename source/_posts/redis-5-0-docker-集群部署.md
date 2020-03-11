---
title: redis 5.0 + docker 集群部署
date: 2020-03-11 10:16:26
tags: [redis,docker,cluster,linux]
categories: docker
---

# redis 5.0 + docker集群配置

> ## 踩坑说明
* docker容器`network_mode`没有使用`host`模式，最初不想改变内部端口，只改对外端口，没用`host`模式。虽然组建集群成功，但有如下情况
  * redis内部redirect时会自动内部分配的ip，导致和外部网络不在同一网段
  * 出现的结果：用redis-cli进入容器操作都正常，但外部项目使用或者redis工具查看操作时就卡住
  * nodejs项目中使用ioredis测试，写入和读取都没有反应，也不报错

* 防火墙端口相关，被自己的mac坑了半天，建议不要在mac上测试了，服务器上的话也关了防火墙试，测试成功再开放端口测试

> ## 综上改回`host`模式测试成功，以下记录部署流程，多台其实一样
* 新建6个目录`redis_<端口>`

* 准备`redis.conf`文件，放在新建的目录中，根据不同端口修改以下参数
  ```conf
  # 考虑安全起见，可以配置成被访问的网卡ip
  bind 0.0.0.0
  # 自己定义端口
  port 6375
  # 建议和端口一致
  pidfile /var/run/redis_6375.pid
  # 集群时访问密码，和requirepass设置成一致相对方便
  masterauth 123456
  requirepass 123456
  # 开启集群
  cluster-enabled yes
  # 建议和端口一致，不要与其他容器的重名，看到有人重名后有问题
  cluster-config-file nodes-6375.conf
  # 持久化，根据自己需求修改，不是必须的
  appendonly yes
  ```

* docker-compose.yml 配置文件
  ```yml
  version: '3.4'
  # 共用配置项
  x-image:
    &default-image
    redis:5.0
  x-command:
    &default-command
    ["redis-server", "/etc/redis/redis.conf"]  
  x-netmode:
    &default-netmode
    host

  # 容器配置
  services:
    redis_slave_1:    
      image: *default-image
      restart: always
      container_name: redis_slave_1
      volumes:
        - ./redis_6371/redis.conf:/etc/redis/redis.conf 
        - ./redis_6371/data:/data
      environment: 
        - TZ=Asia/Shanghai
      command: *default-command
      network_mode: *default-netmode

    redis_slave_2:    
      image: *default-image
      restart: always
      container_name: redis_slave_2
      volumes:
        - ./redis_6372/redis.conf:/etc/redis/redis.conf 
        - ./redis_6372/data:/data
      environment: 
        - TZ=Asia/Shanghai
      command: *default-command
      network_mode: *default-netmode

    redis_slave_3:    
      image: *default-image
      restart: always
      container_name: redis_slave_3
      volumes:
        - ./redis_6373/redis.conf:/etc/redis/redis.conf 
        - ./redis_6373/data:/data
      environment: 
        - TZ=Asia/Shanghai
      command: *default-command
      network_mode: *default-netmode

    redis_slave_4:    
      image: *default-image
      restart: always
      container_name: redis_slave_4
      volumes:
        - ./redis_6374/redis.conf:/etc/redis/redis.conf 
        - ./redis_6374/data:/data
      environment: 
        - TZ=Asia/Shanghai
      command: *default-command
      network_mode: *default-netmode
    redis_slave_5:    
      image: *default-image
      restart: always
      container_name: redis_slave_5
      volumes:
        - ./redis_6375/redis.conf:/etc/redis/redis.conf 
        - ./redis_6375/data:/data
      environment: 
        - TZ=Asia/Shanghai
      command: *default-command
      network_mode: *default-netmode

    redis_slave_6:    
      image: *default-image
      restart: always
      container_name: redis_slave_6
      volumes:
        - ./redis_6376/redis.conf:/etc/redis/redis.conf 
        - ./redis_6376/data:/data
      environment: 
        - TZ=Asia/Shanghai
      command: *default-command
      network_mode: *default-netmode
  ```
* 启动容器
  ```bash
  $ docker-compose up -d
  ```
* 使用镜像`goodsmileduck/redis-cli:v5.0.3` 创建集群，多台服务器就根据ip修改
  ```bash
  # -a 表示连接密码
  # --cluster-replicas 1 表示 一主一从
  # --cluster create 后面表示需要集群的redis主机和端口
  $ docker run --rm -it goodsmileduck/redis-cli:v5.0.3 redis-cli -a 123456 --cluster-replicas 1 --cluster create 192.168.30.111:6371 192.168.30.111:6372 192.168.30.111:6373 192.168.30.111:6374  192.168.30.111:6375 192.168.30.111:6376
  ```
* 连接一台测试，也可以用可视化工具
  ```bash
  $ docker run --rm -it goodsmileduck/redis-cli:v5.0.3 redis-cli -c -h 192.168.30.111 -p 6371 -a 123456
  ```

> ## 顺便写下nodejs中ioredis使用
```javascript
var Redis = require("ioredis");
var cluster = new Redis.Cluster([{
  port: 6371,
  host: '192.168.30.111',
}, {
  port: 6372,
  host: '192.168.30.111',
}], {
  redisOptions: {
    password: "123456",
    // scaleReads:'slave'
  }
});
cluster.set("foo", "bar");
cluster.get("foo", function(err, res) {

});
```
