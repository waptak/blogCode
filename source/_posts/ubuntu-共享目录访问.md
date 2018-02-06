---
title: ubuntu 16.04 共享目录访问
date: 2018-02-06 11:12:19
tags: linux
---

### 安装 ***samba*** 服务器
```bash
$ sudo apt-get install samba
# Linux客户端测试用
$ sudo apt-get install smbclient 
```
### 配置
  * 修改配置文件 
  ```bash
  $ sudo vim /etc/samba/smb.conf
  #在最后添加
  [share]
  path = /home/share #共享路径
  browseable = yes #该目录是否可显示
  writable = yes 
  comment = smb share test
  ```

  * 共享目录权限配置
  ```bash
  一般来说，该目录的权限为755，将其改为777之后，Owner之外的其他用户才有权限写入。
  $ sudo chmod 777 /home/share
  ```

  * 创建samba用户 ***（注意，创建samba用户之前，必须先确保有一个同名的Linux用户，否则samba用户会创建失败。）***
  ```bash
  #创建系统用户
  $ sudo groupadd smbuser -g 6000
  $ sudo useradd smbuser -u 6000 -g 6000 -s /sbin/nologin -d /dev/null
  
  #创建samba用户
  $ sudo smbpasswd -a smbuser
  ```

  * 重启samba服务
  ```bash
  $ sudo service smbd restart
  ```

### 客户端测试访问
  * Linux客户端访问测试
  ```bash
  $ smbclient -L //localhost/share
  ```

  * windows 访问测试 ***另外，在Windows客户端使用net use * /del /y这条命令可以清理访问缓存。***
  ```bash
  \\IP或主机名\\share
  #如果public = no，此时需要输入samba用户密码；如果public = yes，则作为nobody用户直接访问。
  ```
