const axios = require('axios');
const qs = require('qs'); 

function getAuthURL(req, res) {
    const redirect_uri = req.body.redirect_uri;
    const scopes = req.body.scopes;
    const params = qs.stringify({
        client_id: process.env.CLIENT_ID,
        response_type: 'code',
        redirect_uri,
        scope: scopes.join(' '),
    });
    const url = `https://accounts.spotify.com/authorize?${params}`;
    res.json({ url });
}

async function getToken(req, res) {
    const code = req.body.code;
    const redirect_uri = req.body.redirect_uri;
    const auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri,
            }),
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Could not get token" });
    }
}


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
    getToken,
    getAuthURL,
    getGenre,
    getPlaylistByGenre,
    getTracks,
    getTrack
}