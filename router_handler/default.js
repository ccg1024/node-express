/*
 * extract handle function fron ../router
 */
const path = require('path')
const fs = require('fs')

function fileDate() {
  const current = new Date()
  return "-" + current.getFullYear() + "-" + current.getMonth() + "-" + current.getDate()
}

exports.homePage = (_req, res) => {
  console.log('the home page')
  console.log("the auth " + _req.auth.userName)
  res.send('get home')
}

exports.saveNoteContent = (_req, res) => {
  console.log('got data from editor.jsx')
  let { title, content } = _req.body
  for (let key in _req.files) {
    const name = _req.files[key].name
    const patAlt = new RegExp(`.*?!\\[(.*?)\\]\\(${key}\\)`)
    const pat = new RegExp(`.*?!\\[.*?\\]\\(${key}\\)`)
    const savePath = path.join(__dirname, "../public/crazybody/imgs/" + name)

    _req.files[key].mv(savePath)

    const imgAlt = patAlt.exec(content)[1]
    content = content.replace(pat, `![${imgAlt}](http://127.0.0.1:5000/crazybody/imgs/${name})`)
  }

  const filePath = path.join(__dirname, "../public/crazybody/notes/" + title + fileDate() + ".md")
  fs.writeFile(filePath, content, (err) => {
    if (err) console.log(err)
  })

  res.send({
    status: 0,
    message: 'save success'
  })
}

exports.showNotes = (_req, res) => {
  const files = fs.readdirSync(path.join(__dirname, '../public/crazybody/notes/'))

  let notes = []

  for (let idx in files) {
    notes.push({
      id: files[idx],
      title: files[idx].split('-')[0]
    })
  }

  res.send({
    status: 0,
    notes: notes
  })
}


exports.NotesDetail = (_req, res) => {
  const fileName = _req.params.id
  const filePath = path.join(__dirname, "../public/crazybody/notes/" + fileName)
  const content = fs.readFileSync(filePath, 'utf8')
  const tempArr = fileName.split('-')
  tempArr.shift()
  res.send({
    status: 0,
    id: fileName,
    title: fileName.split("-")[0],
    pubTime: tempArr.join('-').split('.')[0],
    content: content
  })
}
