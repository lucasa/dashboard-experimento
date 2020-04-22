import React from "react";

export class BaseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialProps: props
    };
  }
}

export default BaseCard;
