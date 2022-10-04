import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./careerEnquiry.module.css";
import DataTable from "../../Components/DataTable";
import PopUP from "../../Components/PopUp";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { headOfficeGetAll } from "../../store/actions/headOfficeAction";
import { branchMasterGetAll } from "../../store/actions/branchMasterAction";
import { countryGetAll } from "../../store/actions/countryAction";
import { qualificationGetAll } from "../../store/actions/qualificationAction";
import { careerGetAll } from "../../store/actions/careerAction";
import Skeleton from "../../Components/Skeleton";
import {
  getPaginatedRecordNumber,
} from "../../utils/helpers";




export default function CareerEnquiry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      name: "ID",
      selector: (_, index) => {
        return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
      },
    },
    {
      name: "Student Name",
      selector: (row) => row.first_name + " " + row.last_name,
    },
    {
      name: "Father Name",
      selector: (row) => row.father_name,
    },

    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "SID",
      selector: (row) => row.sid,
    },

    {
      name: "DOB",
      selector: (row) => row.dob,
    },
    {
      name: "View",
      cell: (singleRowData, index) => (
        <MdRemoveRedEye
          className={styles.iconView}
          onClick={() => {
            navigate(`/career-enquiry/${singleRowData.id}`);
          }}
        />
      ),
    },
  ];

  // const data = [
  //   {
  //     ID: 1,
  //     CCID: "IX2256",
  //     StudentName: "Manjot Kaur",
  //     SID: 96858,
  //     DOJ: "Mon Aug 01 2022",
  //     Branch: "Amritsar",
  //     Admission: "Ankit madaan",
  //     View: (
  //       <MdRemoveRedEye
  //         className={styles.iconView}
  //         onClick={() => {
  //           navigate("/career-enquiry/1");
  //         }}
  //       />
  //     ),
  //   },
  // ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { branchMasterList, headOfficeList, countryList, qualificationList, careerList } = useSelector((state) => ({
    branchMasterList: state.branchMaster.branchMasterList,
    headOfficeList: state.headOffice.headOfficeList,
    countryList: state.country.countryList,
    qualificationList: state.qualification.qualificationList,
    careerList: state.career.careerList,
  }));


  useEffect(() => {
    setLoading(true);
    dispatch(headOfficeGetAll());
    dispatch(branchMasterGetAll());
    dispatch(countryGetAll());
    dispatch(qualificationGetAll());
    dispatch(careerGetAll(
      null,
      () => setLoading(false),
      () => setLoading(false)
    ));
  }, []);
  return (
    <Layout>
      <Form>
        <Container fluid>
          <Row>
            <Col md={12} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>Head Office</Form.Label>
                <Form.Select defaultValue={""}>
                  <option value="" disabled>--Select--</option>
                  {headOfficeList.map(headoffice => {
                    return <option value={headoffice.id}>{headoffice.name}</option>
                  })}
                </Form.Select>

              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Branch</Form.Label>
                <Form.Select defaultValue={""}>
                  <option value="" disabled>--Select--</option>
                  {branchMasterList.map(branch => {
                    return <option value={branch.id}>{branch.name}</option>
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Country</Form.Label>
                <Form.Select defaultValue={""}>
                  <option value="" disabled>--Select--</option>
                  {countryList.map(country => {
                    return <option value={country.id}>{country.name}</option>
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Qualification</Form.Label>
                <Form.Select defaultValue={""}>
                  <option value="" disabled>--Select--</option>
                  {qualificationList.map(qualification => {
                    return <option value={qualification.id}>{qualification.name}</option>
                  })}
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
                  <h4>List of career enquiries</h4>
                </div>

                <Form className={styles.formCareerEnquiries}>
                  <Form.Group className={styles.formCareerEnquirieSub1}>
                    <Form.Label>Head Office</Form.Label>
                    <Form.Select defaultValue={""}>
                      <option value="" disabled>--Select--</option>
                      {headOfficeList.map(headoffice => {
                        return <option value={headoffice.id}>{headoffice.name}</option>
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className={styles.formCareerEnquirieSub2}>
                    <Button
                      className={styles.formShowButton}
                      onClick={handleShow}
                    >
                      Assign
                    </Button>
                  </Form.Group>
                </Form>
              </div>
              {loading ? (
                <div className="dataTableRow" >
                  <Skeleton />
                </div>
              ) : (
                <div className="dataTableRow" >
                  <DataTable columns={columns} rows={careerList} />
                </div>
              )}

            </div>
          </Col>
        </Row>
      </Container>

      <PopUP show={show} hide={handleClose} size="md">
        <Form className={styles.popForm}>
          <Form.Control type="text" placeholder="Select" />
          {/* <AddEmployeeMasterToEnquiry /> */}
        </Form>
      </PopUP>
    </Layout>
  );
}
