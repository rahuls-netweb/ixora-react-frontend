import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, Badge, Spinner } from "react-bootstrap";
import styles from "../rootsettings.module.css";
import stylesIndex from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { addBranchesTouser, branchMasterGetAll } from "../../../store/actions/branchMasterAction";
import { employeeMasterGetAll } from "../../../store/actions/employeeMasterAction";
import { rolesGetAll } from "../../../store/actions/rolesAction";
import { v4 as uuidv4 } from "uuid";

export default function AddBranchesToUser({ user }) {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedBranches, setSelectedBranches] = useState(null);
    const [currentBranch, setCurrentBranch] = useState("");
    const dispatch = useDispatch();
    const { branchMasterList, rolesList, employeeMasterList } = useSelector((state) => ({
        branchMasterList: state.branchMaster.branchMasterList,
        rolesList: state.roles.rolesList,
        employeeMasterList: state.employeeMaster.employeeMasterList
    }));

    const selectedUser = employeeMasterList.find(singleUser => singleUser.id === user.id);

    console.log(selectedUser, "selectedUser selectedUser");

    useEffect(() => {
        dispatch(branchMasterGetAll());
        dispatch(rolesGetAll());
    }, []);

    useEffect(() => {
        if (selectedUser) {
            const brancheIds = Array.from(new Set(selectedUser.branches.map(branch => branch.id)));
            const initialBranches = {};
            brancheIds.forEach(branchId => {
                const rolesForBranch = selectedUser.user_has_roles.filter(role => role.branch_id === branchId).map(role => role.role_id);
                initialBranches[branchId] = rolesForBranch;
            });
            console.log(initialBranches, 'dddddddddddddddddddddddd')
            setSelectedBranches(initialBranches)
        }
    }, [user]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(addBranchesTouser({
            userId: user.id,
            ...selectedBranches,
        }, () => {
            setIsSubmitting(false);
            dispatch(employeeMasterGetAll())
        }, () => {
            setIsSubmitting(false);
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
                                                                        setCurrentBranch(branch.id)
                                                                        setSelectedBranches((prevBranch) => {
                                                                            let copiedBranches = {
                                                                                ...(prevBranch || {})
                                                                            }
                                                                            if (!copiedBranches[branch.id]) {
                                                                                copiedBranches = {
                                                                                    ...copiedBranches,
                                                                                    [branch.id]: [],
                                                                                }
                                                                            }
                                                                            setSelectedBranches(copiedBranches);

                                                                            return copiedBranches;
                                                                        })
                                                                    }}
                                                                >
                                                                    <h5>{branch.name}</h5>
                                                                    <h6>
                                                                        {selectedBranches?.[branch.id]?.map(roleId => (
                                                                            <Badge key={uuidv4()}>{getRoleNameByRoleId(roleId)}</Badge>
                                                                        ))}
                                                                    </h6>

                                                                </div>
                                                            );
                                                        })}

                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </td>
                                    <td className={stylesIndex.colPermissions}>
                                        <ul className={stylesIndex.ulModules}>
                                            {currentBranch && rolesList.map((role) => {
                                                return (
                                                    <li key={role.id}>
                                                        <input type="checkbox" checked={currentBranch ? selectedBranches[currentBranch]?.includes(role.id) : false} onChange={(event) => {

                                                            const targetRoles = [...selectedBranches[currentBranch]];

                                                            const index = targetRoles.findIndex(roleId => roleId === role.id);

                                                            if (index === -1) {

                                                                targetRoles.push(role.id);
                                                            } else {

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
                            {/* <Button type="submit" className="themeColor">
                            
                            </Button> */}
                            <Button
                                type="submit"
                                className="formShowUserButton"

                            >
                                {isSubmitting ? (
                                    <Spinner
                                        animation="border"
                                        className={styles.signInLoader}
                                    />
                                ) : "Add Branches"
                                }
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}
