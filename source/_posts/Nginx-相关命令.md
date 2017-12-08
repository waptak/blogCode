---
title: Nginx 相关命令
date: 2017-12-08 09:11:49
tags: Nginx
categories: 操作备忘
---
> 基础命令

### 安装Nginx
```bash
$ sudo apt-get install -y nginx
# ubuntu 16.04 目录 /usr/sbin
```

### 重启
```bash
$ sudo service nginx restart
```

### 查看版本和已有模块
```bash
$ sudo /usr/sbin/nginx -V
nginx version: nginx/1.10.3 (Ubuntu)
built with OpenSSL 1.0.2g  1 Mar 2016 (running with OpenSSL 1.0.2g-fips  1 Mar 2016)
TLS SNI support enabled
configure arguments: --with-cc-opt='-g -O2 -fPIE -fstack-protector-strong -Wformat -Werror=format-security -Wdate-time -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -fPIE -pie -Wl,-z,relro -Wl,-z,now' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-ipv6 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_addition_module --with-http_dav_module --with-http_geoip_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module --with-http_v2_module --with-http_sub_module --with-http_xslt_module --with-stream --with-stream_ssl_module --with-mail --with-mail_ssl_module --with-threads
```


> 配置

### http配置
``` bash
http {
    # 将80访问转发至8080
    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name _;
        location / {
                proxy_pass http://localhost:8080;
        }
    }
}
```

### tcp配置
``` bash
stream {    
	#tcp负载 根据权重轮流转发至113 和 114
    upstream hard_socket{
        #可选算法 
        #最少连接数 least_conn
        #最低平均延迟 least_time first_byte;
        #普通hash算法 hash $remote_addr consistent;
        hash $remote_addr consistent;

        #权重 weight ；最大连接数 max_conns ；连接失败超时 fail_timout ；  max_fails 最大连接失败数
        #以下为30s进行3次尝试失败认为server不可达
        server 192.168.18.113:9000 weight=1 max_fails=3 fail_timeout=30s; 
        server 192.168.18.114:9000 weight=1 max_fails=3 fail_timeout=30s;
    }

    #tcp 负载
    server {
        listen 12345;
        proxy_connect_timeout 10s;
        #连接维持时间，无数据传送则关闭连接
        proxy_timeout 30s;
        proxy_pass hard_socket;

        #health_check命令将会激活健康监测功能，当有health_check_timeout 将会覆盖掉这个proxy_timeout的值，作为健康监测超时时间应该是显著缩短
        #默认，nginx试着再每5s中连接每个server在upstream server组中。假如连接不能够被建立，nginx认为这个健康监测失败，标识他为不健康。停止连接该server。

        #interval ：发送健康请求间隔时间
        #passses : 多少连续的响应才算被考虑为健康的
        #fails ：多少次连续的失败响应才考虑为不健康的

        #health_check insterval=10 passes=2 fails=3;
        #health_check_timeout 5s;
    }

    #单一转发
    server {
        listen 45678;
        proxy_pass backend4.example.com:3000;
    }    
}
```

