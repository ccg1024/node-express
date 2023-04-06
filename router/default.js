const express = require('express')
const homeHandler = require('../router_handler/default')

const router = express.Router()

router.get('/', homeHandler.homePage)

router.post('/editor', homeHandler.saveNoteContent)

router.get('/api/notes', homeHandler.showNotes)

router.get('/api/notes/:id', homeHandler.NotesDetail)

module.exports = router
