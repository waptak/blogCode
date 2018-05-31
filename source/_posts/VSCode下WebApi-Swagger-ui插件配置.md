---
title: VSCode下WebApi+Swagger-ui插件配置
date: 2018-03-20 08:57:31
tags: netCore
categories: 操作备忘
---


### 安装包 swashbuckle.aspnetcore
```bash
$ dotnet add package swashbuckle.aspnetcore
```


### 修改 startup.cs

* 添加引用
<pre>
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;
</pre>

* 在 ConfigureServices 方法内添加

<pre>
services.AddSwaggerGen(c =>
  {
      c.SwaggerDoc("v1", new Info
      {
          Version = "v1",
          Title = "Demo Api"
      });
      var basePath = PlatformServices.Default.Application.ApplicationBasePath;
      var xmlPath = Path.Combine(basePath, "CoreApi.xml"); //CoreApi.xml 自己定义名称
      c.IncludeXmlComments(xmlPath);
  }
);
</pre>

* 在 Configure 方法内添加
<pre>
app.UseSwagger();
app.UseSwaggerUI(c => {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "DemoApi");
});
</pre>

### 修改工程文件 xxxx.csproj 添加
```xml
<PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|AnyCPU'">
  <DocumentationFile>bin\Debug\netcoreapp2.0\CoreApi.xml</DocumentationFile>
</PropertyGroup>
```

