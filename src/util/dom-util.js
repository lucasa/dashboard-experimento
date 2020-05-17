const { default: traverse } = require("@simple-contacts/react-traverse");

function FindReact(dom, traverseUp = 0) {
  const key = Object.keys(dom).find(key =>
    key.startsWith("__reactInternalInstance$")
  );
  const domFiber = dom[key];
  if (domFiber == null) return null;

  // react <16
  if (domFiber._currentElement) {
    let compFiber = domFiber._currentElement._owner;
    for (let i = 0; i < traverseUp; i++) {
      compFiber = compFiber._currentElement._owner;
    }
    return compFiber._instance;
  }

  // react 16+
  const GetCompFiber = fiber => {
    //return fiber._debugOwner; // this also works, but is __DEV__ only
    let parentFiber = fiber.return;
    while (typeof parentFiber.type === "string") {
      parentFiber = parentFiber.return;
    }
    return parentFiber;
  };
  let compFiber = GetCompFiber(domFiber);
  for (let i = 0; i < traverseUp; i++) {
    compFiber = GetCompFiber(compFiber);
  }
  return compFiber.stateNode;
}

/* const TraveseReactDOMTree = node =>
  traverse(node, {
    DOMElement(path) {
      if (path.node.type === "div") {
        return React.createElement(
          "span",
          path.node.props,
          ...path.traverseChildren()
        );
      }
      return React.cloneElement(
        path.node,
        path.node.props,
        ...path.traverseChildren()
      );
    }
}); */

function TraveseReactElementTree(rootNode) {
  console.log("TraveseReactElementTree rootNode", rootNode);
  const nodes = [];
  traverse(rootNode, {
    ComponentElement(path) {
      console.log("traversing path", path.kindOf(), path);

      const data = path.node.state;
      const props = path.node.props;
      const children = path.node.children;
      console.log("node state", data);
      console.log("node props", props);
      console.log("traversing node children", children);
      nodes.push(path.node);

      path.traverseChildren();
    }
  });

  return nodes;
}

export { FindReact, TraveseReactElementTree };

// const someElement = document.getElementById("someElement");
// const myComp = FindReact(someElement);
// myComp.setState({test1: test2});

// var ReactDOM = require('react-dom');
// (function () {
//     var _render = ReactDOM.render;
//     ReactDOM.render = function () {
//         return arguments[1].react = _render.apply(this, arguments);
//     };
// })();
//document.getElementById("lol").react
