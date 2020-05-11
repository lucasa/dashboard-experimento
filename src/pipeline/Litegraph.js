import React from "react";
import { LiteGraph } from "litegraph.js";
import "./nodes/CustomNodes";

import "litegraph.js/css/litegraph.css";
import "./litegraph-style.css";

console.log("litegraph", LiteGraph);

const style = {
  border: "1px solid"
};

const createNode = (type, params) => {
  const { inputs, outputs } = params;

  function node() {
    if (inputs) {
      Object.keys(inputs).forEach(key => this.addInput(key, inputs[key]));
    }

    if (outputs) {
      Object.keys(outputs).forEach(key => this.addOutput(key, outputs[key]));
    }

    Object.keys(params).forEach(key => {
      if (key === "title" || key === "inputs" || key === "outputs") return;
      if (typeof params[key] === "function") return;

      this[key] = params[key];
    });
  }

  Object.keys(params).forEach(key => {
    if (key === "title" || key === "inputs" || key === "outputs") return;

    if (typeof params[key] === "function") {
      node.prototype[key] = params[key];
    }
  });

  if (params.title) {
    node.title = params.title;
  }

  window.LiteGraph.registerNodeType(type, node);
  return node;
};

/**
 1 element of * context menu
 */
// class AddNodeMenuItem implements IContextMenuItem {
//   const contentString = "Adding a node";
//   const hasSubmenu = true;
//   callback = LGraphCanvas.onMenuAdd;
// }

class Workspace extends React.Component {
  componentDidMount() {
    window.addEventListener("resize", this.resize);

    this.graph = new LiteGraph.LGraph();
    console.log("graph", this.graph);
    this.canvas = new LiteGraph.LGraphCanvas("#canvas-litegraph", this.graph);

    // const output = document.createElement("canvas");
    // const outputContext = (this.outputContext = output.getContext("2d"));
    // const bufferCanvas = document.createElement("canvas");
    // const bufferContext = bufferCanvas.getContext("2d");

    //let addNodeMenuItem = new AddNodeMenuItem();
    //to override the default context menu
    // canvas.getMenuOptions = () => {
    //   return [addNodeMenuItem]
    // };
    //canvas.allow_searchbox = false;
    //clear the default of registered nodes
    //LiteGraph.registered_node_types = {};
    //LiteGraph.searchbox_extras = {};
    //LiteGraph.registerNodeType("own node/item", MyNode);
    this.graph.start();
  }

  resize() {
    console.log("window.LiteGraph", window.LiteGraph);
    console.log("window.LiteGraph.LGraphCanvas", window.LiteGraph.LGraphCanvas);
    if (this.canvas) {
      const canvas = this.canvas;
      console.log("canvas", canvas);
      const { devicePixelRatio: dpr } = window;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }
  }

  render() {
    return (
      <canvas id="canvas-litegraph" width="1024" height="720" style={style} />
    );
  }
}

export default Workspace;
