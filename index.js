// the third part module
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const { expressjwt: expressJWT } = require('express-jwt')

// user module
const config = require('./config')
const userRouter = require('./router/user')
const homeRouter = require('./router/default')

const app = express()
const port = 5000

app.use(fileUpload())

app.use(express.static('public'))

// enable CORS
app.use(cors())

// for form data
app.use(bodyParser.urlencoded({ extended: false }))

// for front end params
app.use(bodyParser.json())

// encapsulate a function to simplify res.send
app.use((_req, res, next) => {

  // fail status === 1, success status === 0
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// registe token middle handler
// 登陆注册接口不应该检查token
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: [config.algorithms] }).unless({ path: /^\/api/ }))


// registe route and add url prefix
app.use('/api', userRouter)
app.use(homeRouter)

// registe error middle handler
app.use((_err, _req, _res, _next) => {
  // some error handle code
  console.log('[ERROR] found some error')
  console.log(_err)
  console.log('err code ', _err.code)

  if (_err.code === 'invalid_token' || _err.code === 'credentials_required') {
    // token error
    _res.send({
      status: 1,
      message: "login before"
    })
  }
})


app.listen(port, () => {
  console.log(`Example app listening on ${port}`)
})
