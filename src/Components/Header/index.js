

import React, { useEffect } from "react";
import styles from "./header.module.css";
import { MdSearch, MdOutlineLogout } from "react-icons/md";
import { Container, Row, Col, Form, Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { branchMasterGetAll, branchMasterSwitch, getCurrentSelectedBranch } from "../../store/actions/branchMasterAction";

import { logoutAction } from "../../store/actions/authAction";

export default function Dashboard() {
    const dispatch = useDispatch();
    const { branchMasterList, auth, currentSelectedBranch } = useSelector((state) => ({
        branchMasterList: state.branchMaster.branchMasterList,
        auth: state.auth,
        currentSelectedBranch: state.branchMaster.currentSelectedBranch
    }));
    const logOut = () => {
        dispatch(logoutAction());
    };
    const userId = auth.user?.user?.id;
    const UserName = auth.user?.user?.name;
    const UserEmail = auth.user?.user?.email;

    useEffect(() => {
        dispatch(branchMasterGetAll());
    }, []);

    useEffect(() => {
        dispatch(getCurrentSelectedBranch(userId));
    }, [userId]);

    function branchSwitch(e) {
        const id = e.target.value;
        dispatch(branchMasterSwitch(id));
    }

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
                        <Form.Select onChange={branchSwitch} value={currentSelectedBranch?.id}>
                            {branchMasterList.map(branch => {
                                return <option key={branch.id} value={branch.id} >{branch.name}</option>
                            })}
                        </Form.Select>
                    </div>
                    <div className={styles.adminSubSection2}>
                        <label>{UserName}</label>


                        <Dropdown>
                            <Dropdown.Toggle className={styles.adminImg}>
                                <img src="/img/admin.png" id="dropdown-basic-button" alt="logox" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className={styles.adminMenu}>
                                <Dropdown.Item className={styles.adminItems}>
                                    <div className={`${styles.adminProfiles} ${styles.borderBottom}`}>
                                        <div className="nav-profile-img">
                                            <img src="/img/admin.png" alt="logox" /></div>
                                        <div className="profile-detail-text">
                                            <h5>{UserName}</h5>
                                            <span>{UserEmail}</span>
                                        </div>
                                    </div>
                                    <div className={styles.adminProfiles}><BsPencilSquare /> Edit Profile</div>
                                    <div className={styles.adminProfiles} onClick={logOut} ><MdOutlineLogout />Logout</div>
                                </Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>

                    </div>


                </Col>
            </Row>
        </Container >


    );
}
