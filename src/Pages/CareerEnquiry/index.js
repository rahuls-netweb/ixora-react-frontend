import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./careerEnquiry.module.css";
import DataTable from "../../Components/DataTable";
import PopUP from "../../Components/PopUp";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import { headOfficeGetAll } from "../../store/actions/headOfficeAction";
import { branchMasterGetAll } from "../../store/actions/branchMasterAction";
import { countryGetAll } from "../../store/actions/countryAction";
import { qualificationGetAll } from "../../store/actions/qualificationAction";
import { careerGetAll } from "../../store/actions/careerAction";
import AssignUserToStudent from "./AssignUserToStudent";
import Skeleton from "../../Components/Skeleton";
import {
  getPaginatedRecordNumber,
} from "../../utils/helpers";



export default function CareerEnquiry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSlectedStudent] = useState(null);


  const columns = [
    // {
    //   name: "ID",
    //   selector: (_, index) => {
    //     return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
    //   },
    // },
    {
      name: "CCID",
      selector: (row) => row.ccid,
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
        <>
          <Link to={`/career-enquiry/${singleRowData.id}`} target="_blank">
            <MdRemoveRedEye
              className={styles.iconView}
            />
          </Link>
          <a className={styles.assignButton} onClick={() => handleShow(singleRowData)}>
            Assign
          </a>
        </>
      ),
    },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (student) => {

    setSlectedStudent(student);
    setShow(true);
  };

  const { branchMasterList, headOfficeList, countryList, qualificationList, careerList, } = useSelector((state) => ({
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
                    return <option key={headoffice.id} value={headoffice.id}>{headoffice.name}</option>
                  })}
                </Form.Select>

              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Branch</Form.Label>
                <Form.Select defaultValue={""}>
                  <option value="" disabled>--Select--</option>
                  {branchMasterList.map(branch => {
                    return <option key={branch.id} value={branch.id}>{branch.name}</option>
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
                    return <option key={country.id} value={country.id}>{country.name}</option>
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Qualification</Form.Label>
                <Form.Select defaultValue={""}>
                  <option value="" disabled>--Select--</option>
                  {qualificationList.map(qualification => {
                    return <option key={qualification.id} value={qualification.id}>{qualification.name}</option>
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
            <div className="borderUnderLine">
              <div className={styles.careerEnquiries}>
                <div className={styles.careerEnquirieSub}>
                  <h4>List of career enquiries</h4>
                </div>

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

      <PopUP show={show} hide={handleClose} size="lg">
        <AssignUserToStudent student={selectedStudent} />
      </PopUP>
    </Layout>
  );
}
