---
title: Ubuntu 16.04 自动备份 mysql
date: 2018-03-13 14:16:11
tags:
---

### 新建备份程序
```bash
$ mkdir /home/bak/
$ cd /home/bak/
$ vim bakmysql
#日期参数
rq=`date +%Y%m%d`
#备份命令 例如：用户名和密码都为root 要备份的数据库名 database
mysqldump -uroot -proot database > /home/bak/mysql$rq.sql
```

### 为备份程序添加权限
```bash
# 表示 +（添加）x（执行）的权限  也可 chmod 777
$ chmod +x /home/bak/bakmysql
```

### 修改/etc/crontab
```bash
$ vim /etc/crontab
#每天3点30分执行
30 3 * * * root /home/bak/bakmysql
```

### 重启crontab
```bash
$ service crond start #启动服务
$ service crond stop #关闭服务
$ service crond restart #重启服务

#发行版本没有service这个命令时
/etc/init.d/cron stop
/etc/init.d/cron start
```
