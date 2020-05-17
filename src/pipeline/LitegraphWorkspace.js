import React from "react";
import { LiteGraph } from "litegraph.js";
import "./nodes/CustomNodes";

import "litegraph.js/css/litegraph.css";
import "./litegraph-style.css";

console.log("litegraph", LiteGraph);

const style = {
  border: "1px solid"
};

export const createNode = (type, params) => {
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

  if (params.desc) {
    node.desc = params.desc;
  }

  LiteGraph.registerNodeType(type, node);
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

class LitegraphWorkspace extends React.Component {

  constructor(props) {
    super(props);
  }

  setAddDefaultGraph() {
    var node_const = LiteGraph.createNode("basic/const");
    node_const.pos = [200, 200];
    this.graph.add(node_const);
    node_const.setValue(4.5);

    var node_watch = LiteGraph.createNode("basic/watch");
    node_watch.pos = [500, 200];
    this.graph.add(node_watch);

    node_const.connect(0, node_watch, 0);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);

    this.graph = new LiteGraph.LGraph();
    this.LGraphCanvas = new LiteGraph.LGraphCanvas("#canvas-litegraph", this.graph);
    this.graph.start();

    this.setAddDefaultGraph();

    console.log("graph started", this.graph, this.LGraphCanvas);

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
  }

  resize() {
    console.log("canvas", this.canvas);
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

  addReactElementAsNode(element, type, title, desc) {
    console.log('Adding a react node into litegraph', { element, type, title, desc });

    function reactNode() {
      this.element = element;
      console.log('element props: ', this.element.props);
      console.log('element state: ', this.element.state);

      this.addProperty("propsProperty", null, 'string');
      this.addProperty("stateProperty", null, 'string');

      console.log('Instantiated a react litegraph node.', this);
    }

    reactNode.title = title;
    reactNode.desc = desc;

    reactNode.prototype.onGetInputs = function () {
      return [
        ["props.property to set", "object"],
        ["state.property to set", "object"]];
    };

    reactNode.prototype.onGetOutputs = function () {
      return [
        ["state", "object"],
        ["statePropertyValue", "object"],
        ["children", "array"],  
      ];  
    };

    reactNode.prototype.onExecute = function () {
      //console.log('Node executing react element', this.element);
      const propertyName = this.properties.propsProperty;
      const propertyValue = this.getInputData(1); 
      if (propertyName && propertyValue) {
        console.log('Setting react property', propertyName, propertyValue);
        this.element.props[propertyName] = propertyValue;
      }

      const statePropertyName = this.properties.stateProperty;
      const newStatePropertyValue = this.getInputData(3);
      if (statePropertyName && newStatePropertyValue) {
        const newState = {};  
        newState[statePropertyName] = newStatePropertyValue;
        console.log('Setting react state', statePropertyName, newStatePropertyValue);
        this.element.setState(newState);
      }
      
      const state = this.element.state;
      const dump = JSON.stringify(state);
      //console.log('Dump react state as JSON output', dump);
      this.setOutputData(0, dump);

      if (statePropertyName) {
        const updatedStatePropertyValue = this.element.props[statePropertyName];
        console.log('Output react state key as object', updatedStatePropertyValue);
        this.setOutputData(0, updatedStatePropertyValue);
      }

      this.setOutputData(2, this.element.props['children'] || []);
    }

    LiteGraph.registerNodeType(type, reactNode);
    console.log('LiteGraph registered node', type, reactNode.title);

    var node_watch = LiteGraph.createNode(type);
    node_watch.pos = [300, 20];
    this.graph.add(node_watch);
  }

  render() {
    return (
      <div {...this.props}>
        <canvas ref={(c) => { this.canvas = this.canvas || c }} id="canvas-litegraph" width="1500px" height="250px" style={style} />
      </div>
    );
  }
}

export default LitegraphWorkspace;
