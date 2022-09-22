import React, { Fragment, useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Container, Row, Col, Tab, Tabs, Form, Button } from "react-bootstrap";
import Layout from "../../Components/Layout";
import styles from "./CCIDAssigned.module.css";
import DynamicForm from "../../Components/DynamicForm";

export default function CCIDassigned() {
  const [data, setData] = useState([
    {
      country: "",
      university: "",
      course: "",
      intake: "",
      courseLink: "",
    },
  ]);
  const [data2, setData2] = useState([
    {
      sponsorName: "",
      relationWithApplicant: "",
      contactNumber: "",
      sourseOfFunds: "",
      annualIncome: "",
      totalFunds: "",
      loanType: "",
    },
  ]);


  const [data3, setData3] = useState([
    {
      name: "",
      relationWithApplicant: "",
      contactNumber: "",
      incomeTaxReturn: "",
      annualIncome: "",
      remarks: "",
      date: "",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleRemoveFields = (index) => {
    const values = [...data];
    values.splice(index, 1);
    setData(values);
  };
  const handleRemoveFields2 = (index) => {
    const values = [...data2];
    values.splice(index, 1);
    setData2(values);
  };
  const handleAddFields = () => {
    const values = [...data];
    values.push({
      country: "",
      university: "",
      course: "",
      intake: "",
      courseLink: "",
    });
    setData(values);
  };
  const handleAddFields2 = () => {
    const values = [...data2];
    values.push({
      sponsorName: "",
      relationWithApplicant: "",
      contactNumber: "",
      sourseOfFunds: "",
      annualIncome: "",
      totalFunds: "",
      loanType: "",
    });
    setData2(values);
  };
  const handleAddFields3 = () => {
    const values = [...data3];
    values.push({
      name: "",
      relationWithApplicant: "",
      typeOfIncome: "",
      contactNumber: "",
      incomeTaxReturn: "",
      annualIncome: "",
      remarks: "",
      date: "",
    });
    setData3(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...data];
    if (event.target.name === "country") {
      values[index].country = event.target.value;
    }
    if (event.target.name === "university") {
      values[index].university = event.target.value;
    }
    if (event.target.name === "course") {
      values[index].course = event.target.value;
    }
    if (event.target.name === "intake") {
      values[index].intake = event.target.value;
    }
    if (event.target.name === "courseLink") {
      values[index].courseLink = event.target.value;
    }
    setData(values);
  };
  const handleInputChange2 = (index, event) => {
    const values = [...data2];
    if (event.target.name === "sponsorName") {
      values[index].sponsorName = event.target.value;
    }
    if (event.target.name === "relationWithApplicant") {
      values[index].relationWithApplicant = event.target.value;
    }
    if (event.target.name === "contactNumber") {
      values[index].contactNumber = event.target.value;
    }
    if (event.target.name === "sourseOfFunds") {
      values[index].sourseOfFunds = event.target.value;
    }
    if (event.target.name === "annualIncome") {
      values[index].annualIncome = event.target.value;
    }
    if (event.target.name === "totalFunds") {
      values[index].totalFunds = event.target.value;
    }
    if (event.target.name === "loanType") {
      values[index].loanType = event.target.id;
    }
    setData2(values);
  };
  const handleInputChange3 = (index, event) => {
    const values = [...data3];
    if (event.target.name === "name") {
      values[index].name = event.target.value;
    }
    if (event.target.name === "relationWithApplicant") {
      values[index].relationWithApplicant = event.target.value;
    }
    if (event.target.name === "contactNumber") {
      values[index].contactNumber = event.target.value;
    }
    if (event.target.name === "incomeTaxReturn") {
      values[index].incomeTaxReturn = event.target.value;
    }
    if (event.target.name === "annualIncome") {
      values[index].annualIncome = event.target.value;
    }
    if (event.target.name === "remarks") {
      values[index].remarks = event.target.value;
    }
    if (event.target.name === "date") {
      values[index].date = event.target.value;
    }
    if (event.target.name === "typeOfIncome") {
      values[index].typeOfIncome = event.target.value;
    }
    setData3(values);
  };

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className={styles.cardview}>
              <Tabs
                defaultActiveKey="EnquiryForm"
                id="fill-tab-example"
                className={"tabs-Content " + styles.tabsContent}
                fill
              >
                <Tab eventKey="EnquiryForm" title="Enquiry Form">
                  <div className={styles.tablecardViewMain}>
                    <Form className={styles.form}>
                      <label className={styles.fieldsetLable}>
                        Registration Enquiry Form
                      </label>
                      <Container fluid>
                        <Row>
                          <Col md={12}>
                            <div className={styles.imgDiv}>
                              <div className={styles.imgText}>
                                Choose Image
                                <img src="" alt="" />
                              </div>
                            </div>
                          </Col>
                          <Col md={12} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>CCID</Form.Label>
                              <Form.Control type="text" placeholder="CCID" />
                            </Form.Group>

                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Contact Number</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Contact Number"
                              />
                            </Form.Group>

                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Confirmed contact number</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Confirmed contact number"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={12} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Alternate number</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Alternate number"
                              />
                            </Form.Group>

                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Email address"
                              />
                            </Form.Group>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Confirmed Email ID</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Confirmed Email ID"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={12} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>
                                Alternate Student emai ID{" "}
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Alternate Student emai ID "
                              />
                            </Form.Group>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Categories</Form.Label>
                              <Form.Select>
                                <option>Select</option>
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Marital Status</Form.Label>
                              <Form.Select>
                                <option>Select Status</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={12} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Qualification</Form.Label>
                              <Form.Select>
                                <option>Select</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col
                            md={12}
                            className={`${styles.customColumn} justify-content-end`}
                          >
                            <Button className={styles.formShowButton}>
                              Next
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="Destination" title="Destination">
                  <div className={styles.tablecardViewMain}>
                    <Form className={styles.form} onSubmit={handleSubmit}>
                      <label className={styles.Fieldset}>Destination</label>
                      <Container fluid>
                        <Row>
                          <DynamicForm
                            data={data}
                            handleInputChange={handleInputChange}
                            handleRemoveFields={handleRemoveFields}
                            handleAddFields={handleAddFields}
                          />
                          <Form.Group className={styles.RemarkdivDivision}>
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Remarks"
                              style={{ padding: "20px" }}
                            />
                          </Form.Group>

                          <Col md={12} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>
                                Tendative date and calling
                              </Form.Label>
                              <Form.Control type="date" />
                            </Form.Group>
                          </Col>
                          <Col
                            md={12}
                            className={`${styles.customColumn} justify-content-end`}
                          >
                            <Button className={styles.formShowButton}>
                              Next
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="WorkExperience" title="Work Experience">
                  <div className={styles.tablecardViewMain}>
                    <Form className={styles.form}>
                      <label className={styles.Fieldset}>Work Experience</label>
                      <Container fluid>
                        <Row>
                          <Col md={12} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Any Work Experience?</Form.Label>
                              <Form.Check
                                type="radio"
                                name="check"
                                id="Not Applicable"
                                label="Not Applicable"
                              />
                              <Form.Check
                                type="radio"
                                name="check"
                                id="Applicable"
                                label="Applicable"
                              />
                            </Form.Group>

                            <Form.Group
                              className={styles.divDivision}
                            ></Form.Group>
                          </Col>

                          <Form.Group className={styles.RemarkdivDivision}>
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Remarks"
                              style={{ padding: "20px" }}
                            />
                          </Form.Group>
                          <Col
                            md={12}
                            className={`${styles.customColumn} justify-content-end`}
                            style={{ marginTop: "20px" }}
                          >
                            <Button className={styles.formShowButton}>
                              Next
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="ImmigrationHistory" title="Immigration History">
                  <div className={styles.tablecardViewMain}>
                    <Form className={styles.form}>
                      <label className={styles.Fieldset}>
                        Immigration History
                      </label>
                      <Container fluid>
                        <Row>
                          <Col md={12} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>
                                Has the Student or Spouse ever Applied for any
                                Visa to any Country?
                              </Form.Label>
                              <Form.Check
                                type="radio"
                                name="check"
                                id="No"
                                label="No"
                              />
                              <div className={styles.yesRadioDiv}>
                                <Form.Check
                                  type="radio"
                                  name="check"
                                  id="Yes"
                                  label="Yes"
                                />
                                <span className={styles.radioSpan}>
                                  (if Yes, Give Details)
                                </span>
                              </div>
                            </Form.Group>

                            <Form.Group
                              className={styles.divDivision}
                            ></Form.Group>
                          </Col>

                          <Form.Group className={styles.RemarkdivDivision}>
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Remarks"
                              style={{ padding: "20px" }}
                            />
                          </Form.Group>
                          <Col
                            md={12}
                            className={`${styles.customColumn} justify-content-end`}
                            style={{ marginTop: "20px" }}
                          >
                            <Button className={styles.formShowButton}>
                              Next
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  </div>
                </Tab>

                <Tab eventKey="Income" title="Income">
                  <div className={styles.tablecardViewMain}>
                    <Form className={styles.form}>
                      <label className={styles.Fieldset}>Income</label>
                      <Container fluid>
                        <Row>
                          {data2.map((data, index, arr) => {
                            return (
                              <Fragment key={`${data}~${index}`}>
                                <Col
                                  md={12}
                                  className={`${styles.customColumn} `}
                                >
                                  <Form.Group>
                                    <Form.Label>
                                      Financial Capacity{" "}
                                      <span>
                                        (Mendatory for Australia and NZ)
                                      </span>{" "}
                                    </Form.Label>
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>
                                      Add More Sponsors{" "}
                                      <span>
                                        {" "}
                                        <FaPlusCircle
                                          onClick={() => {
                                            handleAddFields2();
                                          }}
                                          hidden={
                                            arr.length - 1 === index
                                              ? false
                                              : true
                                          }
                                        />
                                      </span>
                                      <span>
                                        {" "}
                                        <FaMinusCircle
                                          onClick={() => {
                                            handleRemoveFields2();
                                          }}
                                          hidden={
                                            arr.length - 1 === index
                                              ? true
                                              : false
                                          }
                                        />
                                      </span>
                                    </Form.Label>
                                  </Form.Group>
                                </Col>
                                <Col md={12} className={styles.customColumn}>
                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>Sponsor Name</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Sponsor Name"
                                      name="sponsorName"
                                      onChange={(event) =>
                                        handleInputChange2(index, event)
                                      }
                                      value={data2.sponsorName}
                                    />
                                  </Form.Group>

                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>
                                      Relationship with Applicant
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Relationship with Applicant"
                                      name="relationWithApplicant"
                                      onChange={(event) =>
                                        handleInputChange2(index, event)
                                      }
                                      value={data2.relationWithApplicant}
                                    />
                                  </Form.Group>

                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Contact Number"
                                      name="contactNumber"
                                      onChange={(event) =>
                                        handleInputChange2(index, event)
                                      }
                                      value={data2.contactNumber}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={12} className={styles.customColumn}>
                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>Source of Funds</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Source of Funds"
                                      name="sourceOfFunds"
                                      onChange={(event) =>
                                        handleInputChange2(index, event)
                                      }
                                      value={data2.sourseOfFunds}
                                    />
                                  </Form.Group>

                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>Annual Income</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Annual Income"
                                      name="annualIncome"
                                      onChange={(event) =>
                                        handleInputChange2(index, event)
                                      }
                                      value={data2.annualIncome}
                                    />
                                  </Form.Group>
                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>
                                      Total Funds Shown in File
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Total Funds Shown in File"
                                      name="totalFunds"
                                      onChange={(event) =>
                                        handleInputChange2(index, event)
                                      }
                                      value={data2.totalFunds}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={12} className={styles.customColumn}>
                                  <Form.Group className={styles.divDivision}>
                                    <Form.Check
                                      type="radio"
                                      name="loanType"
                                      id="Education Loan"
                                      label="Education Loan"
                                      onClick={(event) =>
                                        handleInputChange2(index, event)
                                      }
                                      value={data2.loanType}
                                    />
                                    <Form.Check
                                      type="radio"
                                      name="loanType"
                                      id="Personal Loan"
                                      label="Personal Loan"
                                      onClick={(event) =>
                                        handleInputChange2(index, event)
                                      }
                                      value={data2.loanType}
                                    />
                                  </Form.Group>
                                </Col>
                              </Fragment>
                            );
                          })}

                          <Col md={12} className={`${styles.customColumn} `}>
                            <Form.Group>
                              <Form.Label
                                style={{
                                  fontSize: "xx-large",
                                  fontWeight: "bold",
                                }}
                              >
                                Income Details
                              </Form.Label>
                            </Form.Group>
                            <Form.Group>
                              <Form.Label
                                style={{
                                  marginTop: "auto",
                                  marginBottom: "auto",
                                }}
                              >
                                Add More Sponsors{" "}
                                <span>
                                  {" "}
                                  <FaPlusCircle />
                                </span>
                              </Form.Label>
                            </Form.Group>
                          </Col>
                          {data2.map((data, index, arr) => {
                            return (
                              <Fragment key={`${data}~${index}`}>
                                <Col md={12} className={styles.customColumn}>
                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Name"
                                    />
                                  </Form.Group>

                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>
                                      Relationship with Applicant
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Relationship with Applicant"
                                    />
                                  </Form.Group>

                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>Type of Income</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Type of Income"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={12} className={styles.customColumn}>
                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>Contact Number</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Contact Number"
                                    />
                                  </Form.Group>

                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>Income Tax Returns</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Income Tax Returns"
                                    />
                                  </Form.Group>
                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>Annual Income</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Annual Income"
                                    />
                                  </Form.Group>
                                </Col>
                                <Form.Group
                                  className={styles.RemarkdivDivision}
                                >
                                  <Form.Label>Remarks</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Remarks"
                                    style={{ padding: "20px" }}
                                  />
                                </Form.Group>
                                <Col md={12} className={styles.customColumn}>
                                  <Form.Group className={styles.divDivision}>
                                    <Form.Label>
                                      Tendative date and calling
                                    </Form.Label>
                                    <Form.Control type="date" />
                                  </Form.Group>
                                </Col>
                              </Fragment>
                            );
                          })}

                          <Col
                            md={12}
                            className={`${styles.customColumn} justify-content-end`}
                          >
                            <Button className={styles.formShowButton}>
                              Next
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  </div>
                </Tab>

                <Tab eventKey="DocumentUploading" title="Document Uploading">
                  <div className={styles.tablecardViewMain}>
                    <Form className={styles.form}>
                      <label className={styles.Fieldset}>
                        Document Uploading
                      </label>
                      <Container fluid>
                        <Row>
                          <Col
                            md={12}
                            className={`${styles.customColumn} justify-content-end`}
                            style={{ marginTop: "20px" }}
                          >
                            <Form.Label>
                              Add more folder <FaPlusCircle />
                            </Form.Label>
                          </Col>
                          <Col md={12} className={styles.customColumn}>
                            <Form.Group
                              className={styles.divDivision}
                            ></Form.Group>
                          </Col>
                          <Col md={12} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Folder Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Folder Name"
                              />
                            </Form.Group>

                            <Form.Group
                              className={styles.divDivision}
                              style={{ marginTop: "43px" }}
                            >
                              <Button
                                className={styles.formShowButton}
                                style={{ width: "165px" }}
                              >
                                Next
                              </Button>
                            </Form.Group>
                            <Form.Group
                              className={styles.divDivision}
                            ></Form.Group>
                          </Col>
                          <Col
                            md={12}
                            className={`${styles.customColumn} justify-content-end`}
                            style={{ marginTop: "20px" }}
                          >
                            <Button className={styles.formShowButton}>
                              Next
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
