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
import { useEffect } from "react";
import { permissionsGetAll } from "../../../store/actions/permissionsAction";
import { rolesGetAll } from '../../../store/actions/rolesAction'

export default function AddPermissionToRoleModel({ role }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedModule, setSelectedModule] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const { rolesList, permissionsList } = useSelector((state) => ({
        permissionsList: state.permissions.permissionsList,
        rolesList: state.roles.rolesList,
    }));



    const dispatch = useDispatch();

    const existingPermissionsSelectedRole = rolesList.find(singleRole => singleRole.name === role.name);

    useEffect(() => {
        if (existingPermissionsSelectedRole && selectedModule) {
            const selectedIds = {};
            existingPermissionsSelectedRole.module_permission[selectedModule.toLowerCase()]?.forEach(per => {
                selectedIds[per.id] = true;
            });
            setSelectedPermissions(selectedIds);
        }
    }, [existingPermissionsSelectedRole, selectedModule]);

    const permissions = permissionsList.reduce((acc, current) => {
        const permission = current.action_name;
        const module = current.module_name.toUpperCase();
        // const [module, permission] = current.name.split("_");
        acc[module] = {
            ...acc[module],
            [permission]: current,
        };
        return acc;
    }, {});

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);

        // find existing permissions added
        const allPermissionIds = rolesList.filter(singleRole => singleRole.name === role.name).map(singleRole => {
            // singleRole.module_permission.map(el => el.id)
            return singleRole;
        }).map((singlePermission) => {
            return singlePermission.permissions.map(permission => {
                return permission.id
            })
        }).flat();

        Object.entries(selectedPermissions).forEach(([key, value]) => {
            if (!value) {
                // remove
                const index = allPermissionIds.indexOf(+key);
                allPermissionIds.splice(index, 1)
            } else {
                // add
                const index = allPermissionIds.indexOf(+key);
                if (index === -1) {
                    allPermissionIds.push(+key);
                }
            }
        });

        dispatch(addPermissionsToRole({
            roleId: role.id,
            permissionIds: allPermissionIds
        }, () => {
            // onsuccess
            setIsSubmitting(false);
            dispatch(permissionsGetAll());
            dispatch(rolesGetAll());
        }, () => {
            // onFailure
            setIsSubmitting(false);
        }));
    }

    const onSelectModule = (moduleName) => {
        setSelectedModule(moduleName);
        setSelectedPermissions({});
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Container fluid>
                <Row>
                    {/* <Col md={12} className={styles.customColumn} style={{ boxShadow: '0 1.188rem 1.188rem rgb(0 0 0 /16%)' }}>
                        <Form.Label>Add Permission in Roles</Form.Label>
                    </Col> */}
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
                                                                    className={selectedModule === moduleName ? stylesIndex.active : ''}
                                                                    onClick={() => onSelectModule(moduleName)}
                                                                >
                                                                    <h5>{moduleName}</h5>
                                                                    <h6>
                                                                        {/* {allPermissionsBySelectedRole.find(singlePermissionByRole => {
                                                                            singlePermissionByRole.name === 
                                                                        })} */}
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
                                    <td>
                                        {selectedModule && (
                                            <ul className={stylesIndex.ulModules}>
                                                {Object.entries(permissions[selectedModule]).map(
                                                    ([permission, moduleDetail]) => {
                                                        return (
                                                            <li key={permission}>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedPermissions[moduleDetail.id]}
                                                                    onChange={(event) => {
                                                                        const { checked } = event.target;
                                                                        setSelectedPermissions((prevPermissions) => {
                                                                            const copiedPermissions = { ...prevPermissions };
                                                                            if (checked) {
                                                                                copiedPermissions[moduleDetail.id] = true;
                                                                            } else {
                                                                                copiedPermissions[moduleDetail.id] = false;
                                                                                // delete copiedPermissions[moduleDetail.id];
                                                                            }
                                                                            return copiedPermissions;
                                                                        });
                                                                    }}
                                                                />
                                                                <span>{permission}</span>
                                                            </li>
                                                        )
                                                    }
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
        </Form >
    );
}
