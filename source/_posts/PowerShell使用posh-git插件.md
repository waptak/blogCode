---
title: PowerShell使用posh-git插件
date: 2017-11-30 12:46:59
tags: [git,powershell,posh-git]
categories: windows
---
## 项目地址 [https://github.com/dahlbyk/posh-git](https://github.com/dahlbyk/posh-git)

> ## 安装

### ***需要PowerShell version 5 以上***

### 打开 PowerShell 执行命令
``` bash
Set-ExecutionPolicy RemoteSigned
```

### 安装 posh-git
``` bash
Install-Module posh-git
# 如果没有安装Nuget 会提示自动安装安装输入Y

# 手动安装Nuget
Install-PackageProvider NuGet-Force
Import-PackageProvider NuGet-Force
```

### 更新posh-git
``` bash
Update-Module posh-git
```

> ## 配置
### 安装完后在C:\Users\ &lt;username&gt;\Documents\WindowsPowerShell添加文件profile.ps1，也可输入命令
``` bash
$profile.CurrentUserCurrentHost
```

### 在文件profile.ps1中添加内容：
``` bash
Import-Module posh-git
#可选内容
$GitPromptSettings.DefaultPromptSuffix='`n$(''>'' * ($nestedPromptLevel + 1)) '
$GitPromptSettings.DefaultPromptPrefix='[$(hostname)] '
$GitPromptSettings.DefaultPromptAbbreviateHomeDirectory=$true

```

### 修改powershell默认路径：右键属性修改起始位置

