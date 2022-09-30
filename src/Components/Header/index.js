

import React, { useEffect } from "react";
import styles from "./header.module.css";
import { MdSearch } from "react-icons/md";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { branchMasterGetAll } from "../../store/actions/branchMasterAction";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { branchMasterList } = useSelector((state) => state.branchMaster);

    useEffect(() => {
        dispatch(branchMasterGetAll());
    }, []);

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
                        <Form.Select>
                            {branchMasterList.map(branch => {
                                return <option value={branch.id}>{branch.name}</option>
                            })}
                        </Form.Select>
                    </div>
                    <div className={styles.adminSubSection2}>
                        <label>Admin Name</label>
                        <img src="/img/admin.png" alt="logox" />
                        {/* <ul class="dropdown-menu show" data-bs-popper="static">
                            <li><a class="dropdown-item profile-deatils" href="javascript:void(0)">
                                <div class="nav-profile-img">
                                    <img src="/img/admin.png" alt="logox" /></div>
                                <div class="profile-detail-text">
                                    <h5>Admin Name</h5>
                                    <span>admin@gmail.com</span>
                                </div>
                            </a></li>
                            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-pen-to-square"></i>Edit Profile</a></li>
                            <li><a class="dropdown-item" href="#"><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</a></li>
                        </ul> */}
                    </div>


                </Col>
            </Row>
        </Container>


    );
}
