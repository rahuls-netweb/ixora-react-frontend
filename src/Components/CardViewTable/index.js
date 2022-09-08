
import React from 'react';
import styles from './cardviewtable.module.css'
export default function EnquiryCardView(){
    
    return(
        <>
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
        </>
    );

}