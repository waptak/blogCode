---
title: WSL2 安装 Ubuntu 18.04
date: 2021-07-16 17:32:06
tags: [WSL2, ubuntu, linux]
---

## [官方教程网址](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10#manual-installation-steps)

* 可以在`控制面板`--> `程序` --> `启动和关闭功能`处开启，也可以使用以下命令开启
  ```bash
  # 启用适用于 Linux 的 Windows 子系统
  dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
  # 启用虚拟机功能
  dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
  ```

* **`重启电脑`（重要）**

* 下载 Linux 内核更新包，并安装。见官网链接
* 已管理员身份开启PowerShell
  ```bash
  wsl --set-default-version 2
  ```
* 到 Microsoft Store 选择 Ubuntu 18.04 安装


## 默认使用`root`
* 管理员身份打开PowerShell
```bash
# 到ubuntu应用目录，`CanonicalGroupLimited.Ubuntu18.04onWindows_79rhkp1fndgsc`目录名可能不一样
cd "C:\Users\<用户目录>\AppData\Local\Microsoft\WindowsApps\CanonicalGroupLimited.Ubuntu18.04onWindows_79rhkp1fndgsc"
ubuntu1804.exe config --default-user root
```

## 启动命令（包括固定ip，启动ssh，启动docker）,需管理员运行
```bat
:: 设置固定IP
wsl -d Ubuntu-18.04 -u root ip addr add 192.168.50.2/24 broadcast 192.168.50.255 dev eth0 label eth0:1
netsh interface ip add address "vEthernet (WSL)" 192.168.50.1 255.255.255.0

:: 启动 ssh
:: 或者 wsl -d Ubuntu-18.04 -u root -e /etc/init.d/ssh restart
wsl -d Ubuntu-18.04 -u root service ssh restart

:: 启动docker
:: wsl -d Ubuntu-18.04 -u root service docker restart

pause

```

##　重启命令,需管理员运行
```bat
net stop LxssManager
net start LxssManager
pause
```

## 更换源 `/etc/apt/sources.list` [清华镜像站](https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/)
```bash
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse

```

## 使用windows的代理，打开当前用户的`.bashrc` , 添加以下内容
```bash
hostip=$(cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }')
wslip=$(hostname -I | awk '{print $1}')
port=7890

poff(){
    unset http_proxy
    unset https_proxy
    echo -e "已关闭代理"
}
pon() {
    export no_proxy="localhost,127.0.0.1,localaddress,.localdomain.com"
    export http_proxy="http://${hostip}:${port}"
    export https_proxy=$http_proxy
    echo -e "已开启代理"
}

test_setting(){
    echo "Host ip:" ${hostip}
    echo "WSL ip:" ${wslip}
    echo "Current proxy:" $https_proxy
}

```

## 问题记录
* SSH访问失败问题
  * 缺少 ssh_host_rsa_key ssh_host_ecdsa_key ssh_host_ed25519_key
    ```bash
    $ service ssh restart
    # 重启ssh服务提示
    Could not load host key: /etc/ssh/ssh_host_rsa_key
    Could not load host key: /etc/ssh/ssh_host_ecdsa_key
    Could not load host key: /etc/ssh/ssh_host_ed25519_key

    # 重新生成 key
    $ ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
    $ ssh-keygen -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key
    $ ssh-keygen -t ed25519 -f /etc/ssh/ssh_host_ed25519_key
    
    $ service ssh restart

    ```
* 局域网访问 需端口映射
```bat
:: 列出所有映射
netsh interface portproxy show all
:: 增加端口 也可以用 listenaddress=*
netsh interface portproxy add v4tov4 listenport=9898 listenaddress=0.0.0.0 connectport=9898 connectaddress=192.168.50.2 protocol=tcp
:: 删除端口
netsh interface portproxy delete v4tov4 listenport=9898 listenaddress=0.0.0.0
```

* windows无法被ubuntu访问， [见官方issue](https://github.com/microsoft/WSL/issues/4171)
  * 打开高级防火墙
  * 添加入站规则 ==》 自定义 ==》协议类型选择`ICMPV4`
