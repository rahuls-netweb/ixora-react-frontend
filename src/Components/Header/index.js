

import React from "react";
import styles from "./header.module.css";
import { MdSearch } from "react-icons/md";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaBell } from "react-icons/fa";

export default function Dashboard() {

    return (

        <Container fluid>
            <Row className={styles.rowNavbar}>
                <Col md={12} lg={4} xl={5} className="p-0" >
                    <img src="/img/logo.png" alt="logox" width='150px' />
                </Col>
                <Col md={6} lg={4} xl={3} className={styles.searchNavBarMain}>
                    <div className={styles.searchNavBar}>
                        <input type="type" placeholder="Search" />
                        <span ><MdSearch /> </span>
                    </div>
                    <div className={styles.notificationBell} >
                        < FaBell className={styles.logo} />

                    </div>
                </Col>

                <Col md={6} lg={4} xl={4} className={styles.adminSection} >
                    <div className={styles.adminSubSection1}>
                        <Form.Select defaultValue={""}>
                            <option value="" disabled>--Select--</option>
                        </Form.Select>
                    </div>
                    <div className={styles.adminSubSection2}>
                        <label>Admin Name</label>
                        <img src="/img/admin.png" alt="logox" />
                    </div>


                </Col>
            </Row>
        </Container>


    );
}
