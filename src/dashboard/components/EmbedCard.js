import React from "react";
import Embed from "react-embed";
import BaseCard from "./BaseCard";
import BorderWrapper from "react-border-wrapper";

export class EmbedCard extends BaseCard {
  constructor(props) {
    super(props);
    const parentState = super.getBaseState();
    this.state = {
      ...parentState,
      url:
        props.url ||
        "https://www.google.com/maps/place/R.+Banco+da+Prov%C3%ADncia,+221+-+Santa+Tereza,+Porto+Alegre+-+RS,+90840-030/@-30.0732168,-51.2297537,17z/data=!3m1!4b1!4m5!3m4!1s0x951978844625ea1f:0xacc77ae74c3b3143!8m2!3d-30.0732215!4d-51.2275597"
    };
  }

  render() {
    console.log("<Embed> url", this.state.url);
    return <Embed url={this.state.url} />;
  }
}

export default EmbedCard;
