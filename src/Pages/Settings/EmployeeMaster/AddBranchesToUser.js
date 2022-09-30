import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import styles from "../rootsettings.module.css";
import stylesIndex from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addBranchesTouser, branchMasterGetAll } from "../../../store/actions/branchMasterAction";
import { rolesGetAll } from "../../../store/actions/rolesAction";

export default function AddBranchesToUser({ user }) {
    const [selectedBranches, setSelectedBranches] = useState(null);
    const [currentBranch, setCurrentBranch] = useState("");
    const dispatch = useDispatch();

    const { branchMasterList, rolesList } = useSelector((state) => ({
        branchMasterList: state.branchMaster.branchMasterList,
        rolesList: state.roles.rolesList,
    }));
    useEffect(() => {
        dispatch(branchMasterGetAll());
        dispatch(rolesGetAll());
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addBranchesTouser({
            userId: user.id,
            ...selectedBranches,
        }, () => {
            console.log("Success!!");
        }, () => {
            console.log("Error!!");
        }));
    }


    const getRoleNameByRoleId = (roleId) => {
        const foundRole = rolesList.find(role => role.id === roleId);
        return foundRole?.name || 'NULL';
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container fluid>
                <Row>
                    <Col md={12} className={styles.customColumn}>
                        <Form.Group className={styles.divDivision}>
                            <Form.Label>Name of the User</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={user.name}
                                disabled={true}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={12} className={stylesIndex.customColumn}>
                        <Table bordered className={stylesIndex.tablePermissions}>
                            <thead>
                                <tr>
                                    <th>Branches</th>
                                    <th>Roles</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={stylesIndex.colPermissions}>
                                        <Container fluid className="p-0">
                                            <Row>
                                                <Col md={12}>
                                                    <div className={stylesIndex.divPermissions}>
                                                        {branchMasterList.map((branch) => {
                                                            return (
                                                                <div
                                                                    key={branch.id}
                                                                    // className={selectedBranches?.[branch.id] ? stylesIndex.active : ""}
                                                                    className={currentBranch === branch.id ? stylesIndex.active : ""}
                                                                    onClick={() => {
                                                                        setCurrentBranch(branch.id);
                                                                        setSelectedBranches((prevBranch) => {
                                                                            let copiedBranches = {
                                                                                ...(prevBranch || {})
                                                                            };
                                                                            if (!copiedBranches[branch.id]) {
                                                                                copiedBranches = {
                                                                                    ...copiedBranches,
                                                                                    [branch.id]: [],
                                                                                };
                                                                            }
                                                                            setSelectedBranches(copiedBranches);
                                                                            // if (copiedBranches[branch.id]) {
                                                                            //     // remove old branch
                                                                            //     delete copiedBranches[branch.id];
                                                                            // } else {
                                                                            //     // append new branch
                                                                            //     copiedBranches = {
                                                                            //         ...copiedBranches,
                                                                            //         [branch.id]: [],
                                                                            //     };
                                                                            // }
                                                                            return copiedBranches;
                                                                        })
                                                                    }}
                                                                >
                                                                    <h5>{branch.name}</h5>
                                                                    {selectedBranches?.[branch.id]?.map(roleId => (
                                                                        <span>
                                                                            {getRoleNameByRoleId(roleId)}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            );
                                                        })}
                                                        ;
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </td>
                                    <td className={stylesIndex.colPermissions}>
                                        <ul className={stylesIndex.ulModules}>
                                            {currentBranch && rolesList.map((role) => {
                                                return (
                                                    <li>
                                                        <input type="checkbox" checked={currentBranch ? selectedBranches[currentBranch]?.includes(role.id) : false} onChange={(event) => {

                                                            const targetRoles = [...selectedBranches[currentBranch]];

                                                            const index = targetRoles.findIndex(roleId => roleId === role.id);

                                                            if (index === -1) {
                                                                // add
                                                                targetRoles.push(role.id);
                                                            } else {
                                                                // remove
                                                                targetRoles.splice(index, 1);
                                                            }

                                                            let copiedBranches = {
                                                                ...selectedBranches,
                                                                [currentBranch]: targetRoles
                                                            }
                                                            setSelectedBranches(copiedBranches);
                                                        }} />
                                                        <span>{role.name}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={12} className="d-flex justify-content-end">
                        <Form.Group>
                            <Button type="submit" className="themeColor">
                                Add Branches
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}
