import React from "react";
import { Container, Row, Col, Button, Modal, CloseButton } from "react-bootstrap";
import styles from "./popUp.module.css";
import { TiDeleteOutline } from 'react-icons/ti'

export default function DeletePopUp({ mode = 'delete', ...props }) {
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
        <Container fluid>
          <Row>

            <Col md={12} className="text-center">
              <TiDeleteOutline className={styles.formDeleteButton} />
              <h2 className={styles.formConfirmH2} >Are You Sure?</h2>
              <h5 className={styles.formConfirmH5}>
                Do you really want to {mode} this record. This process cannot be
                undone.
              </h5>
            </Col>
            <Col md={12} className="text-center">
              <Button className={styles.cancelButton} onClick={props.onHide}>Cancel</Button>
              <Button className={styles.deleteButton} onClick={props.onConfirmed}>Confirm</Button>
            </Col>
          </Row>
        </Container>




      </Modal.Body>


    </Modal>
  );
}
