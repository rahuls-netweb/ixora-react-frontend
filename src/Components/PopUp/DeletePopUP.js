import React from "react";
import { Button, Modal, CloseButton } from "react-bootstrap";
import styles from "./popUp.module.css";

export default function DeletePopUp(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="customModal"
    >
      <Modal.Body style={{ position: "relative" }}>
        <CloseButton
          variant="dark"
          onClick={props.onHide}
          className={styles.formCloseButton}
        />
        {props.children}
        <h2>Are You Sure</h2>
        <br />
        <h5>
          Do you really want to delete this record. This process cannot be
          undone.
        </h5>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button onClick={props.onConfirmed}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}
