import styles from "./SignIn.module.css";
import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [credField, setCredField] = useState(false);
  const navigate = useNavigate();

  function goToDashboard() {
    navigate("/dashboard", {
      replace: true,
    });
  }
  function Forgetpassword() {
    navigate("/reset-password", {
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
                  <h2>Sign in</h2>
                </Col>
                <Col md={12}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </Col>
                <Col md={12} className="position-relative">
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
                </Col>
                <Col md={12} className="text-center">
                  {/* <button className="btn w-100">Sign In</button> */}

                  <Button
                    type="submit"
                    onClick={goToDashboard}
                    className={styles.signInLink}
                  >
                    Sign In
                  </Button>
                  {/* <NavLink  to="/Dashboard" >Sign In</NavLink>  */}
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
