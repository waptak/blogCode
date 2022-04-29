var fs = require('fs')
var path = require('path')
var codeFun = require('./item_codes_export');
let itemCode = codeFun.ItemCodes();

let content = fs.readFileSync(path.join(__dirname, './z_e.txt'), 'utf-8');
var lineArray = content.split('\n');
// 中文和全角字符
let cnReg = /[^\x00-\xff]/g;
lineArray.reverse().forEach((line)=>{
  let eng = line.replace(cnReg,'').trim();
  let cn = line.match(cnReg)
  if(cn && cn.length>0){
    cn = cn.join("");
  }
  if(eng){
    for(var key in itemCode){
      let v = itemCode[key];
      if(v == eng){
        itemCode[key] = cn;
      }
    }
  }
})

console.log(itemCode)
// fs.writeFile(path.join(__dirname, './source/psobb/js/config/item_codes_ja2.js'), temp, function (err) {
//   if (err) {
//     console.log('【生成失败】', err);
//   } else {
//     console.log('【生成成功】');
//   }

// });