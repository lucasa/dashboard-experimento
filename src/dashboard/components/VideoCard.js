import React from "react";
import ReactPlayer from "react-player";
import BaseCard from "./BaseCard";

export class VideoCard extends BaseCard {
  constructor(props) {
    super(props);
    const parentState = super.getBaseState();
    this.state = {
      ...parentState,
      url: props.url
    };
  }

  render() {
    return (
      <ReactPlayer
        width="100%"
        height="100%"
        url={this.state.url}
        playing={false}
        controls={false}
      />
    );
  }
}

export default VideoCard;
