import React from "react";
import PropTypes from "prop-types";

import GridLayout from "./GridLayout";
import GutembergEditor from "./GutemberdEditor";

import "./dashboard.css";

const Widget = ({ title, children }) => {
  return (
    <div
      className="widget"
      style={{
        cursor: "drag",
        border: "1px solid black",
        width: "100%",
        height: "100%",
        borderTopRightRadius: "15px",
        borderTopLeftRadius: "15px",
        borderBottomRightRadius: "15px",
        borderBottomLeftRadius: "15px"
      }}
    >
      {children}
    </div>
  );
};

Widget.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element
};

const Box = props => {
  const style = Object.assign(
    {
      background: props.color || "white",
      width: "100%",
      height: "100%"
    },
    props.style || {}
  );
  return <div className="widget-move" {...props} style={style} />;
};

const defaults = {
  minH: 1,
  minW: 3,
  h: 1
};

const gridProps = {
  layouts: {
    lg: [
      // { ...defaults, i: 'A', cmp: <Widget title="Order Book"><OrderBook /></Widget>, x: 0, y: 0, w: 4, h: 7 },
      {
        ...defaults,
        i: "A",
        cmp: (
          <Widget title="Editor1">
            <GutembergEditor />
          </Widget>
        ),
        x: 0,
        y: 0,
        w: 4,
        h: 3
      },
      {
        ...defaults,
        i: "LP",
        cmp: (
          <Widget title="Box1">
            <Box className="coringa" color="purple" />
          </Widget>
        ),
        x: 0,
        y: 1,
        w: 4,
        h: 3
      },
      {
        ...defaults,
        i: "VL",
        cmp: (
          <Widget title="Editor2">
            <GutembergEditor />
          </Widget>
        ),
        x: 5,
        y: 5,
        w: 3,
        h: 2
      }
    ]
  },
  breakpoints: { lg: 1200, md: 661, sm: 660, xxs: 0 },
  rowHeight: 100,
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  useCSSTransforms: false,
  isDraggable: true,
  isResizable: true,
  autoSize: true,
  draggableHandle: ".editor_toolbar,.coringa",
  draggableCancel: "input,textarea,p",
  compactType: "vertical",
  //margin: [1, 1],
  containerPadding: [10, 10]
};

const Experimento = () => (
  <div>
    <GridLayout {...gridProps} />
  </div>
);

export default Experimento;
