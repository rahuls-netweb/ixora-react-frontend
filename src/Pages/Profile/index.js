import React from "react";
import { Container, Row, Col, Tabs, Tab, Form, Button } from "react-bootstrap";
import styles from "./index.module.css";
import { BsPencilSquare } from "react-icons/bs";

export default function Profile() {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <div className="borderUnderLine">
            <div className={styles.userProfile}>
              <div className={`text-center ${styles.userImg}`}>
                <img
                  src="/img/admin1.png"
                  id="dropdown-basic-button"
                  alt="logox"
                />

                <div class={styles.uploadBox}>
                  <label class={styles.uploadBtn}>
                    <BsPencilSquare className={styles.adminIcon} />
                    <input type="file" class={styles.uploadINputfile} />
                  </label>
                </div>
              </div>
              <div className="user-name pt-4 text-center">
                <h4>Admin Name</h4>
                <span>
                  <i className="fa-solid fa-envelope"></i> admin@gmail.com
                </span>
              </div>
            </div>
          </div>
        </Col>
        <Col md={9} className="p-0">
          <div className={`borderUnderLine ${styles.NavTabHeight}`}>
            <Tabs
              defaultActiveKey="details"
              id="uncontrolled-tab-example"
              className="anotherTabContent"
            >
              <Tab eventKey="details" title="Basic Details">
                <Form>
                  <Container fluid>
                    <Row>
                      <Col md={12} className={styles.customColumn}>
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            placeholder="First Name"
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            placeholder="Last Name"
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Contact Number</Form.Label>
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            placeholder="Contact Number"
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            autoComplete="off"
                            placeholder="Email Address"
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Marital Status</Form.Label>
                          <Form.Select defaultValue={""}>
                            <option value="" disabled>
                              --Select--
                            </option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Qualification</Form.Label>
                          <Form.Select defaultValue={""}>
                            <option value="" disabled>
                              --Select--
                            </option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className={styles.saveChanges}>
                          <Button mtype="submit">Save Changes</Button>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </Tab>
              <Tab eventKey="password" title="Password">
                <Form>
                  <Container fluid>
                    <Row>
                      <Col md={12} className={styles.customColumn}>
                        <Form.Group>
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            placeholder="First Name"
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            autoComplete="off"
                            placeholder="Last Name"
                          />
                        </Form.Group>

                        <Form.Group className={styles.saveChanges}>
                          <Button mtype="submit">Change Password</Button>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              </Tab>
              <Tab eventKey="roles" title="Roles and Permission">
                vseaaegvwearvewragverhgearg
              </Tab>
            </Tabs>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
