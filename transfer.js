var fs = require('fs')
var path = require('path')
var codeFun = require('./item_codes_export');

let itemCode = codeFun.ItemCodes();
let itemCodesEphOriginal = codeFun.ItemCodesEphOriginal();
let elementCodes = codeFun.ElementCodes()
let srankElementCodes = codeFun.SrankElementCodes();
let frameAdditions = codeFun.FrameAdditions();
let frameCodes = {};
let barrierAdditions = codeFun.BarrierAdditions();
let barrierCode = {};
let diskNameCodes = codeFun.DiskNameCodes();
let pbs = codeFun.PBs();

let content = fs.readFileSync(path.join(__dirname, './source/psobb/js/data/enToZh.txt'), 'utf-8');
var lineArray = content.split('\n');
// 中文和全角字符
let cnReg = /[^\x00-\xff]/g;
lineArray.forEach((line) => {

  let eng = line.replace(cnReg, '').trim();
  let cn = line.match(cnReg)
  if (cn && cn.length > 0) {
    cn = cn.join("");
  }



})

// itemcode
valueSet(itemCode , lineArray);
valueSet(itemCodesEphOriginal, lineArray)
valueSet(elementCodes ,lineArray)
valueSet(srankElementCodes ,lineArray)
keySet(frameAdditions, frameCodes,lineArray)
keySet(barrierAdditions, barrierCode ,lineArray)
valueSet(diskNameCodes,lineArray)
arrayValueSet(pbs, ['Leilla 女神','Farlla 蛇','Pilla 神像','Estlla 鱼','Golla 鹿','Mylla & Youlla 双子'])



createFile("item_codes.json", itemCode)
createFile("itemCodesEphOriginal.json", itemCodesEphOriginal)
createFile("elementCodes.json", elementCodes)
createFile("srankElementCodes.json", srankElementCodes)
createFile("frameAdditions.json", frameCodes)
createFile("barrierAdditions.json", barrierCode)
createFile("diskNameCodes.json", diskNameCodes)
createFile("pbs.json", pbs)

function valueSet(data , sourceArray) {

  for (var key in data) {
    let v = data[key];
    sourceArray.forEach((line) => {
      let eng = line.replace(cnReg, '').trim();
      let cn = line.match(cnReg)
      if (cn && cn.length > 0) {
        cn = cn.join("");
      }
      if (eng && cn && v == eng) {
        data[key] = cn;
      }
    })
  }
}
function keySet(data, outData , sourceArray) {
  for (var key in data) {
    let v = data[key];
    sourceArray.forEach((line) => {
      let eng = line.replace(cnReg, '').trim();
      let cn = line.match(cnReg)
      if (cn && cn.length > 0) {
        cn = cn.join("");
      }
      if (eng && cn && key.toLocaleLowerCase() == eng.toLocaleLowerCase()) {
        outData[cn] = v;
      }
    })
  }
}

function arrayValueSet(data , sourceArray) {

    for (var key in data) {
      let v = data[key];
      for (let i = 0; i < v.length; i++) {
        let element = v[i];

        sourceArray.forEach((line) => {
          let eng = line.replace(cnReg, '').trim();
          let cn = line.match(cnReg)
          if (cn && cn.length > 0) {
            cn = cn.join("");
          }
          if (element && element.toLowerCase() == eng.toLowerCase()) {
            v[i] = cn;
          }
        })

       
      }
    }

}


function createFile(filename, content) {
  fs.writeFile(path.join(__dirname, './source/psobb/js/transfer/' + filename), JSON.stringify(content), function (err) {
    if (err) {
      console.log(filename + '【生成失败】', err);
    } else {
      console.log(filename + '【生成成功】');
    }
  });
}

