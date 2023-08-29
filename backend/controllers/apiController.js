const { default: axios } = require("axios")


async function getToken(){
    const response = await axios(`https://api.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : `Bearer` + btoa(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    })

    const data = await response.json()
    console.log(data.access_token)
    return data.access_token

}

async function getGenre (token){
    const response = await axios('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        method: 'GET',
        headers: {'Authorization': 'Bearer' + token }
    })

    const data = await response.json()
    console.log(data.categories.items)
    return data.categories.items
}

async function getPlaylistByGenre (token, genreID) {
    const limit = 10

    const response = await axios(`https://api.spotify.com/v1/browse/categories/${genreID}/playlists?limit=${limit}`,{
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer' + token
        }
    })

    const data = await response.json()
    console.log(data.playlists.items)
    return data.playlists.items
}

async function getTracks (token, tracksEndPoint){
    const limit = 10

    const response = await axios(`${tracksEndPoint}?limit=${limit}`,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer' + token
        }
    })

    const data = await response.json()
    console.log(data.items)
    return data.items
}

async function getTrack (token, trackEndPoint) {
    const response = await axios(`${trackEndPoint}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer' + token
        }
    })
    
    const data = await response.json()
    console.log(data)
    return data
}

module.exports = {
    getToken,
    getGenre,
    getPlaylistByGenre,
    getTracks,
    getTrack
}