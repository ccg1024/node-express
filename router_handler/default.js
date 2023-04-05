/*
 * extract handle function fron ../router
 */

exports.homePage = (_req, res) => {
  console.log('the home page')
  console.log("the auth " + _req.auth.userName)
  res.send('get home')
}
