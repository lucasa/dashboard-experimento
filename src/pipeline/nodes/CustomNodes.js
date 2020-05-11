import { LiteGraph, LGraphNode } from "litegraph.js";

class PiNode {
  constructor() {
    this.properties = { pi: Math.PI };
    this.addOutput("PI");
    this.size = [128, 64];
    this.flags = { clip_area: true, resizable: false };
  }

  onDropItem() {
    console.log(this.arguments);
  }

  onDrawForeground(ctx, graphCanvas) {
    if (this.flags.collapsed) return;
    ctx.save();
    ctx.fillColor = "white";
    ctx.fillText("PI value 3.1415...", 8, 16);
    ctx.restore();
  }

  onExecute() {
    this.setOutputData(0, this.properties.pi);
  }
}

const log = it => console.log(it);
LiteGraph.wrapFunctionAsNode("extra/log", log, [""]);

LiteGraph.registerNodeType("extra/pi", PiNode);

class MyNode {
  constructor() {
    this.addInput("input", "number");
    this.addOutput("output", "number");
  }
  onExecute() {
    let a = this.getInputData(0);
    if (a === undefined) {
      a = 0;
    }
    this.setOutputData(0, ++a);
  }
}
MyNode.Title = "own node"; //string which is displayed on the menu
LiteGraph.registerNodeType("extra/mynode", MyNode);
