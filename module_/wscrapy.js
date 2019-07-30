

var getPDF = require('download-pdf');
var  he = require('he');
var request = require('request')
var fs = require('fs')
var cheerio = require('cheerio');

function getHead(html){
  const $ = cheerio.load(html);
  let title = $('title').text()
  let keywords = $('meta[name="keywords"]').attr('content')
  let description = $('meta[name="description"]').attr('content')
  return {title,keywords,description}
}

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

function zeroPad (d){
  return ("0" + d).slice(-2)
}
function writeFile(dest){

}

module.exports = {
  clean:clean,
  zeroPad:zeroPad,
  getPDF:getPDF,
  getIMG:getIMG,
  getHead:getHead,
};