var fs = require('fs')
var path = require('path')
var codeFun = require('./item_codes_export');
let tempContent = fs.readFileSync(path.join(__dirname, './source/psobb/js/data/tempfile'), 'utf-8');
let fileConten = "";

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

// 大部分物品
let itemContent = fs.readFileSync(path.join(__dirname, './source/psobb/js/data/enToZh.txt'), 'utf-8');
let itemArray = itemContent.split('\n');

// 魔法
let magicItemContent = fs.readFileSync(path.join(__dirname, './source/psobb/js/data/enToZh_magic.txt'), 'utf-8');
let magicArray = magicItemContent.split('\n');

// 中文和全角字符
let cnReg = /[^\x00-\xff]/g;
// itemArray.forEach((line) => {

//   let eng = line.replace(cnReg, '').trim();
//   let cn = line.match(cnReg)
//   if (cn && cn.length > 0) {
//     cn = cn.join("");
//   }
//   if(eng.indexOf('/') > -1){
//     console.log(eng + '-----'+ cn)
//   }


// })

// itemcode
valueSet(itemCode, itemArray, magicArray);
// valueSet(itemCodesEphOriginal, itemArray)
valueSet(elementCodes, itemArray)
valueSet(srankElementCodes, itemArray)
keySet(frameAdditions, frameCodes, itemArray)
keySet(barrierAdditions, barrierCode, itemArray)
valueSet(diskNameCodes, itemArray)
arrayValueSet(pbs, ['Leilla 女神', 'Farlla 蛇', 'Pilla 神像', 'Estlla 鱼', 'Golla 鹿', 'Mylla & Youlla 双子'])


tempContent = tempContent.replace(/#ELEMENT_CODES#/g, JSON.stringify(elementCodes));
tempContent = tempContent.replace(/#SRANK_ELEMENT_CODES#/g, JSON.stringify(srankElementCodes));
tempContent = tempContent.replace(/#FRAME_ADDITIONS#/g, JSON.stringify(frameCodes));
tempContent = tempContent.replace(/#BARRIER_ADDITIONS#/g, JSON.stringify(barrierCode));
tempContent = tempContent.replace(/#DISKNAME_CODES#/g, JSON.stringify(diskNameCodes));
tempContent = tempContent.replace(/#PBS#/g, JSON.stringify(pbs));

itemCodeStr = JSON.stringify(itemCode).substring(0, JSON.stringify(itemCode).length - 1)+ "," + JSON.stringify(itemCodesEphOriginal).slice(1)

tempContent = tempContent.replace(/#ITEM_CODES#/g, itemCodeStr);

createFile("item_codes_ja.js", tempContent)
// createFile("item_codes.json", itemCode)
// createFile("itemCodesEphOriginal.json", itemCodesEphOriginal)
// createFile("elementCodes.json", elementCodes)
// createFile("srankElementCodes.json", srankElementCodes)
// createFile("frameAdditions.json", frameCodes)
// createFile("barrierAdditions.json", barrierCode)
// createFile("diskNameCodes.json", diskNameCodes)
// createFile("pbs.json", pbs)

function valueSet(data, sourceArray, magicArray) {
  for (var key in data) {
    let v = data[key];
    if (!v.startsWith('Type') ) {
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

      if (magicArray) {
        sourceArray.forEach((line) => {
          let eng = line.replace(cnReg, '').trim();
          let cn = line.match(cnReg)
          if (cn && cn.length > 0) {
            cn = cn.join("");
          }
          if (cn && eng && data[key].indexOf(eng) > -1) {
            data[key] = data[key].replace(eng, cn);
          }
        })
      }
    }
  }
}




function keySet(data, outData, sourceArray) {
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

function arrayValueSet(data, sourceArray) {

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
  fs.writeFile(path.join(__dirname, './source/psobb/js/config/' + filename), content, function (err) {
    if (err) {
      console.log(filename + '【生成失败】', err);
    } else {
      console.log(filename + '【生成成功】');
    }
  });
}

