import React, { useEffect } from "react";
import Navbar from "../components/NavBar";
import WaveSVG from "../components/WaveSVG";
import Dropdown from "../components/Dropdown";
import Listbox from "../components/Listbox";
import axios from "axios";
import { useState } from "react";
import Detail from "../components/Details";

function HomePage() {
  const [user, setUser] = useState({});
  let loggedIn = user.username;

  const [token, setToken] = useState("");
  const [genres, setGenres] = useState({
    selectedGenre: "",
    listOfGenresFromAPI: [],
  });
  const [playlist, setPlaylist] = useState({
    selectedPlaylist: "",
    listOfPlaylistFromAPI: [],
  });
  const [tracks, setTracks] = useState({
    selectedTrack: "",
    listOfTracksFromAPI: [],
  });
  const [trackDetail, setTrackDetail] = useState(null);

  function genreChanged(val) {
    setGenres({
      selectedGenre: val,
      listOfGenresFromAPI: genres.listOfGenresFromAPI,
    });

    axios(
      `https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    ).then((playlistResponse) => {
      setPlaylist({
        selectedPlaylist: playlist.selectedPlaylist,
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items,
      });
    });

    console.log(val);
  }

  function playlistChanged(val) {
    console.log(val);
    setPlaylist({
      selectedPlaylist: val,
      listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI,
    });
  }

  function buttonClicked(e) {
    e.preventDefault();

    axios(
      `https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    ).then((tracksResponse) => {
      setTracks({
        selectedTrack: tracks.selectedTrack,
        listOfTracksFromAPI: tracksResponse.data.items,
      });
    });
  }
  function listboxClicked(val) {
    const currentTracks = [...tracks.listOfTracksFromAPI];

    const trackInfo = currentTracks.filter((t) => t.track.id === val);

    setTrackDetail(trackInfo[0].track);
  }

  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID +
              ":" +
              import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET
          ),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      setToken(tokenResponse.data.access_token);

      axios("https://api.spotify.com/v1/browse/categories?locale=sv_US", {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      }).then((genreResponse) => {
        setGenres({
          selectedGenre: genres.selectedGenre,
          listOfGenresFromAPI: genreResponse.data.categories.items,
        });
      });
    });
  }, [
    genres.selectedGenre,
    import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_APP_SPOTIFY_CLIENT_SECRET,
  ]);

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-full bg-blue-600 bg-gradient-to-b from-[rgba(14,65,102,0.86)] to-[#0e4166] box-border block z-0">
        <WaveSVG />
      </div>
      <div className="z-20 flex flex-col justify-center items-center min-h-screen">
        <Navbar username={loggedIn} setUser={setUser} />
        <div className="z-20 flex flex-col ">
          <div className="pt-4">
            {trackDetail && <Detail {...trackDetail} />}
          </div>
          <div className="z-20 flex flex-col pb-5">
            <Listbox
              items={tracks.listOfTracksFromAPI}
              clicked={listboxClicked}
            />
          </div>
          <form
            onSubmit={buttonClicked}
            className="flex flex-col items-center space-y-4 "
          >
            <Dropdown
              label="Genre :"
              options={genres.listOfGenresFromAPI}
              selectedValue={genres.selectedGenre}
              changed={genreChanged}
            />
            <Dropdown
              label="Playlist :"
              options={playlist.listOfPlaylistFromAPI}
              selectedValue={playlist.selectedPlaylist}
              changed={playlistChanged}
            />
            <div className="col-sm-6 row form-group px-0">
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
