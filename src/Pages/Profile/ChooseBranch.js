import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { MdSwapVert } from 'react-icons/md'
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

    const userId = auth.user.user.id;

    useEffect(() => {
        dispatch(getBranchesByUserId({ userId }));
    }, []);

    function branchSwitch(id) {
        dispatch(
            branchMasterSwitch(id, () => {
                "show message"
            })
        );
    }
    return (
        <Container fluid>
            <Row>
                <Col md={12} style={{ paddingRight: 0 }}>
                    <div>
                        <h1 className={styles.mainHeader}>Choose Branch</h1>
                    </div>
                </Col>

                {currentBranches.map((branch) => {
                    return (
                        <Col md={6} style={{ paddingRight: 0 }}>
                            <div
                                className={
                                    currentSelectedBranch.id === branch.id
                                        ? styles.cardboardActive
                                        : styles.cardboard
                                }
                                onClick={() => branchSwitch(branch.id)}
                                key={branch.id}
                            >
                                <div className={styles.cardboardBody}>
                                    <div className="booking-status d-flex align-items-center">
                                        <span className={styles.iconMd}>
                                            <MdSwapVert className={styles.iconBranch} />
                                        </span>
                                        <div className="ms-4">
                                            <p className={styles.textStyles}> {branch.name}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Col>)
                })}

            </Row>
        </Container >
    );
}
