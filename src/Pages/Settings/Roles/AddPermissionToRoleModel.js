import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Table,
    Badge,
} from "react-bootstrap";
import styles from "../rootsettings.module.css";
import stylesIndex from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addPermissionsToRole } from "../../../store/actions/permissionsAction";

export default function AddPermissionToRoleModel({ role }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedModule, setSelectedModule] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const { permissionsList } = useSelector((state) => state.permissions);
    const dispatch = useDispatch();

    const permissions = permissionsList.reduce((acc, current) => {
        const [module, permission] = current.name.split("_");
        acc[module] = {
            ...acc[module],
            [permission]: current,
        };
        return acc;
    }, {});

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(addPermissionsToRole({
            roleId: role.id,
            permissionIds: Object.keys(selectedPermissions)
        }, () => {
            // onsuccess
            setIsSubmitting(false);
        }, () => {
            // onFailure
            setIsSubmitting(false);
        }));
    }

    const onSelectModule = (moduleName) => {
        setSelectedModule(moduleName);
        setSelectedPermissions({});
    };

    console.log(selectedPermissions, "selected permissions!!!!");



    return (
        <Form onSubmit={handleSubmit}>
            <Container fluid>
                <Row>
                    <Col md={12} className={styles.customColumn}>
                        <Form.Group className={styles.divDivision}>
                            <Form.Label>Name of the Role</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={role.name}
                                disabled={true}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={12} className={stylesIndex.customColumn}>
                        <Table bordered className={stylesIndex.tablePermissions}>
                            <thead>
                                <tr>
                                    <th>Modules</th>
                                    <th>Permissions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className={stylesIndex.colPermissions}>
                                        <Container fluid className="p-0">
                                            <Row>
                                                <Col md={12}>
                                                    <div className={stylesIndex.divPermissions}>
                                                        {Object.entries(permissions).map(
                                                            ([moduleName, permissionName]) => (
                                                                <div
                                                                    key={moduleName}
                                                                    onClick={() => onSelectModule(moduleName)}
                                                                >
                                                                    <h5>{moduleName}</h5>
                                                                    <h6>
                                                                        <Badge>View</Badge>
                                                                        <Badge>Edit</Badge>
                                                                        <Badge>Create</Badge>
                                                                        <Badge>Delete</Badge>
                                                                    </h6>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </td>
                                    <td>
                                        {console.log(selectedModule, "selectedModule")}
                                        {selectedModule && (
                                            <ul className={stylesIndex.ulModules}>
                                                {Object.entries(permissions[selectedModule]).map(
                                                    ([permission, moduleDetail]) => (
                                                        <li key={permission}>
                                                            <input
                                                                type="checkbox"
                                                                onChange={(event) => {
                                                                    const { checked } = event.target;
                                                                    setSelectedPermissions((prevPermissions) => {
                                                                        const copiedPermissions = { ...prevPermissions };
                                                                        if (checked) {
                                                                            copiedPermissions[moduleDetail.id] = true;
                                                                        } else {
                                                                            delete copiedPermissions[moduleDetail.id];
                                                                            // copiedPermissions[moduleDetail.id] = false;
                                                                        }
                                                                        return copiedPermissions;
                                                                    });
                                                                }}
                                                            />
                                                            <span>{permission}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col md={12} className="d-flex justify-content-end">
                        <Form.Group
                        // className={styles.formCareerEnquirieSub2}
                        >
                            <Button type="submit" className="themeColor">
                                Add Permissions
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
}
