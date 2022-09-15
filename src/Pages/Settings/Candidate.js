import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import styles from './rootsettings.module.css';

export default function Candidate() {
  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <div className={styles.cardview}>
            I am country
            {/* <RootSettings>
              <InputFields fields={Input_Fields} /> 
            </RootSettings> */}
            {/* <Tabs
                defaultActiveKey="headoffice"
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
                    <Form onSubmit={handleSubmit}>
                      <Container fluid>
                        <Row>
                          <Col md={10} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Head Office Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                placeholder="Head Office Name"
                                value={data.name}
                                onChange={handleData}
                              />
                            </Form.Group>

                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={handleData}
                              />
                            </Form.Group>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={data.phone}
                                onChange={handleData}
                              />
                            </Form.Group>

                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={data.address}
                                onChange={handleData}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={2} className="d-flex justify-content-end">
                            <Form.Group
                              className={styles.formCareerEnquirieSub2}
                            >
                              <Button
                                type="submit"
                                className={styles.formShowButton}
                              >
                                {isSubmitting ? (
                                  <Spinner
                                    animation="border"
                                    className={styles.signInLoader}
                                  />
                                ) : mode === PAGE_MODES.add ? (
                                  "Create"
                                ) : (
                                  "Update"
                                )}
                              </Button>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  </div>
                  {loading ? (
                    <p>Loading.....</p>
                  ) : (
                    <div style={{ paddingLeft: 15 }}>
                      <DataTable columns={columns} rows={headOfficeList} />
                    </div>
                  )}
                </Tab>
                <Tab eventKey="country" title="Country">
                  <div className={styles.tablecardViewMain}>
                    <Form onSubmit={handleSubmit}>
                      <Container fluid>
                        <Row>
                          <Col md={10} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Country</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                placeholder="Country"
                                value={data.name}
                                onChange={handleData}
                              />
                            </Form.Group>

                          </Col>
                          <Col md={2} className="d-flex justify-content-end">
                            <Form.Group
                              className={styles.formCareerEnquirieSub2}
                            >
                              <Button
                                type="submit"
                                className={styles.formShowButton}
                              >
                                {isSubmitting ? (
                                  <Spinner
                                    animation="border"
                                    className={styles.signInLoader}
                                  />
                                ) : mode === PAGE_MODES.add ? (
                                  "Create"
                                ) : (
                                  "Update"
                                )}
                              </Button>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  </div>
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
              </Tabs> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

