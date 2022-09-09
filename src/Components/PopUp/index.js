import React from "react";
import { Modal, CloseButton } from "react-bootstrap";
import styles from "./popUp.module.css";

export default function PopUP(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.hide}
        backdrop="static"
        keyboard={false}
        size={props.size}
        className="customModal"
      >
        <Modal.Body style={{ position: "relative" }}>
          <CloseButton
            variant="dark"
            onClick={props.hide}
            className={styles.formCloseButton}
          />
          {props.children}
        </Modal.Body>
      </Modal>
    </>
  );
}
