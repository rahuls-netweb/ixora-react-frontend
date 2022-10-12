import React from "react";
import styles from "./careerEnquiry.module.css";
import { Col, Container, Row, Table } from "react-bootstrap";
import { getUndefinedText } from "../../utils/helpers";

export default function ViewAdmissionTable({ admission }) {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12} className={styles.admissionDetails}>
                        <h6>Admission Details</h6>
                    </Col>
                </Row>
            </Container>

            <Table striped bordered hover size="sm" className={styles.tableAdmissionDetail}>
                <tbody>
                    <tr>
                        <td>Admission Type</td>
                        <td>{getUndefinedText(admission.admission_type)}</td>
                    </tr >
                    <tr>
                        <td>Date of Admission</td>
                        <td>{getUndefinedText(admission.date_of_admission)}</td>
                    </tr>
                    <tr>
                        <td>Date Of Joining</td>
                        <td>{getUndefinedText(admission.date_of_joining)}</td>
                    </tr>
                    <tr>
                        <td>Valid Upto</td>
                        <td>{getUndefinedText(admission.valid_upto)}</td>
                    </tr>
                    <tr>
                        <td>Branch Name</td>
                        <td>{getUndefinedText(admission.branch.name)}</td>
                    </tr>
                    <tr>
                        <td>Course Name</td>
                        <td>{getUndefinedText(admission.course.course_name)}</td>
                    </tr>
                    <tr>
                        <td>Current Branch</td>
                        <td>{getUndefinedText(admission.current_branch_id.address)}</td>
                    </tr>
                    <tr>
                        <td>Admission By</td>
                        <td>{getUndefinedText(admission.admission_by)}</td>
                    </tr>
                    <tr>
                        <td>Course Upgrade</td>
                        <td>{getUndefinedText(admission.course.course_upgrade)}</td>
                    </tr>
                    <tr>
                        <td>Course Discount</td>
                        <td>{getUndefinedText(admission.course.course_discount)}</td>
                    </tr>
                    <tr>
                        <td>Update At</td>
                        <td>{getUndefinedText(admission.headoffice)}</td>
                    </tr>

                </tbody>
            </Table>

        </>


    );
}
