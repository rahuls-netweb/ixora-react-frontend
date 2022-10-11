import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import { Container, Row, Col, Tab, Tabs, Table } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./careerEnquiry.module.css";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import { MdRemoveRedEye } from "react-icons/md";
import { careerGetSingle } from "../../store/actions/careerAction";
import { admissionGetAll } from "../../store/actions/admissionAction";
import CardViewTable from "../../Components/CardViewTable";
import PopUP from "../../Components/PopUp";
import TestDetailView from "../../Components/TestDetailView";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../../Components/Skeleton";
import { getUndefinedText } from '../../utils/helpers'
const columns = [
  {
    name: "Coures Name",
    selector: (row) => row.course.course_name,
  },
  {
    name: "Admission Date",
    selector: (row) => row.date_of_admission,
  },
  {
    name: "Admission From",
    selector: (row) => row.date_of_joining,
  },
  {
    name: "Course Valid",
    selector: (row) => row.valid_upto,
  },
  {
    name: "Branch",
    selector: (row) => row.branch.name,
  },
  {
    name: "View",
    cell: (singleRowData, index) => (
      <>
        <MdRemoveRedEye
          className={styles.iconView}
        />

      </>
    ),
  },
];
const columns2 = [
  {
    name: "Test type",
    selector: (row) => row.Testtype,
  },
  {
    name: "Test Date",
    selector: (row) => row.TestDate,
  },
  {
    name: "Test result date",
    selector: (row) => row.TestResultDate,
  },
  {
    name: "Branch",
    selector: (row) => row.Branch,
  },
  {
    name: "View",
    selector: (row) => row.View,
  },
];
const columns3 = [
  {
    name: "Mock test date",
    selector: (row) => row.MockTestDate,
  },
  {
    name: "Enrollment",
    selector: (row) => row.Enrollment,
  },
  {
    name: "Scores in listening",
    selector: (row) => row.ScoresListening,
  },
  {
    name: "Scores in Speaking",
    selector: (row) => row.ScoreSpeaking,
  },
  {
    name: "Scores in Writing",
    selector: (row) => row.ScoreWriting,
  },
  {
    name: "Scores in Reading",
    selector: (row) => row.ScoreReading,
  },
  {
    name: "Overall  Scorse",
    selector: (row) => row.OverallScorse,
  },
];

export default function CardView() {

  const { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const { singleCareerList, admissionList } = useSelector((state) => ({
    singleCareerList: state.career.singleCareerList,
    admissionList: state.admission.admissionList,
  }));
  console.log(admissionList, 'admissionList admissionList');
  useEffect(() => {
    setLoading(true);
    dispatch(careerGetSingle(
      { id: id },
      () => setLoading(false),
      () => setLoading(false)
    ));
    dispatch(admissionGetAll(
      { id: id },
      () => setLoading(false),
      () => setLoading(false)
    ));
  }, []);


  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const data = [
    {
      ID: 1,
      CouresName: "PTE",
      AdmissionDetails: "Mon Aug 01 2022",
      AdmissionFrom: "Mon Aug 01 2022",
      CourseUpto: "Mon Aug 01 2022",
      Branch: "Amritsar",
      View: <MdRemoveRedEye onClick={handleShow} className={styles.iconView} />,
    },
  ];
  const data2 = [
    {
      ID: 1,
      Testtype: "PTE",
      TestDate: "Mon Aug 01 2022",
      TestResultDate: "Mon Aug 01 2022",
      Branch: "Amritsar",
      View: (
        <MdRemoveRedEye onClick={handleShow1} className={styles.iconView} />
      ),
    },
  ];
  const data3 = [
    {
      ID: 1,
      MockTestDate: "Mon Aug 01 2022",
      Enrollment: "#1298287",
      ScoresListening: "xyz",
      ScoreSpeaking: "xyz",
      ScoreWriting: "45%",
      ScoreReading: "45%",
      OverallScorse: "45%",
    },
  ];
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className={styles.backToCareer}>
              <FaArrowLeft
                className={styles.backToCareerIcon}
                onClick={() => {
                  navigate(-1);
                }}
              />
              <span
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back to career enquiry
              </span>
            </div>
            <div className={styles.cardview}>
              <Tabs
                defaultActiveKey="tentative-from"
                id="fill-tab-example"
                className="tabs-Content tabsContent"
                fill
              >
                <Tab eventKey="tentative-from" title="Tentative From">
                  <div className={styles.tablecardViewMain}>

                    {loading ? (
                      <div className="dataTableRow" >
                        <Skeleton />
                      </div>
                    ) : (
                      <div className="dataTableRow1" >
                        <Table className={styles.tablecardView}>
                          <tr>
                            <td
                              className="text-center"
                              rowSpan={3}
                              colSpan={2}
                            >
                              <img src="/img/Image8.png" alt="Image8" />
                            </td>
                            <td className={styles.columnHeader}>Date of Birth</td>
                            <td>{getUndefinedText(singleCareerList.dob)}</td>
                          </tr>
                          <tr>
                            <td className={styles.columnHeader}>Passport Number</td>
                            <td>{getUndefinedText(singleCareerList.passport_number)}</td>
                          </tr>
                          <tr>
                            <td className={styles.columnHeader}>Current Course</td>
                            <td>{getUndefinedText(singleCareerList.course_id)}</td>
                          </tr>
                          <tr>
                            <td className={styles.columnHeader}>Name</td>
                            <td>{singleCareerList.first_name + " " + singleCareerList.last_name}</td>
                            <td className={styles.columnHeader}>Admission By</td>
                            <td>{getUndefinedText(singleCareerList.admission_by)}</td>
                          </tr>
                          <tr>
                            <td className={styles.columnHeader}>SID</td>
                            <td>{getUndefinedText(singleCareerList.sid)}</td>
                            <td className={styles.columnHeader}>Current Batch</td>
                            <td>{getUndefinedText(singleCareerList.branch_name)}</td>
                          </tr>
                          <tr>
                            <td className={styles.columnHeader}>Date of Admission</td>
                            <td>{getUndefinedText(singleCareerList.date_of_admission)}</td>
                            <td className={styles.columnHeader}>Shifted to</td>
                            <td>####</td>
                          </tr>
                          <tr>
                            <td className={styles.columnHeader}>Date of Joining</td>
                            <td>{getUndefinedText(singleCareerList.date_of_joining)}</td>
                            <td className={styles.columnHeader}>Course Upgrade</td>
                            <td>{getUndefinedText(singleCareerList.course_upgrade)}</td>
                          </tr>
                          <tr>
                            <td className={styles.columnHeader}>Valid Upto</td>
                            <td>{getUndefinedText(singleCareerList.valid_upto)}</td>
                            <td className={styles.columnHeader}>Current Course Discount</td>
                            <td>{getUndefinedText(singleCareerList.course_discount)}</td>
                          </tr>
                          <tr>
                            <td className={styles.columnHeader}>Branch</td>
                            <td>{getUndefinedText(singleCareerList.branch_name)}</td>
                            <td className={styles.columnHeader}>Email ID</td>
                            <td>{getUndefinedText(singleCareerList.email)}</td>
                          </tr>
                          <tr>
                            <td className={styles.columnHeader}>Gender</td>
                            <td>{getUndefinedText(singleCareerList.gender)}</td>
                            <td className={styles.columnHeader}>Father Name</td>
                            <td>{getUndefinedText(singleCareerList.father_name)}</td>
                          </tr>
                        </Table>
                      </div>
                    )}


                  </div>
                </Tab>
                <Tab eventKey="past-admission" title="Past admission Details">
                  <div>
                    <div className={styles.careerEnquiries}>
                      <div className={styles.careerEnquirieSub}>
                        <h4>List of Past Admissions</h4>
                      </div>
                    </div>
                    <div className="dataTableRow1">
                      <DataTable
                        columns={columns}
                        rows={admissionList}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="test-details" title="Test Details">
                  <div>
                    <div className={styles.careerEnquiries}>
                      <div className={styles.careerEnquirieSub}>
                        <h4>Test Details</h4>
                      </div>
                    </div>
                    <div className="dataTableRow">
                      <DataTable
                        columns={columns2}
                        rows={[
                          ...data2,
                          ...data2,
                          ...data2,
                          ...data2,
                          ...data2,
                          ...data2,
                        ]}
                      />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="mockup" title="Mockup">
                  <div>
                    <div className={styles.careerEnquiries}>
                      <div className={styles.careerEnquirieSub}>
                        <h4>Mockup</h4>
                      </div>
                    </div>
                    <div className="dataTableRow">
                      <DataTable
                        columns={columns3}
                        rows={[
                          ...data3,
                          ...data3,
                          ...data3,
                          ...data3,
                          ...data3,
                          ...data3,
                        ]}
                      />
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>

      <PopUP show={show} hide={handleClose} size="lg">
        <CardViewTable />
      </PopUP>
      <PopUP show={show1} hide={handleClose1} size="lg">
        <TestDetailView />
      </PopUP>
    </Layout>
  );
}
