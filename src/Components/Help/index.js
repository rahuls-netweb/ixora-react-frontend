import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { MdInfo } from "react-icons/md";
import styles from "./help.module.css";

export function PhoneText() {
  return (<div className='toolTipFormat'>
    <h6>Phone format should be</h6>
    <h6>  +1 (408) XXX XXXX.</h6>
  </div>)
}
export function EmailText() {
  return (<div className='toolTipFormat'>
    <h6>Email format should be</h6>
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


