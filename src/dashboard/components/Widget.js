import React, {Suspense} from "react";
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

function DynamicLoader({path, component, ...childProps}) {
  const LazyComponent = path && React.lazy(() => import(`${path}`)) || component;
  if (path) {
    //console.log('Width.DynamicLoader rendering lazy path', path, childProps);
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...childProps}/>
      </Suspense>
    )
  } else {
    //console.log('Width.DynamicLoader rendering component', component, childProps);
    return <LazyComponent {...childProps}/>
  };
}

// classe de widgets que faz carregamento (import) dinâmico do código JS componente
class Widget extends React.Component {
  constructor(props) {
    super(props);
    const { title, tag, path, component, childProps, wrapStyle } = props;
    //console.log("Widget created props", props);

    /* const loader = () => {
      //console.log("Loadable importing...", path);
      if (path) {
        const imported = import(path);
        console.log("Loadable imported", imported);
        return imported;
      } else {
        return new Promise(() => component);
      }
    }; */

    /* const render = (loaded, ps) => {
      //console.log("LazyComponent.render loaded", loaded);
      let Component = loaded[tag];
      //console.log("LazyComponent.render component", { Component, ps });
      return <Component {...ps} />;
    }; */

    /*LazyComponent = Loadable({
      loading: LoadingComponent,
      loader: loader,
      render: render
    });*/

    this.state = {
      title,
      tag,
      path,
      component,
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
    const { title, tag, path, component, childProps, wrapStyle } = this.state;
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

        <DynamicLoader key={"widget-key-" + title} path={path} component={component} {...childProps} />

        <div className="metadata-bottom">
          <output>
            {tag} - {path || component.type}
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
