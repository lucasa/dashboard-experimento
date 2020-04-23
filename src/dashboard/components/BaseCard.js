import React from "react";

export class BaseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultProps: props
    };

    this.getBaseState = this.getBaseState.bind(this);
  }

  getBaseState() {
    return this.state;
  }
}

export default BaseCard;
