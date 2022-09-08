import React from "react";
import Layout from "../../Components/Layout";
import { Container, Row, Col, Tab, Tabs, Table } from "react-bootstrap";
import { FaArrowLeft } from 'react-icons/fa'
import styles from './careerEnquiry.module.css'
import DataTable from '../../Components/DataTable';
import { useNavigate } from "react-router-dom";
import { MdRemoveRedEye } from 'react-icons/md'

const columns = [
    {
        name: 'Coures Name',
        selector: row => row.CouresName,
    },
    {
        name: 'Admission Details',
        selector: row => row.AdmissionDetails,
    },
    {
        name: 'Admission From',
        selector: row => row.AdmissionFrom,
    },
    {
        name: 'Course Upto',
        selector: row => row.CourseUpto,
    },
    {
        name: 'Branch',
        selector: row => row.Branch,
    },
    {
        name: 'View',
        selector: row => row.View,
    }
];
const columns2 = [
    {
        name: 'Test type',
        selector: row => row.Testtype,
    },
    {
        name: 'Test Date',
        selector: row => row.TestDate,
    },
    {
        name: 'Test result date',
        selector: row => row.TestResultDate,
    },
    {
        name: 'Branch',
        selector: row => row.Branch,
    },
    {
        name: 'View',
        selector: row => row.View,
    }
];
const columns3 = [
    {
        name: 'Mock test date',
        selector: row => row.MockTestDate,
    },
    {
        name: 'Enrollment',
        selector: row => row.Enrollment,
    },
    {
        name: 'Scores in listening',
        selector: row => row.ScoresListening,
    },
    {
        name: 'Scores in Speaking',
        selector: row => row.ScoreSpeaking,
    },
    {
        name: 'Scores in Writing',
        selector: row => row.ScoreWriting,
    },
    {
        name: 'Scores in Reading',
        selector: row => row.ScoreReading,
    },
    {
        name: 'Overall  Scorse',
        selector: row => row.OverallScorse,
    }
];


export default function CardView() {
    const navigate = useNavigate();
    const data = [
        {
            ID: 1,
            CouresName: 'PTE',
            AdmissionDetails: 'Mon Aug 01 2022',
            AdmissionFrom: 'Mon Aug 01 2022',
            CourseUpto: 'Mon Aug 01 2022',
            Branch: 'Amritsar',
            View: <MdRemoveRedEye className={styles.iconView} />
        },
    ]
    const data2 = [
        {
            ID: 1,
            Testtype: 'PTE',
            TestDate: 'Mon Aug 01 2022',
            TestResultDate: 'Mon Aug 01 2022',
            Branch: 'Amritsar',
            View: <MdRemoveRedEye className={styles.iconView} />
        },
    ]
    const data3 = [
        {
            ID: 1,
            MockTestDate: 'Mon Aug 01 2022',
            Enrollment: '#1298287',
            ScoresListening: 'xyz',
            ScoreSpeaking: 'xyz',
            ScoreWriting: '45%',
            ScoreReading: '45%',
            OverallScorse: '45%'
        },
    ]
    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div className={styles.backToCareer}>
                            <FaArrowLeft className={styles.backToCareerIcon} onClick={() => { navigate(-1) }} />
                            <span onClick={() => { navigate(-1) }}>Back to career enquiry</span>
                        </div>
                        <div className={styles.cardview}>
                            <Tabs
                                defaultActiveKey="tentative-from"
                                id="fill-tab-example"
                                className={"tabs-Content " + styles.tabsContent}
                                fill
                            >

                                <Tab eventKey="tentative-from" title="Tentative From">

                                    <div className={styles.tablecardViewMain}>
                                        <Table className={styles.tablecardView}>
                                            <tr>
                                                <td className={styles.tablecardViewCustomCol} rowSpan={3} colSpan={2}><img src="/img/Image8.png" alt="Image8" /></td>
                                                <td>Date of Birth</td>
                                                <td>02-05-2022</td>
                                            </tr>
                                            <tr>
                                                <td>Passport Number</td>
                                                <td>paas2563632</td>
                                            </tr>
                                            <tr>
                                                <td>Current Course</td>
                                                <td>MBA</td>
                                            </tr>
                                            <tr>
                                                <td>Name</td>
                                                <td>xzy</td>
                                                <td>Admission By</td>
                                                <td>xyz</td>
                                            </tr>
                                            <tr>
                                                <td>SID</td>
                                                <td>#1255</td>
                                                <td>Current Batch</td>
                                                <td>xyz</td>
                                            </tr>
                                            <tr>
                                                <td>Date of Admission</td>
                                                <td>07-05-2022</td>
                                                <td>Shifted to</td>
                                                <td>xyz</td>
                                            </tr>
                                            <tr>
                                                <td>Date of Joining</td>
                                                <td>02-25-2022</td>
                                                <td>Course Upgrade</td>
                                                <td>no</td>
                                            </tr>
                                            <tr>
                                                <td>Valid Upto</td>
                                                <td>2025</td>
                                                <td>Current Course Discount</td>
                                                <td>NO</td>
                                            </tr>
                                            <tr>
                                                <td>Branch</td>
                                                <td>Delhi</td>
                                                <td>Email ID</td>
                                                <td>ram@gmail.com</td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td>male</td>
                                                <td>Father Name</td>
                                                <td>xyz</td>
                                            </tr>
                                        </Table>
                                    </div>


                                </Tab>
                                <Tab eventKey="past-admission" title="Past admission Details">
                                    <div>
                                        <div className={styles.careerEnquiries}>
                                            <div className={styles.careerEnquirieSub}>
                                                <h4>List of Past Admissions</h4>
                                            </div>

                                        </div>
                                        <div style={{ paddingLeft: 15 }}>
                                            <DataTable columns={columns} rows={[...data, ...data, ...data, ...data, ...data, ...data]} />
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
                                        <div style={{ paddingLeft: 15 }}>
                                            <DataTable columns={columns2} rows={[...data2, ...data2, ...data2, ...data2, ...data2, ...data2]} />
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
                                        <div style={{ paddingLeft: 15 }}>
                                            <DataTable columns={columns3} rows={[...data3, ...data3, ...data3, ...data3, ...data3, ...data3]} />
                                        </div>
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

