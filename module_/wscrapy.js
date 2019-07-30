

var getPDF = require('download-pdf');
var  he = require('he');
var request = require('request')
var fs = require('fs')

function clean(str) {
  if (str == null) {
    return
  } else {
    return he.decode(
      str.replace(/\t/g, "")  //remove tab
      .replace(/\n/g, "")     //remove new line
      .replace(/ +</g,'<')    //remove space before open tag
      .replace(/> +/g,'>')    //remove space after close tag
      .replace(/<!--(.|\n)*?-->/g,'') //remove html comment
      );
  }
}

function getIMG(uri, dest,filename=uri.match(/([^\/]+$)/g)[0]) {
  let file = filename.match(/\.(?:jpg|jpeg|JPG|png|PNG|gif)/g)?filename:filename+'.jpg'
  request.head(uri, function (err, res, body) {
    'content-type:',
    res.headers['content-type']
    'content-length:',
    res.headers['content-length']
    request(uri).pipe(fs.createWriteStream(dest+file)).on('close', ()=>{});
  });
};

function writeFile(dest){

}
module.exports = {
  clean:clean,
  getPDF:getPDF,
  getIMG:getIMG
};