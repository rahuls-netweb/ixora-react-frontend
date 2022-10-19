import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "./careerEnquiry.module.css";
import DataTable from "../../Components/DataTable";
import PopUP from "../../Components/PopUp";
import { MdRemoveRedEye } from "react-icons/md";
import { BiExport } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { headOfficeGetAll } from "../../store/actions/headOfficeAction";
import { branchMasterGetAll } from "../../store/actions/branchMasterAction";
import { countryGetAll } from "../../store/actions/countryAction";
import { qualificationGetAll } from "../../store/actions/qualificationAction";
import { careerGetAll } from "../../store/actions/careerAction";
import AssignUserToStudent from "./AssignUserToStudent";
import Skeleton from "../../Components/Skeleton";
import { getPaginatedRecordNumber } from "../../utils/helpers";
import moment from "moment";

export default function CareerEnquiry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSlectedStudent] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filteredData, setFilteredData] = useState(null);

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
      name: "SID",
      selector: (row) => row.sid,
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
      name: "Date Of Joining",
      selector: (row) => moment(row.date_of_joining).format("DD/MM/YYYY"),
    },
    {
      name: "Action",
      cell: (singleRowData, index) => (
        <>
          <Link to={`/career-enquiry/${singleRowData.id}`} target="_blank">
            <MdRemoveRedEye title="View" className={styles.iconView} />
          </Link>
          <BiExport
            title="Assign "
            className={styles.iconView}
            onClick={() => handleShow(singleRowData)}
          />
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

  const { careerList } = useSelector((state) => ({
    careerList: [...state.career.careerList].sort((a, b) => a.id - b.id),
  }));
  let newList = [];


  useEffect(() => {
    setLoading(true);
    dispatch(headOfficeGetAll());
    dispatch(branchMasterGetAll());
    dispatch(countryGetAll());
    dispatch(qualificationGetAll());
    dispatch(
      careerGetAll(
        null,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, []);

  const dateFilter = () => {
    if (dateFrom && dateTo) {
      careerList.filter((record) => {
        if (
          moment(record.date_of_joining).format("YYYY MM DD") >
          moment(dateFrom).format("YYYY MM DD") &&
          moment(record.date_of_joining).format("YYYY MM DD") <
          moment(dateTo).format("YYYY MM DD")
        ) {
          newList.push(record);
        }
      });
      setFilteredData(newList);
      console.log(newList);
      setDateTo("");
      setDateFrom("");
    }
  };

  return (
    <React.Fragment>
      <Form>
        <Container fluid>
          <Row>
            <Col md={12} className={styles.customColumn2}>
              {/* <Form.Group className={styles.divDivision}>
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
              </Form.Group> */}

              <Form.Group className={styles.divDivision}>
                <Form.Label>Date From</Form.Label>
                <Form.Control
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value);
                    console.log(e.target.value, "datefrom");
                  }}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Date To</Form.Label>
                <Form.Control
                  type="date"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value);
                    console.log(e.target.value, "dateto");
                  }}
                />
              </Form.Group>
              <Form.Group className={styles.divDivisionNew}>
                <Button
                  className={styles.searchData}
                  onClick={() => {
                    dateFilter();
                  }}
                  style={{ marginTop: "2rem" }}
                >
                  Search
                </Button>
              </Form.Group>
              {/* <Form.Group className={styles.divDivision}>
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
              </Form.Group> */}
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
                <div className="dataTableRow">
                  <Skeleton />
                </div>
              ) : (
                <div className="dataTableRow">
                  <DataTable
                    columns={columns}
                    rows={filteredData ? filteredData : careerList}
                  />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      <PopUP show={show} hide={handleClose} size="lg">
        <AssignUserToStudent student={selectedStudent} />
      </PopUP>
    </React.Fragment>
  );
}
