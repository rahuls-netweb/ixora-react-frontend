

import React from "react";
import styles from "./header.module.css";
import { MdSearch } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import { FaBell } from "react-icons/fa";

export default function Dashboard() {

    return (

        <Container fluid>
            <Row className={styles.rowNavbar}>
                <Col sm={4} md={5} xl={7} >
                    <img src="/img/logo.png" alt="logox" width='150px' />
                </Col>
                <Col sm={4} md={4} xl={3} className={styles.searchNavBarMain}>
                    <div className={styles.searchNavBar}>
                        <input type="type" placeholder="Search" />
                        <span ><MdSearch /> </span>
                    </div>
                    <div className={styles.notificationBell} >
                        < FaBell className={styles.logo} />

                    </div>
                </Col>
                <Col sm={4} md={3} xl={2} className={styles.adminSection} >
                    <label>Admin Name</label>
                    <img src="/img/admin.png" alt="logox" />
                </Col>
            </Row>
        </Container>


    );
}
