import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./telephonicEnquiry.module.css";
import DataTable from "../../Components/DataTable";
import PopUP from "../../Components/PopUp";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    name: "CCID",
    selector: (row) => row.CCID,
  },
  {
    name: "Student Name",
    selector: (row) => row.StudentName,
  },
  {
    name: "SID",
    selector: (row) => row.SID,
  },
  {
    name: "DOJ",
    selector: (row) => row.DOJ,
  },
  {
    name: "Branch",
    selector: (row) => row.Branch,
  },
  {
    name: "Admission",
    selector: (row) => row.Admission,
  },
  {
    name: "View",
    selector: (row) => row.View,
  },
];

export default function TelephonicEnquiry() {
  const navigate = useNavigate();
  const data = [
    {
      ID: 1,
      CCID: "IX2256",
      StudentName: "Manjot Kaur",
      SID: 96858,
      DOJ: "Mon Aug 01 2022",
      Branch: "Amritsar",
      Admission: "Ankit madaan",
      View: (
        <MdRemoveRedEye
          className={styles.iconView}
          onClick={() => {
            navigate("/telephonic-enquiry/1");
          }}
        />
      ),
    },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var form = [];
  for (var i = 0; i <= 10; i++) {
    form.push(
      <Form.Group className={styles.popFormGroup} controlId="formBasicCheckbox">
        <Form.Check
          className={styles.popFormRadioButton}
          type="radio"
          label="Ankit Madaan"
        />
        {/* <Form.Label>Email address</Form.Label> */}
      </Form.Group>
    );
  }

  return (
    <Layout>
      <Form>
        <Container fluid>
          <Row>
            <Col md={12} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>Head Office</Form.Label>
                <Form.Select>
                  <option>List</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Branch</Form.Label>
                <Form.Select>
                  <option>List</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Country</Form.Label>
                <Form.Select>
                  <option>Select</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Qualification</Form.Label>
                <Form.Select>
                  <option>Select</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>

      <Container fluid>
        <Row>
          <Col md={12} style={{ paddingRight: 0 }}>
            <div className={styles.listCareerEnquiries}>
              <div className={styles.careerEnquiries}>
                <div className={styles.careerEnquirieSub}>
                  <h4>List of telephonic enquiries</h4>
                </div>

                <Form className={styles.formCareerEnquiries}>
                  <Form.Group className={styles.formCareerEnquirieSub1}>
                    <Form.Label>Head Office</Form.Label>
                    <Form.Select>
                      <option>List</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className={styles.formCareerEnquirieSub2}>
                    <Button
                      className="formShowButton"
                      onClick={handleShow}
                    >
                      Assign
                    </Button>
                  </Form.Group>
                </Form>
              </div>
              <div className="dataTableRow">
                <DataTable
                  columns={columns}
                  rows={[...data, ...data, ...data, ...data, ...data, ...data]}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <PopUP show={show} hide={handleClose} size="md">
        <Form className={styles.popForm}>
          <Form.Control type="text" placeholder="Select" />
          {form}
        </Form>
      </PopUP>
    </Layout>
  );
}
