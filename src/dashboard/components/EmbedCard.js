import React from "react";
import Embed from "react-embed";

export class EmbedCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url:
        this.props.url ||
        "https://www.google.com/maps/place/R.+Banco+da+Prov%C3%ADncia,+221+-+Santa+Tereza,+Porto+Alegre+-+RS,+90840-030/@-30.0732168,-51.2297537,17z/data=!3m1!4b1!4m5!3m4!1s0x951978844625ea1f:0xacc77ae74c3b3143!8m2!3d-30.0732215!4d-51.2275597"
    };
  }

  componentDidMount() {
    console.log("EmbedCard renderizando url", this.state.url);
  }

  render() {
    return <Embed url={this.state.url} />;
  }
}

export default EmbedCard;
