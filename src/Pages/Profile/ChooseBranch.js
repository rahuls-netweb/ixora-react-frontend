import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
    getBranchesByUserId,
    branchMasterSwitch,
} from "../../store/actions/branchMasterAction";

export default function ChooseBranch() {
    const dispatch = useDispatch();
    const { currentBranches, auth, currentSelectedBranch } = useSelector(
        (state) => ({
            currentBranches: state.branchMaster.currentBranches,
            auth: state.auth,
            currentSelectedBranch: state.branchMaster.currentSelectedBranch,
        })
    );
    console.log(currentBranches, "currentBranches currentBranches")

    const userId = auth.user.user.id;
    useEffect(() => {
        console.log("Mounted~!!");
    }, []);
    useEffect(() => {
        dispatch(getBranchesByUserId({ userId }));
    }, []);

    function branchSwitch(id) {
        dispatch(
            branchMasterSwitch(id, () => {
                // show message
            })
        );
    }
    return (
        <Container fluid>
            <Row>
                <Col md={12} style={{ paddingRight: 0 }}>
                    <div className="borderUnderLine">
                        <h1>Choose Branch</h1>
                        <div className={styles.adminSubSection1}>
                            {currentBranches.map((branch) => {
                                return (
                                    <div
                                        className={
                                            currentSelectedBranch.id === branch.id
                                                ? styles.active
                                                : ""
                                        }
                                        onClick={() => branchSwitch(branch.id)}
                                        key={branch.id}
                                    >
                                        {" "}
                                        {branch.name}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
