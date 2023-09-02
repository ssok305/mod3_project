const express = require('express')
const router = express.Router()

const apiController = require('../controllers/apiController')

// Authorization route
router.post('/auth/token', apiController.getToken)

// Genre-related route
router.get('/genres', apiController.getGenre)

// Playlist-related route based on Genre ID
router.get('/playlists/:genreId', apiController.getPlaylistByGenre)

// Track-related routes based on some endpoint or ID
router.get('/tracks/:tracksEndPoint', apiController.getTracks)

// Single Track route based on some endpoint or ID
router.get('/track/:trackEndPoint', apiController.getTrack)

module.exports = router