import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Box = props => {
  const style = Object.assign(
    { background: "silver", border: "1px solid black" },
    props.style || {}
  );
  return <div {...props} style={style} />;
};

/**
 * https://github.com/STRML/react-grid-layout/blob/master/test/examples/8-localstorage-responsive.jsx
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
export default class ResponsiveLocalStorageLayout extends React.PureComponent {
  constructor(props) {
    super(props);

    const originalLayouts = this.getFromLS("layouts") || {};

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
  }

  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 50
    };
  }

  resetLayout() {
    this.setState({ layouts: {} });
  }

  onLayoutChange(layout, layouts) {
    this.saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  renderEmptyBoxes() {
    let boxes = [];
    let k = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        boxes.push(
          <Box
            key={k++}
            data-grid={{ w: 3, h: 3, x: i * 4, y: j * 2, minW: 2, minH: 2 }}
          />
        );
      }
    }
    return boxes;
  }

  render() {
    const boxes = this.renderEmptyBoxes();
    return (
      <div>
        <button onClick={() => this.resetLayout()}>Reset Layout</button>
        <ResponsiveReactGridLayout
          className="layout"
          width={1200}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          breakpoints={{ lg: 1200, md: 661, sm: 660, xxs: 0 }}
          useCSSTransforms={true}
          isDraggable={true}
          isResizable={true}
          compactType="vertical"
          margin={[1, 1]}
          containerPadding={[0, 0]}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          {boxes}
        </ResponsiveReactGridLayout>
      </div>
    );
  }

  getFromLS(key) {
    let ls = {};
    if (this.props.localStorage) {
      try {
        ls = JSON.parse(this.props.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }

  saveToLS(key, value) {
    if (this.props.localStorage) {
      this.props.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }
}
