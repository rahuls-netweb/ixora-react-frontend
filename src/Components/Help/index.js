import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdInfo } from "react-icons/md";
import styles from "./help.module.css";

const Help = ({ text }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {text}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <button className={styles.button}>
        <MdInfo className={styles.icon} />
      </button>
    </OverlayTrigger>
  );
};

export default Help;
