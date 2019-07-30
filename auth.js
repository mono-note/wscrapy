const profile = {
  host:"http://nxtv.coding-dev.work",
  username:"MicroFocusPV",
  password:"Cv3u7PEV"
}
if (isAuth) {
  let errMsg = ''
  const promises = csvUri.map(url => requestp({
    uri: url,
    method: 'GET',
    auth: {
      'user': profile.username,
      'pass': profile.password
    }
  }).catch(err => {
    errMsg = err.options.uri;
    return ''
  }));
  Promise.all(promises).then((data) => {
    data.forEach((valHTML, idx) => {
      doCheerio(valHTML, csvUri[idx])
    })
  }).then(()=> csvObject.writeRecords(info))
}else{
  const promises = csvUri.map(url => requestp(url).catch(err => {
    errMsg = err.options.uri;
    return ''
  }));
  Promise.all(promises).then((data) => {
    data.forEach((valHTML, idx) => {
      doCheerio(valHTML, csvUri[idx])
    })
  }).then(()=> csvObject.writeRecords(info))
}