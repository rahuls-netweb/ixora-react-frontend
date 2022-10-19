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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";


const validationSchema = yup.object({
  dateFrom: yup.string().required(),
  dateTo: yup.string().required(),
});


export default function CareerEnquiry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSlectedStudent] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const resolver = useYupValidationResolver(validationSchema);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid },
    reset
  } = useForm({
    resolver,
    mode: "onBlur"
  });

  function onFormSubmit(data) {

    careerList.filter((record) => {
      if (
        moment(record.date_of_joining).format("YYYY MM DD") >=
        moment(data.dateFrom).format("YYYY MM DD") &&
        moment(record.date_of_joining).format("YYYY MM DD") <=
        moment(data.dateTo).format("YYYY MM DD")
      ) {
        newList.push(record);
      }
    });
    setFilteredData(newList);

    reset();
  }

  const columns = [

    {
      name: "",
      cell: (singleRowData, index) => (
        <>
          <input
            type="checkbox"
            className={styles.multipleEntries}
            isChecked={Boolean(
              selectedEvents.find((event) => event === singleRowData.id)
            )}

            onChange={(e) => {
              const { checked } = e.target;

              if (checked) {
                setSelectedEvents((prev) => prev.concat(singleRowData.id));
              } else {
                setSelectedEvents((prev) =>
                  prev.filter(
                    (prevSelected) => prevSelected !== singleRowData.id
                  )
                );
              }

            }}
          />
        </>
      ),
    },
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



  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Container fluid>
          <Row>
            <Col md={12} className={styles.customColumn2}>


              <Form.Group className={styles.divDivision}>
                <Form.Label>Date From</Form.Label>
                <Form.Control
                  type="date"
                  {...register("dateFrom")}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Date To</Form.Label>
                <Form.Control
                  type="date"
                  {...register("dateTo")}

                />
              </Form.Group>
              <Form.Group className={styles.divDivisionNew}>
                <Button
                  className={styles.searchData}
                  type="submit"
                  disabled={!isDirty || !isValid}
                  style={{ marginTop: "2rem" }}
                >
                  Search
                </Button>
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
                <div className={`${styles.careerEnquirieSub} ${styles.dFlex}`}>
                  <h4>List of career enquiries</h4>
                  {selectedEvents.length > 1 && <Button
                  >Multiple Assign</Button>}
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
