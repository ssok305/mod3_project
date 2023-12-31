const axios = require('axios');


async function getGenre (){
    const token = req.headers.authorization; 
    try {
        const response = await axios.get(
            'https://api.spotify.com/v1/recommendations/available-genre-seeds',
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Could not get genres" });
    }
}

async function getPlaylistByGenre (genreID) {
    const token = req.headers.authorization
    const limit = 10
    try{
        const response = await axios.get(`https://api.spotify.com/v1/browse/categories/${genreID}/playlists?limit=${limit}`,{
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
    res.json(response.data);
    }catch (error) {
        console.error(error);
        res.status(400).json({ error: "Could not get genres playlist" });
   
}
}

async function getTracks (tracksEndPoint){
    const token = req.headers.authorization 
    const limit = 10
    try{
    const response = await axios.get(`${tracksEndPoint}?limit=${limit}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    res.json(response.data);
} catch (error) {
    console.error(error);
        res.status(400).json({ error: "Could not get tracks" });
}
}

async function getTrack (trackEndPoint) {
    const token = req.headers.authorization
    try{const response = await axios.get(`${trackEndPoint}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    res.json(response.data);
} catch (error) {
    console.error(error);
        res.status(400).json({ error: "Could not get track" });
}
}

module.exports = {
    
    getGenre,
    getPlaylistByGenre,
    getTracks,
    getTrack
}