import "./App.css";
import React from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import Spotify from "../../util/Spotify";
import Preview from "../Preview/Preview";
//import more

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "Playlist Title",
      playlistTracks: [],
      previewTrack: "",
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.preview = this.preview.bind(this);
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.some((playlistTrack) => playlistTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    this.setState({ playlistTracks: tracks });
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }
  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }
  preview(track) {
    if (!track.preview_url) {
      track.name = track.name + " (No Preview)";
    }
    this.setState({
      previewTrack: track,
    });
  }
  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <Preview track={this.state.previewTrack} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onPreview={this.preview}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
