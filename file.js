const fs = require('fs');
const { readdirSync, rename } = require('fs');
const { resolve } = require('path');

//  node param 
var arguments = process.argv
var _account = arguments[2];
if(!_account) _account  =  "5SbFYzAt4u43Md6HXeWUB3oK1wxiHpFVnAn29tB71LoV";
var _imageDirPath = arguments[3];
if(!_imageDirPath) _imageDirPath  =  "./assets";
var _price = arguments[4];
if(!_price) _price  =  "0.55 sol";

console.log(_account + "; " + _imageDirPath);
// Get an array of the files inside the folder
const files = readdirSync(_imageDirPath);

// Loop through each file that was retrieved
const _count = files.length;
for(var i = 0; i < _count; i++){
  rename(
    _imageDirPath + `/${files[i]}`,
    _imageDirPath + `/${i}` + ".png",
    err => console.log(err)
  ); 
}


//create json files 

let png_metadata = { 
  "name": "FROGBOIZ NFT 1",
  "image": "0.png",
  "symbol": "",
  "properties": {
    "files": [
      {
        "uri": "0.png",
        "type": "image/png"
      }
    ],
    "category": "image",
    "creators": [
        {
            "address": _account,
            "share": 100
        }
    ]
  },
  "description": "FROGBOIZ NFT price: " +  _price,
  "seller_fee_basis_points": 5,
  "external_url": "google.com",
  "collection": {
    "name": "Dreamland Test",
    "family": "Dreamland"
  }
};
let data; 

for(var i =0; i < _count; i++){
  png_metadata.name = "FROGBOIZ NFT " + (i+1);
  png_metadata.image = i + ".png";
  png_metadata.properties.files[0].uri = i + ".png";
  
  data = JSON.stringify(png_metadata);
  fs.writeFileSync(_imageDirPath + "/" + i + '.json', data);
}
