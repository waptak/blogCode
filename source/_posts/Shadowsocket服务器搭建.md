---
title: Shadowsocket服务器搭建
date: 2018-04-11 09:04:25
tags: ubuntu,shadowsocket ,linux
categories: ubuntu
---

### Ubuntu 16.04 
```bash
apt-get install python-pip
pip install shadowsocks
```

### 已配置文件启动 使用
> 新建 /etc/shadowsocks.json 文件
```bash

## 单账号
{
    "server":"xxx.xxx.xxx.xxx", # 服务器IP
    "server_port":443,
    "local_address": "127.0.0.1",
    "local_port":1080,
    "password":"XXXXXX", # 密码自定义
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}

## 多账号
{
    "server":"xxx.xxx.xxx.xxx",
    "port_password": {
        "443": "XXXXXX", # 密码自定义
        "444": "XXXXXX"
    },
    "local_address": "127.0.0.1",
    "local_port":1080,    
    "timeout":300,
    "method":"aes-256-cfb",
    "fast_open": false
}



$ sudo chmod 755 /etc/shadowsocks.json

```

> 已配置文件启动 (后台运行加-d  不加则前台运行)
```bash
$ sudo ssserver -c /etc/shadowsocks.json -d start
$ sudo ssserver -c /etc/shadowsocks.json -d stop
```

### 开机启动 
> 编辑 /etc/rc.local 文件, 在 exit 0 这一行的 ***上边*** 加入如下
```bash
/usr/local/bin/ssserver –c /etc/shadowsocks.json
```

### 日志查看
```bash
$ sudo less /var/log/shadowsocks.log
```