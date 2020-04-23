import React from "react";
import PropTypes from "prop-types";
import Loadable from "react-loadable";
import ComponentTree from "react-component-tree";

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
// classe de widgets que faz carregamento (import) dinâmico do código JS componente
export default function Widget({
  title,
  tag,
  path,
  childProps,
  ...othersProps
}) {
  console.log("Widget", { title, tag, path, childProps, othersProps });

  const serialize = () => {
    const name = this.displayName || this.name || this.constructor.name;
    const data = ComponentTree.serialize(this);
    return { name, data };
  };

  const LazyComponent = Loadable({
    loader: () => {
      const imported = import(path);
      console.log("Loadable importing", { path, imported });
      return imported;
    },
    loading: LoadingComponent,
    render: (loaded, props) => {
      console.log("LazyComponent loaded", loaded);
      let Component = loaded[tag];
      // loaded.namedExport;
      console.log("LazyComponent", { Component, props });
      return <Component {...props} />;
    }
  });
  return (
    <div
      className="widget"
      style={{
        cursor: "drag",
        border: "1px solid black",
        width: "100%",
        height: "100%",
        borderTopRightRadius: "0px",
        borderTopLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        borderBottomLeftRadius: "0px"
      }}
      {...othersProps}
    >
      <LazyComponent {...childProps} />
    </div>
  );
}

Widget.propTypes = {
  title: PropTypes.string,
  tag: PropTypes.string,
  path: PropTypes.string,
  childProps: PropTypes.object
};
