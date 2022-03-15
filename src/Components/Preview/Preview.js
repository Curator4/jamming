import React from "react";
import "./Preview.css";

class Preview extends React.Component {
  render() {
    return (
      <div className="preview">
        <div className="trackinfo">
          <h2>{this.props.track ? this.props.track.name : "Song Preview"}</h2>
          <h3>{this.props.track.Name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        <audio controls key={this.props.track.id} autoplay>
          <source src={this.props.track.preview_url} type="audio/mp3" />
          Your browser does not support the audio format.
        </audio>
      </div>
    );
  }
}

export default Preview;
