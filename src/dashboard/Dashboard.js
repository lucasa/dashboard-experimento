/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import StackGrid, { transitions, easings } from "react-stack-grid";
import DemoControl from "../instagram/DemoControl";
import Widget from "./components/Widget";

import "../instagram/normalize.css";
import "../instagram/rc-slider.css";
import "../instagram/style.css";

//const PostCard = React.createElement("div", {});

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content || defaultContent,
      duration: 480,
      columnWidth: 300,
      gutter: 5,
      easing: easings.quartOut,
      transition: "fadeDown"
    };
  }

  shuffleItems = () => {
    const components = this.state.content;
    if (components) {
      shuffleArray(components);
      this.setState({ content: components });
    }
  };

  prependItem = item => {
    this.setState({
      content: [item, ...this.state.content]
    });
  };

  appendItem = item => {
    this.setState({
      items: [...this.state.content, item]
    });
  };

  removeItem = id => {
    this.setState({
      items: this.state.content.filter(o => o.id !== id)
    });
  };

  handleDurationChange = duration => {
    this.setState({ duration });
  };

  handleColumnWidthChange = columnWidth => {
    this.setState({ columnWidth });
  };

  handleGutterChange = gutter => {
    this.setState({ gutter });
  };

  handleEasingChange = easing => {
    this.setState({ easing });
  };

  handleTransitionChange = transition => {
    this.setState({ transition });
  };

  render() {
    const {
      content,
      duration,
      columnWidth,
      gutter,
      easing,
      transition: transitionSelect
    } = this.state;

    const transition = transitions[transitionSelect];

    return (
      <div>
        <DemoControl
          duration={duration}
          columnWidth={columnWidth}
          gutter={gutter}
          easing={easing}
          transition={transition}
          onShuffle={this.shuffleItems}
          onPrepend={this.prependItem}
          onAppend={this.appendItem}
          onMultipleAppend={this.multipleAppendItem}
          onDurationChange={this.handleDurationChange}
          onColumnWidthChange={this.handleColumnWidthChange}
          onGutterChange={this.handleGutterChange}
          onEasingChange={this.handleEasingChange}
          onTransitionChange={this.handleTransitionChange}
        />

        <StackGrid
          horizontal
          duration={duration}
          columnWidth={columnWidth}
          gutterWidth={gutter}
          gutterHeight={gutter}
          easing={easing}
          appear={transition.appear}
          appeared={transition.appeared}
          enter={transition.enter}
          entered={transition.entered}
          leaved={transition.leaved}
          onLayout={() => {
            console.log("[DEMO] `onLayout()` has been called."); // eslint-disable-line
          }}
        >
          {content &&
            content.map(config => {
              console.log("rendering", config);
              let { title, tag, path, properties } = config;
              return (
                <Widget
                  key={title}
                  title={title}
                  tag={tag}
                  path={path}
                  childProps={properties}
                />
              );
            })}
        </StackGrid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
      properties: PropTypes.object.isRequired
    })
  )
};

export default Dashboard;
