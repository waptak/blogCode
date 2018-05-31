---
title: docker-jenkin-node项目-自动化部署记录
date: 2018-01-05 13:59:07
tags: docker,ubuntu,node,linux
categories: docker
---
### docker 安装 jenkin
```bash
docker pull jenkin:latest

```

### Publish Over SSH 插件安装

### Publish Over SSH 配置
* jenkin容器 生成 ssh key
```bash
ssh-keygen -t rsa
```

* jenkin容器 在.ssh目录生成config文件 并设置权限 chmod 600 ~/.ssh/config
```bash
#用于ssh登录宿主机
host sshHost #自定义名称
user test #宿主机登录的用户名
hostname 192.168.18.112 #宿主机IP
port 22 #ssh 端口
identityfile ~/.ssh/jenkins #容器内私钥

#用于拉取git项目
host gitlab
user git
hostname 192.168.18.111
port 22
identityfile ~/.ssh/jenkins
```

* 将jenkin容器生成的公钥放入宿主机.ssh目录 并加入authorized_keys
```bash
cat jenkins.pub >> authorized_keys
```


* jenkin容器 测试连接宿主机
```bash
$ ssh sshHost
```

* jenkin 配置 ssh
```bash
key #填写jenkin容器内生成的私钥
ssh server
    Name : #随意填写 用于系统内选择 
    Hostname : 192.168.18.112 #宿主机名称
    Username : test #宿主机用于登录的用户名
```
### GIT项目增加jenkin.pub 公钥


### 项目配置
* 源码管理 选择git
```bash
Repository URL ： git@gitlab:human/demo/human.bus.git # git 服务器用户   gitlab: config配置的host
Credentials ： #选择SSH Username with private key 填写jenkin容器内生成的私钥
```

* 构建环境 选择 Send files or execute commands over SSH after the build runs
```bash
Exec command : 

$ docker stop node || true \ #停止容器
     && docker rm node || true \ #删除容器
     && cd /home/test/jenkins_node/workspace/nodeBus \  #项目目录
     && docker build --rm --no-cache=true  -t node  - < Dockerfile \ #删除
     && docker run -d  --name node -p 7000:7000 \ #根据项目端口设置
     -v /home/test/jenkins_node/workspace/nodeBus:/home/project \ #挂载项目目录
     node:8.9.3
```

### Dockerfile 放入项目根目录（简易内容）
```bash
FROM node:8.9.3

MAINTAINER biake <zhoubin@uu1x.com>

WORKDIR /home/project 

EXPOSE 7000 #根据项目端口设置

CMD ["npm","start"]
```

### package.json npm 命令设置
```bash
"scripts": {
    "start": "npm install . && node ./app.js"
  },
```

## Git push 后自动构建
* jenkins --> 首页 --> 用户
* 设置 --> 点击 "show API Token"
* 复制API Token内容，返回首页 --> node --> 配置 --> 构建触发器 --> 选择 "触发远程构建" -->粘贴"API Token"内容到"身份验证令牌"
* 登录gitlab 选择项目 settings --> Integrations 
```bash
url : http://192.168.18.112:49002/job/nodeBus/build?token=<jenkin用户的token>
```
* jenkins首页，选择 系统管理-->Configure Global Security
```bash
勾选 Allow anonymous read access
去除勾选 防止跨站点请求伪造
```
