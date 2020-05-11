import * as React from "react";
import { render, findDOMNode } from "react-dom";
import { JustifiedLayout, GridLayout } from "@egjs/react-infinitegrid";

import Widget from "./components/Widget";
import "./infinite.css";

const defaultContent = [
  {
    title: "card",
    path: "./PostCard",
    tag: "PostCard",
    properties: {}
  },
  {
    title: "A video...",
    path: "./VideoCard",
    tag: "VideoCard",
    properties: { url: "https://www.youtube.com/watch?v=OslN5mxWZi8" }
  },
  {
    title: "gfycat",
    path: "./EmbedCard",
    tag: "EmbedCard",
    properties: { url: "https://gfycat.com/uniquejollyhammerkop-elijah-wood" }
  },
  {
    title: "twitter",
    path: "./EmbedCard",
    tag: "EmbedCard",
    properties: {
      url: "https://twitter.com/PaolaCarosella/status/1250593587684954115"
    }
  },
  {
    title: "maps",
    path: "./EmbedCard",
    tag: "EmbedCard",
    properties: {
      url:
        "https://www.google.com/maps/place/Sharksushi/@-30.0714187,-51.2581439,13z/data=!4m8!1m2!2m1!1sshark+sushi!3m4!1s0x95197810db64f825:0x2392d6944dcb471e!8m2!3d-30.0534025!4d-51.1921381"
    }
  }
];

class Item extends React.Component {
  render() {
    const num = this.props.num;
    return (
      <div className="item">
        <div className="content"> {this.props.children}</div>
      </div>
    );
  }
}

const Box = props => {
  const style = Object.assign(
    {
      background: props.color || "green",
      width: "350px",
      height: "350px"
    },
    props.style || {}
  );
  return <div {...props} style={style} />;
};

class InfiniteDashboard extends React.Component {
  state = {
    list: []
  };
  loadItems(groupKey, num) {
    const items = [];
    const start = this.state.list.length;

    const keys = Object.keys(defaultContent);
    //console.log("defaultContent", defaultContent);
    //console.log("defaultacontent keys", keys);

    for (let i = 0; i < num; ++i) {
      /* <Item groupKey={groupKey} num={1 + start + i} key={start + i} /> */
      const k = Math.floor(Math.random() * keys.length);
      const { title, tag, path, properties } = defaultContent[k];
      /* 
      <Box
        groupKey={groupKey}
        num={1 + start + i}
        key={start + 1}
      />
      */
      items.push(
        <Item groupKey={groupKey} num={1 + start + i} key={start + i}>
          <Widget
            groupKey={groupKey}
            num={1 + start + i}
            key={start + 1}
            title={title}
            tag={tag}
            path={path}
            childProps={properties}
          />
        </Item>
      );
    }
    this.start = start + num;

    //console.log("items", items);
    return items;
  }
  onAppend = ({ groupKey, startLoading }) => {
    startLoading();
    const list = this.state.list;
    const items = this.loadItems((parseFloat(groupKey) || 0) + 1, 4);

    this.setState({ list: list.concat(items) });
  };
  onLayoutComplete = ({ isLayout, endLoading }) => {
    !isLayout && endLoading();
  };

  render() {
    return (
      <JustifiedLayout
        options={{
          isConstantSize: true,
          transitionDuration: 0.24
        }}
        layoutOptions={{
          margin: 5,
          column: [0, 4]
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
