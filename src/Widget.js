import React from "react";
import PropTypes from "prop-types";
import styles from "./widget.scss";

export default function Widget({ title, children }) {
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
}

Widget.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element
};
