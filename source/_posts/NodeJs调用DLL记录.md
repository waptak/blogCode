---
title: NodeJs调用DLL记录（含Electron）
date: 2020-10-2 13:07:59
tags: [nodejs]
---

### 最近涉及到华视身份证读卡器CVR-100U使用，官方有webservice方式使用更简单，这里记录下调用DLL方式实现

### NodeJs示例 [https://github.com/waptak/DLL-Reader](https://github.com/waptak/DLL-Reader)
### Electron示例 [https://github.com/waptak/Electron-DLL-Reader](https://github.com/waptak/Electron-DLL-Reader)


## window需要编译环境
```bash
# npm i 报错内容
gyp ERR! find VS msvs_version not set from command line or npm config
gyp ERR! find VS VCINSTALLDIR not set, not running in VS Command Prompt
gyp ERR! find VS could not use PowerShell to find Visual Studio 2017 or newer
gyp ERR! find VS looking for Visual Studio 2015
gyp ERR! find VS - not found
gyp ERR! find VS not looking for VS2013 as it is only supported up to Node.js 8
gyp ERR! find VS
gyp ERR! find VS **************************************************************
gyp ERR! find VS You need to install the latest version of Visual Studio
gyp ERR! find VS including the “Desktop development with C++” workload.
gyp ERR! find VS For more information consult the documentation at:
gyp ERR! find VS https://github.com/nodejs/node-gyp#on-windows
gyp ERR! find VS **************************************************************
gyp ERR! find VS
gyp ERR! configure error
gyp ERR! stack Error: Could not find any Visual Studio installation to use


#  需要安装 python 2.7，以下命令已包含  使用PowerShell 管理员模式执行此命令
$ npm install --global --production windows-build-tools
```

## 本来使用的ffi包，因为在Electron高版本下编译失败，故改为ffi-napi
```json
//package.json
{
  ...
  "dependencies" :{
    ...
    "ffi-napi": "^3.0.1",
    "iconv-lite": "^0.6.2",
    "ref-napi": "^3.0.1",
    "ref-array-napi": "^1.2.1"
  }
}
```

## 代码示例
```javascript
var ffi = require('ffi-napi');
var path = require('path');
const ref = require('ref-napi')
const refArray = require('ref-array-napi')
var iconv = require('iconv-lite');
var dllPath = path.resolve('Termb.dll');
// 根据dll中的api方法配置
var lib = ffi.Library(dllPath, {
  'CVR_InitComm': ['int', ['int']],
  'CVR_CloseComm': ['int',[]],
  'CVR_Authenticate': ['int',[]],
  'CVR_Read_FPContent': ['int', []],
  'GetPeopleName':['int' ,[ref.refType('char') , ref.refType('int')]]
})

var iRetUSB = lib.CVR_InitComm(1001)
if (iRetUSB != 1) return;

var authenticate = lib.CVR_Authenticate();
if (authenticate != 1) {
  lib.CVR_CloseComm();
  return;
}

var readContent = lib.CVR_Read_FPContent();
if (readContent != 1) {
  lib.CVR_CloseComm();
  return;
}

var handleRef = ref.alloc('int');
var lt = Buffer.alloc(128);
lib.GetPeopleName(lt , handleRef);
var name = iconv.decode(lt, 'GBK');
console.log('GetPeopleName',name)
```


## Electron中打包需要注意的
  * NodeJS版本建议10+以上,
  * 使用`electron-builder`打包时需要配置`dll相关文件和目录`为`extraResources`
  ```json
  {
    ...
    "build": {
      ...
      "extraResources": [
        "./dll" //放dll的目录，也可以用通配符匹配dll
      ],
  }
  ```
  * 获取dll路径需要判断 , 打包后路径和在调试时路径不一致，可自己根据路径中`.asar`判断
  ```js
    var dllPath = path.join((__dirname.includes(".asar") ? process.resourcesPath : __dirname) , 'dll/Termb.dll')
  ```

