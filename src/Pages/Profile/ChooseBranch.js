

import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { Container, Row, Col, Tabs, Tab, Form, Button } from "react-bootstrap";
import styles from './index.module.css'
import { useSelector, useDispatch } from "react-redux";
import { branchMasterGetAll, branchMasterSwitch } from "../../store/actions/branchMasterAction";







export default function ChooseBranch() {
    const dispatch = useDispatch();
    const { branchMasterList, auth } = useSelector((state) => ({
        branchMasterList: state.branchMaster.branchMasterList,
        auth: state.auth,
    }));
    // const branchList = auth.user.user.branches[0];
    // console.log(auth.user.user.branches, "branchList");

    const [currentBranch, setCurrentBranch] = useState("");

    useEffect(() => {
        dispatch(branchMasterGetAll());
    }, []);

    function branchSwitch(id) {
        dispatch(branchMasterSwitch(id, () => {
            setCurrentBranch(id)
        }));
    }
    return (
        <Layout>

            <Container fluid>
                <Row>
                    <Col md={12} style={{ paddingRight: 0 }}>
                        <div className="borderUnderLine">
                            <h1>Choose Branch</h1>
                            <div className={styles.adminSubSection1}>
                                {branchMasterList.map(branch => {
                                    return <div
                                        className={currentBranch === branch.id ? styles.active : ""}
                                        onClick={() => branchSwitch(branch.id)}
                                        key={branch.id} > {branch.name}</div>
                                })}

                            </div>
                        </div>

                    </Col>

                </Row>
            </Container >


        </Layout >
    );
}
