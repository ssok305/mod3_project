const express = require('express')
const router = express.Router()

const apiController = require('../controllers/apiController')

router.post('/auth/token', apiController.getToken)
router.get('/',apiController.getGenre)
router.get('/', apiController.getPlaylistByGenre)
router.get('/', apiController.getTracks)
router.get('/', apiController.getTrack)

module.exports = router