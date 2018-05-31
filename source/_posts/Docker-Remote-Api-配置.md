---
title: Docker Remote Api 配置
date: 2018-05-31 08:41:59
tags: [docker,ubuntu,linux]
categories: docker
---

# Docker Remote Api 相关配置

*基于Ubuntu 16.04 ,  Docker Version 18.05.0-ce , API Version: 1.37*

## 开启API
```bash
$ sudo vim /lib/systemd/system/docker.service

#修改
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:1234

#重启
$ sudo systemctl daemon-reload
$ sudo service docker restart

#测试
$ curl http://localhost:1234/version

```

  > 输出内容
```json
{"Platform":{"Name":""},"Components":[{"Name":"Engine","Version":"18.05.0-ce","Details":{"ApiVersion":"1.37","Arch":"amd64","BuildTime":"2018-05-09T22:14:32.000000000+00:00","Experimental":"false","GitCommit":"f150324","GoVersion":"go1.9.5","KernelVersion":"4.4.0-31-generic","MinAPIVersion":"1.12","Os":"linux"}}],"Version":"18.05.0-ce","ApiVersion":"1.37","MinAPIVersion":"1.12","GitCommit":"f150324","GoVersion":"go1.9.5","Os":"linux","Arch":"amd64","KernelVersion":"4.4.0-31-generic","BuildTime":"2018-05-09T22:14:32.000000000+00:00"}

```

# 部分接口 
  ```
  # 获取所有容器信息
  GET /containers/json

  # 获取指定容器信息
  GET /containers/(id)/json

  # 获取指定容器信息
  GET /containers/(id)/logs

  # 导出容器
  GET /containers/(id)/export

  # 启动容器
  POST /containers/(id)/start

  # 停止容器
  POST /containers/(id)/stop

  # 终止容器
  POST /containers/(id)/kill
  ```
  

