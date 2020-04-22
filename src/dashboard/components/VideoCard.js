import React from "react";
import ReactPlayer from "react-player";

export class VideoCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url
    };
  }

  render() {
    return <ReactPlayer url={this.state.url} playing="false" />;
  }
}

export default VideoCard;
