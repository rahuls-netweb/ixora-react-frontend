import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdInfo } from "react-icons/md";
import styles from "./help.module.css";

export function PhoneText() {
  return (<div className='toolTipFormat'>
    <h6>digits valid only from 10-14</h6>
    <h6>Ex-1234567890</h6>
  </div>)
}
export function EmailText() {
  return (<div className='toolTipFormat'>
    <h6>username@domain.com</h6>
  </div>)
}
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


