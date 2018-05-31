---
title: gitlab-runner 配置
date: 2018-05-20 09:00:52
tags: [docker,gitlab,gitlab-runner,ubuntu,linux]
categories: gitlab
---



## gitlab runner 安装

  1. 非docker安装
```bash
$ curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash

$ sudo apt-get install gitlab-runner
# 注册
$ sudo gitlab-runner register
```

  2. docker 安装
```bash
#启动容器
$ docker run -d --name gitlab-runner --restart always \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  -v /var/run/docker.sock:/var/run/docker.sock \
  gitlab/gitlab-runner:latest

# 注册
$ docker exec -it gitlab-runner gitlab-runner register
```


## 注册
```bash

#Running in system-mode.                            
                                                   
#Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):
http://192.168.18.111/
#Please enter the gitlab-ci token for this runner:
#查看gitlab的token
#Please enter the gitlab-ci description for this runner:
[ubuntu]: runner
#Please enter the gitlab-ci tags for this runner (comma separated):
gitlab-runner
#Whether to run untagged builds [true/false]:
[false]: true
#Whether to lock the Runner to current project [true/false]:
[true]: true
#Registering runner... succeeded                     runner=vmYsE-7g
#Please enter the executor: parallels, ssh, virtualbox, docker+machine, docker-ssh+machine, kubernetes, docker, docker-ssh, shell:
docker
#Please enter the default Docker image (e.g. ruby:2.1):
node:8.9.3 # aspnetcore 使用microsoft/aspnetcore-build:2.0
#Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded! 

```


# 问题
```bash
# ERROR: Failed to create container volume for /builds/human/demo Failed to import image: Error response from daemon: exec: "xz": executable file not found in $PATH
# ERROR: Preparation failed: Failed to import image: Error response from daemon: exec: "xz": executable file not found in $PATH
$ sudo apt-get install -y xz-utils

```



