const fs = require('fs');

//  node param 
var arguments = process.argv
var _imageDirPath = arguments[2];
if(!_imageDirPath) _imageDirPath  =  "./assets";


//delete old json files.

//passsing directoryPath and callback function
fs.readdir(_imageDirPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        if (file.endsWith(".json")) {
            fs.unlink(`${_imageDirPath}/${file}`, function(err) {
                if (err) throw err
                console.log(file, "deleted")
            })
        }
    });

});
