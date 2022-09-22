import React from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Table,
    Badge,
} from "react-bootstrap";
import styles from "../rootsettings.module.css";
import stylesIndex from "./index.module.css";
import { useSelector } from "react-redux";

export default function AddPermissionToRoleModel({ role }) {


    // const [selectedPermissions, setSelectedPermissions] = useState({});
    const { rolesList, permissionsList } = useSelector((state) => ({
        permissionsList: state.permissions.permissionsList,
        rolesList: state.roles.rolesList,
    }));


    const existingPermissionsSelectedRole = rolesList.find(singleRole => singleRole.name === role.name);

    const permissions = permissionsList.reduce((acc, current) => {
        const permission = current.action_name;
        const module = current.module_name.toUpperCase();
        acc[module] = {
            ...acc[module],
            [permission]: current,
        };
        return acc;
    }, {});


    return (

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
                                                                className={stylesIndex.newDiv}
                                                            >
                                                                <h5>{moduleName}</h5>
                                                                <h6>

                                                                    {existingPermissionsSelectedRole.module_permission[moduleName.toLowerCase()]?.map(existingPermission => {

                                                                        const [module, permission] = existingPermission.name.split("_");
                                                                        return (
                                                                            <Badge>{permission}</Badge>
                                                                        )
                                                                    })}
                                                                </h6>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </td>

                            </tr>
                        </tbody>
                    </Table>
                </Col>

            </Row>
        </Container>

    );
}
