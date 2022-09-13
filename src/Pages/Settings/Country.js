import React, { useState } from "react";
import Layout from "../../Components/Layout";
import {
  Container,
  Row,
  Col,
  Tab,
  Tabs,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import styles from "./setting.module.css";
import { useNavigate } from "react-router-dom";

export default function Country() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [location, setLocation] = useState();
  const [key, setKey] = useState("country");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const checkLogin = () => {
    console.log("Name : ", name, "email : ", email, "Loaction : ", location);
  };
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className={styles.cardview}>
              <Tabs
                defaultActiveKey="country"
                id="fill-tab-example"
                className={"tabs-Content " + styles.tabsContent}
                fill
                activeKey={key}
                onSelect={(key) => {
                  setKey(key);
                  navigate("/settings/" + key);
                }}
              >
                <Tab eventKey="headoffice" title="Head Office">
                  <div className={styles.tablecardViewMain}>
                    <Form onSubmit={handleSubmit} method="post">
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Location</Form.Label>
                        <InputGroup className="mb-3">
                          <select
                            onChange={(e) => {
                              setLocation(e.target.value);
                            }}
                          >
                            <option
                              value="SelectCountry"
                              selected="true"
                              disabled="disabled"
                            >
                              Select Country
                            </option>
                            <option value="CANADA">CANADA</option>
                            <option value="INDIA">INDIA</option>
                            <option value="USA">USA</option>
                            <option value="AUSTRALIA">AUSTRALIA</option>
                          </select>
                        </InputGroup>
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={(e) => {
                          checkLogin();
                        }}
                      >
                        Submit
                      </Button>
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="country" title="Country">
                  <div className={styles.tablecardViewMain}>Harman</div>
                </Tab>
                <Tab eventKey="qualification" title="Qualification">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="candidate" title="Candidate">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="college-university" title="College/University">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="branch-master" title="Branch Master">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="employee-master" title="Employee master">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
