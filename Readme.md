# 环境配置 

### 全局安装hexo-cli
``` bash
$ npm install hexo-cli@1.0.4 -g #或使用cnpm
```

### 安装依赖包
``` bash
$ npm install #或使用cnpm
```
### 安装deployer插件
``` bash
$ npm install hexo-deployer-git --save
```
### 然后在根目录下配置文件_config.yml:
``` bash
deploy:
  type: git  
  repository: git@github.com:waptak/waptak.github.io.git 
  branch: master
```

### 安装search插件： 
``` bash
$ npm install hexo-generator-search --save
```
### 然后在根目录下配置文件_config.yml:
``` bash
search:
  path: search.xml
  field: post
```


# 常用命令
## 一定要用 node 10.15以下版本

### hexo 操作
``` bash
$ hexo n == hexo new
$ hexo g == hexo generate
$ hexo s == hexo server
$ hexo d == hexo deploy

$ hexo d #生成部署
```

### 重新发布 
``` bash
$ hexo clean
# 删除 .deploy_git文件夹  
$ hexo d
```

### NodeJS 12版本及以下可打包

