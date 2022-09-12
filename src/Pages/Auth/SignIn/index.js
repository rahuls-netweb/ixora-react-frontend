import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Container, Row, Col, Button, Spinner } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import styles from "./SignIn.module.css";
import { loginAction } from "../../../store/actions/authAction";

function Signin() {
  const [credField, setCredField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function Forgetpassword() {
    navigate("/reset-password", {
      replace: true,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(
      loginAction(email, password, null, () => {
        setIsSubmitting(false);
      })
    );
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
                  <h2>Sign in</h2>
                </Col>
                <Col md={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    autoComplete="off"
                  />
                </Col>
                <Col md={12} className="position-relative">
                  <input
                    type={credField ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    autoComplete="off"
                    onChange={({ target: { value } }) => setPassword(value)}
                  />
                  <span
                    className={styles.floatingEye}
                    onClick={() => setCredField(!credField)}
                  >
                    {!credField ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </Col>
                <Col md={12} className="text-center">
                  <Button
                    type="submit"
                    className={styles.signInLink}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Spinner
                        animation="border"
                        className={styles.signInLoader}
                      />
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <a
                    href="hhtp:google.com"
                    alt="Forggetin"
                    onClick={Forgetpassword}
                  >
                    Forget your Password ?
                  </a>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export default Signin;
