/*
 * extract handle function fron ../router
 */

exports.homePage = (_req, res) => {
  console.log('the home page')
  console.log("the auth " + _req.auth.userName)
  res.send('get home')
}

exports.saveNoteContent = (_req, res) => {
  console.log('got data from editor.jsx')
  console.log('the data is: ', _req.body)
  res.send({
    status: 0,
    message: 'save success'
  })
}
