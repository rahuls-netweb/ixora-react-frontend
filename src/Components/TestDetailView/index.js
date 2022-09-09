import React from "react";
import styles from "./testDetailView.module.css";
import { Table } from "react-bootstrap";
export default function TestDetailView() {
  return (
    <>
      <Table className={styles.tablecardView}>
        <tr>
          <td>Name</td>
          <td>xzy</td>
          <td>Date of Birth</td>
          <td>02-05-2022</td>
        </tr>
        <tr>
          <td>SID</td>
          <td>#1255</td>
          <td>Passport Number</td>
          <td>paas2563632</td>
        </tr>
        <tr>
          <td>Date of Admission</td>
          <td>07-05-2022</td>
          <td>Current Course</td>
          <td>MBA</td>
        </tr>
        <tr>
          <td>Date of Joining</td>
          <td>02-25-2022</td>
          <td>Admission By</td>
          <td>xyz</td>
        </tr>
        <tr>
          <td>Valid Upto</td>
          <td>2025</td>
          <td>Current Batch</td>
          <td>xyz</td>
        </tr>
        <tr>
          <td>Branch</td>
          <td>Delhi</td>
          <td>Shifted to</td>
          <td>xyz</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>male</td>
          <td>Course Upgrade</td>
          <td>no</td>
        </tr>
        <tr>
          <td>Email ID</td>
          <td>ram@gmail.com</td>
          <td>Current Course Discount</td>
          <td>NO</td>
        </tr>
        <tr>
          <td>Father Name</td>
          <td>xyz</td>
        </tr>
      </Table>
    </>
  );
}
