---
title: gitlab操作命令
date: 2017-11-18 13:20:30
tags: [gitlab]
categories: gitlab
---

### 查看状态
``` bash
sudo gitlab-ctl status
```

### 启动，停止，重启
``` bash
#启动
sudo gitlab-ctl start

#停止
sudo gitlab-ctl stop

#重启
sudo gitlab-ctl restart
```

### 备份
``` bash
sudo gitlab-rake gitlab:backup:create
```

### gitlab配置文件 ***/etc/gitlab/gitlab.rb***
``` bash
#发件人配置
gitlab_rails['gitlab_email_from'] = 'gitlab@xxx.com'

gitlab_rails['gitlab_email_display_name'] = 'GitLab管理员'

gitlab_rails['gitlab_email_reply_to'] = 'gitlab@xxx.com'

#备份目录修改
gitlab_rails['backup_path'] = "/home/dev/gitlab_backup"

#邮件服务器配置(网易)
gitlab_rails['smtp_enable'] = true

gitlab_rails['smtp_address'] = "smtp.ym.163.com"

gitlab_rails['smtp_port'] = 25

gitlab_rails['smtp_user_name'] = "gitlab@xxx.com"

gitlab_rails['smtp_password'] = "xxxxx"

gitlab_rails['smtp_domain'] = "163.com"

gitlab_rails['smtp_authentication'] = "login"

gitlab_rails['smtp_enable_starttls_auto'] = true

gitlab_rails['smtp_tls'] = false
```

### 配置修改后重新执行让配置生效
``` bash
sudo gitlab-ctl reconfigure
```

### 日志查看
#### ***默认之日目录 /var/log/gitlab***
``` bash
#查看所有日志
sudo gitlab-ctl tail

#查看nginx 访问日志
sudo gitlab-ctl tail nginx/gitlab_acces.log

#查看postgresql日志
sudo gitlab-ctl tail  postgresql
```