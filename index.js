const ws = require('./module_/wscrapy');
const cheerio = require('cheerio');
const requestp = require('request-promise');
const csvjson = require('csvjson');
const fs = require('fs');

const csvFile = './csv/uri.csv';
let csv_data = fs.readFileSync(csvFile, { encoding : 'utf8'});
const csvUri = csvjson.toObject(csv_data, { delimiter : ',',  quote: '"'}).map(v => v.uri.replace(/ +/g,''));

const isAuth = false;
const promises = csvUri.map(url => requestp(url).catch(err => {
  errMsg = err.options.uri;
  return ''
}));

Promise.all(promises).then((data) => {
  data.forEach((valHTML, idx) => {
    doCheerio(valHTML, csvUri[idx])
  })
}).then(()=>{/*do something*/})


var doCheerio = function (html,uri) {
  const $ = cheerio.load(html);
}