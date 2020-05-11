import React from "react";
import PropTypes from "prop-types";
import Loadable from "react-loadable";
import ComponentTree from "react-component-tree";
import QRCode from "qrcode.react";

import "./widget.scss";

const LoadingComponent = props => {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
};

var LazyComponent = () => <div />;

// classe de widgets que faz carregamento (import) dinâmico do código JS componente
class Widget extends React.Component {
  constructor(props) {
    super(props);
    const { title, tag, path, childProps, wrapStyle } = props;
    //console.log("Widget created", props);

    const loader = () => {
      //console.log("Loadable importing...", path);
      const imported = import(path);
      //console.log("Loadable imported", imported);
      return imported;
    };

    const render = (loaded, ps) => {
      //console.log("LazyComponent.render loaded", loaded);
      let Component = loaded[tag];
      //console.log("LazyComponent.render component", { Component, ps });
      return <Component {...ps} />;
    };

    LazyComponent = Loadable({
      loading: LoadingComponent,
      loader: loader,
      render: render
    });

    this.state = {
      title,
      tag,
      path,
      childProps,
      wrapStyle
    };
  }

  serialize() {
    //const name = this.displayName || this.name || this.constructor.name;
    const raw = ComponentTree.serialize(this);
    const dump = JSON.stringify(raw || "");
    //console.log("Widget serialize dump string: ", dump.length, dump);
    return dump;
  }

  render() {
    const dump = this.serialize();
    //console.log("Widget.render state", this.state);
    const { title, tag, path, childProps, wrapStyle } = this.state;
    return (
      <div
        className="widget child-content"
        style={{
          cursor: "drag",
          border: "3px solid black",
          width: "100%",
          height: "100%",
          borderTopRightRadius: "0px",
          borderTopLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          ...wrapStyle
        }}
      >
        <div className="metadata-top">
          <div className="title">{title}</div>
        </div>

        <LazyComponent key={"widget-key-" + title} {...childProps} />

        <div className="metadata-bottom">
          <output>
            {tag} - {path}
          </output>
          <QRCode key={"widget-qrcode-" + title} value={dump} />
          <textarea
            value={childProps ? JSON.stringify(childProps) : ""}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  }
}

Widget.propTypes = {
  title: PropTypes.string,
  tag: PropTypes.string,
  path: PropTypes.string,
  childProps: PropTypes.object
};

export default Widget;
