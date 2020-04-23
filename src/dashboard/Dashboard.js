/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import StackGrid, { transitions, easings } from "react-stack-grid";
import DemoControl from "../instagram/DemoControl";
import Widget from "./components/Widget";

import "../instagram/normalize.css";
import "../instagram/rc-slider.css";
import "../instagram/style.css";

const defaultContent = [
  {
    title: "A video...",
    url: "https://www.youtube.com/watch?v=OslN5mxWZi8",
    path: "./VideoCard",
    tag: "VideoCard"
  },
  {
    title: "gfycat",
    url: "https://gfycat.com/uniquejollyhammerkop-elijah-wood",
    path: "./EmbedCard",
    tag: "EmbedCard"
  },
  {
    title: "twitter",
    url: "https://twitter.com/PaolaCarosella/status/1250593587684954115",
    path: "./EmbedCard",
    tag: "EmbedCard"
  },
  {
    title: "maps",
    url:
      "https://www.google.com/maps/place/Sharksushi/@-30.0714187,-51.2581439,13z/data=!4m8!1m2!2m1!1sshark+sushi!3m4!1s0x95197810db64f825:0x2392d6944dcb471e!8m2!3d-30.0534025!4d-51.1921381",
    path: "./EmbedCard",
    tag: "EmbedCard"
  }
];

export default class Dashboard extends Component {
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
    const newItems = [...this.state.content];
    let i = newItems.length;

    while (i) {
      const j = Math.floor(Math.random() * i);
      const t = newItems[--i]; // eslint-disable-line no-plusplus
      newItems[i] = newItems[j];
      newItems[j] = t;
    }

    this.setState({ items: newItems });
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
          {content.map(config => {
            let { title, tag, path, ...childProps } = config;
            console.log("config", config);
            console.log("childProps", childProps);
            return (
              <Widget
                key={title}
                title={title}
                tag={tag}
                path={path}
                childProps={childProps}
              />
            );
          })}
        </StackGrid>
      </div>
    );
  }
}
