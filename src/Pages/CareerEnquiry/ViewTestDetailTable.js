import React from "react";
import styles from "./careerEnquiry.module.css";
import { Col, Container, Row, Table } from "react-bootstrap";
import { getUndefinedText } from "../../utils/helpers";

export default function ViewTestDetailTable({ testDetail }) {
    console.log(testDetail, "testDetail role role role testDetail1111111");
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12} className={styles.admissionDetails}>
                        <h6>Test Details</h6>
                    </Col>
                </Row>
            </Container>

            <Table striped bordered hover size="sm" className={styles.tableAdmissionDetail}>
                <tbody>
                    <tr>
                        <td>Test Type</td>
                        <td>{getUndefinedText(testDetail.type)}</td>
                    </tr>
                    <tr>
                        <td>Branch Name</td>
                        <td>{getUndefinedText(testDetail.admission_type)}</td>
                    </tr >
                    <tr>
                        <td>Student Name</td>
                        <td>{getUndefinedText(testDetail.enquiry.first_name + testDetail.enquiry.last_name)}</td>
                    </tr>
                    <tr>
                        <td>Student Email</td>
                        <td>{getUndefinedText(testDetail.enquiry.email)}</td>
                    </tr>
                    <tr>
                        <td>Imported Test</td>
                        <td>{getUndefinedText(testDetail.imported_test_id)}</td>
                    </tr>
                    <tr>
                        <td>Test Created </td>
                        <td>{getUndefinedText(testDetail.test_created_at)}</td>
                    </tr>
                    <tr>
                        <td>Test Data</td>
                        <td>{getUndefinedText(testDetail.test_data)}</td>
                    </tr>
                    <tr>
                        <td>Test Upgrade</td>
                        <td>{getUndefinedText(testDetail.updated_at)}</td>
                    </tr>

                </tbody>
            </Table>

        </>


    );
}
