import React, { useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Table,
} from "react-bootstrap";
import styles from "../rootsettings.module.css";
import stylesIndex from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { branchMasterGetAll } from "../../../store/actions/branchMasterAction";
import { rolesGetAll } from "../../../store/actions/rolesAction";


export default function AddBranchesToUser({ user }) {
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
                                                        {branchMasterList.map(branch => {
                                                            return (
                                                                <div key={branch.id}>
                                                                    <h5 >{branch.name}</h5>
                                                                </div>
                                                            )
                                                        })};

                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </td>
                                    <td className={stylesIndex.colPermissions}>
                                        <ul className={stylesIndex.ulModules}>
                                            {rolesList.map(role => {
                                                return (
                                                    <li>
                                                        <input type="checkbox" />
                                                        <span>{role.name}</span>
                                                    </li>
                                                )
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
        </Form >
    );
}
