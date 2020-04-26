import * as React from "react";
import { render, findDOMNode } from "react-dom";
import { JustifiedLayout } from "@egjs/react-infinitegrid";
import "./infinite.css";

class Item extends React.Component {
  render() {
    const num = this.props.num;
    return (
      <div className="item">
        <div className="thumbnail">
          <img
            src={`https://naver.github.io/egjs-infinitegrid/assets/image/${(num %
              59) +
              1}.jpg`}
            alt="egjs"
          />
        </div>
        <div className="info">{`egjs ${num}`}</div>
      </div>
    );
  }
}

class InfiniteDashboard extends React.Component {
  state = {
    list: []
  };
  loadItems(groupKey, num) {
    const items = [];
    const start = this.state.list.length;

    for (let i = 0; i < num; ++i) {
      items.push(
        <Item groupKey={groupKey} num={1 + start + i} key={start + i} />
      );
    }
    return items;
  }
  onAppend = params => {
    params.startLoading();
    const f = parseFloat(params.groupKey || 0) + 1;
    const items = this.loadItems(f, 20);
    this.setState({ list: this.state.list.concat(items) });
  };
  onLayoutComplete = params => {
    !params.isLayout && params.endLoading();
  };
  render() {
    return (
      <JustifiedLayout
        options={{
          isConstantSize: true,
          transitionDuration: 0.2
        }}
        layoutOptions={{
          margin: 5,
          column: [0, 5]
        }}
        onAppend={this.onAppend}
        onLayoutComplete={this.onLayoutComplete}
      >
        {this.state.list}
      </JustifiedLayout>
    );
  }
}

export default InfiniteDashboard;
