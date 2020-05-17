import * as React from "react";
import { render, findDOMNode } from "react-dom";
import Zoom from "react-reveal/Zoom";
import Masonry from "react-masonry-infinite";
import Widget from "./components/Widget";
import LitegraphWorkspace from "../pipeline/LitegraphWorkspace.js";

import "./grid.css";
import "./split.css";


const Box = props => {
  const style = Object.assign(
    {
      background: props.color || "green",
      width: "350px",
      height: "450px"
    },
    props.style || {}
  );
  return <div {...props} style={style} />;
};

const sizes = [
  { columns: 1, gutter: 10 },
  { mq: "550px", columns: 2, gutter: 30 },
  { mq: "810px", columns: 3, gutter: 30 },
  { mq: "1070px", columns: 4, gutter: 30 },
  { mq: "1330px", columns: 5, gutter: 30 },
  { mq: "1590px", columns: 6, gutter: 30 },
  { mq: "1850px", columns: 7, gutter: 30 }
];

const defaultContent = [
 /* {
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
  },*/
  {
    title: "box",
    tag: "Box",
    component: Box,
    properties: {
      color: "red",
      style: {
        width: 400,
        height: 400
      }
    }
  }
];


const wrapStyle = {
  overflow: "scroll",
  maxWidth: 400,
  maxHeight: 500,
  boxShadow: "4px 8px 16px 0 rgba(0,0,0,0.7)"
};



class GridDashboard extends React.Component {
  start = 0;
  state = {
    elements: [],
    sizes: sizes
  };

  constructor(props) {
    super(props);

    const items = this.loadItems(5);
    this.setState({
      elements: items
    });

    // this.setRef = this.setRef.bind(this);
    this.doForcePack = this.doForcePack.bind(this);
    //console.log("defaultContent", defaultContent);
  }

  loadItems(num) {
    const items = [];
    const keys = Object.keys(defaultContent);
    for (let i = 0; i < num; ++i) {
      const k = Math.floor(Math.random() * keys.length);
      const { title, tag, path, component, properties } = defaultContent[k];
      items.push(
        <Zoom key={"zoom-widget-" + this.start + i}>
          <Widget
            id={this.start + i}
            key={"widget-" + this.start + i}
            title={title}
            tag={tag}
            path={path}
            component={component}
            childProps={properties}
            wrapStyle={wrapStyle}
          />
        </Zoom>
      );
    }
    this.start += num;
    return items;
  }

  doForcePack() {
    if (this.layout) {
      this.layout.forcePack();
    }
  }

  componentDidUpdate() {
    //console.log("GridDashboard is updated", this.layout);
    if (this.layout) {
      const renderedlayout = this.layout;
      // let elements = TraveseReactElementTree(renderedlayout);
      // console.log();
      // if (!this.createdReactNodes) {
      //   this.createdReactNodes = true;
      //   console.log('creating the react litegraph node of the grid...');
      //   this.litegraphWorkspace.addReactElementAsNode(renderedlayout, 'components/infinitegrid', 'Infinite Grid', 'A react component that renders a infinite grid');
      // }
    }
  }

  /* 
  <Box key={this.start + i} />
  */
  render() {
    //console.log("rendering children", this.state.elements);
    //console.log("render layout =", this.layout);

    return (
      <>
        {/* <LitegraphWorkspace
          ref={lw => { this.litegraphWorkspace = this.litegraphWorkspace || lw }}
          style={{ backgroundColor: "green", minHeight: 300, height: '100%', width: '100%' }} /> */}
        <Masonry
          key="mansory-layout"
          ref={c => (this.layout = this.layout || c)}
          sizes={this.state.sizes}
          loader={<h2>loading...</h2>}
          hasMore={true}
          pack={true}
          loadMore={() => {
            const old = this.state.elements || [];
            const elements = old.concat(this.loadItems(5));
            this.setState({
              elements
            });
          }}
        >
          {this.state.elements}
        </Masonry>
      </>
    );
  }
}

export default GridDashboard;
