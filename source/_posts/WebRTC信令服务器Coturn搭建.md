---
title: WebRTC信令服务器Coturn搭建(ubuntu)
date: 2020-08-15 10:59:56
tags: [linux,ubuntu,WebRTC]
---

# Coturn服务器搭建(turn  stun)
# 防火墙开放3478端口

## 安装依赖
```bash
# 
$ apt-get install openssl libssl-dev make

# libevent 下载编译
$ wget https://github.com/libevent/libevent/releases/download/release-2.1.10-stable/libevent-2.1.10-stable.tar.gz
$ tar -zxvf libevent-2.1.10-stable.tar.gz
$ cd libevent-2.1.10-stable
$ ./configure
$ make & make install

## 用户信息默认保存在sqlite ,也可以使用mysql
$ apt-get install sqlite libsqlite3-dev
```

## 下载coturn源码并编译
```bash
# 编译
$ wget https://github.com/coturn/coturn/archive/4.5.1.1.tar.gz
$ tar -zxvf 4.5.1.1.tar.gz
$ cd coturn-4.5.1.1
$ ./configure
$ make & make install
# 查看
$ which turnserver
# 签名证书
openssl req -x509 -newkey rsa:2048 -keyout /etc/turn_server_pkey.pem -out /etc/turn_server_cert.pem -days 99999 -nodes 
```

## 修改配置 `/usr/local/etc/turnserver.conf`
```bash
# 复制默认版本
$ cp /usr/local/etc/turnserver.conf.default /usr/local/etc/turnserver.conf

relay-device=eth0 # 网卡
listening-ip=x.x.x.x # 内网地址  
listening-port=3478 
tls-listening-port=5349
relay-ip=x.x.x.x # 内网地址
external-ip=x.x.x.x # 外网地址
relay-threads=50
lt-cred-mech
cert=/etc/turn_server_cert.pem # 上面生成的证书
pkey=/etc/turn_server_pkey.pem # 上面生成的证书
pidfile="/var/run/turnserver.pid"
min-port=49152
max-port=65535
user=xxxx:123456 # 用户名和密码
cli-password=123456 # 不指定会抛错

```

## 启动服务
```bash
$ turnserver -o -a -f -user=xxxx:123456 -r jiangsu
# 验证端口
$ lsof -i:3478
```

## 穿透监测网址 [https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/)
```javascript
let iceServer = {
    iceServers: [      
      {
        url: "stun:xxx:3478"
      },
      {
        urls: "turn:xxxx:3478",
        username: "xxxx",
        credential: "123456",
      },
    ],
  };

```

