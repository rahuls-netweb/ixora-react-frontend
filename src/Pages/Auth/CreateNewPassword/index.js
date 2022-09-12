import styles from "./CreateNewPassword.module.css";
import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateNewPassword() {
  const [credField, setCredField] = useState(false);
  const navigate = useNavigate();

  function goToDashboard() {
    navigate("/", {
      replace: true,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <Container fluid className={styles.containerX}>
      <Row className=" justify-content-center align-items-center h-100">
        <Col md={4} className={` p-5 ${styles.containerY}`}>
          <div className="text-center">
            <img src="/img/logo.png" alt="logox" />
          </div>
          <Form onSubmit={handleSubmit} className={styles.formDesign}>
            <Container className="p-0">
              <Row className="py-3 justify-content-center">
                <Col md={12}>
                  <h2>Create new password</h2>
                </Col>
                <Col md={12}>
                  <div className={styles.textStyle}>
                    Your new password must be different from previous used
                    passwords.
                  </div>
                </Col>
                <Col
                  md={12}
                  className={`position-relative ${styles.formDistance}`}
                >
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                  <span className={styles.textStyle}>
                    Must be at least 8 characters.
                  </span>
                </Col>
                <Col
                  md={12}
                  className={`position-relative ${styles.formDistance}`}
                >
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                  <span className={styles.textStyle}>
                    Both passsword must match.
                  </span>
                </Col>
                <Col md={12} className="text-center">
                  {/* <button className="btn w-100">Sign In</button> */}

                  <Button
                    type="submit"
                    onClick={goToDashboard}
                    className={styles.signInLink}
                  >
                    Reset Password
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default CreateNewPassword;
