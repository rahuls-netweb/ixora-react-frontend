
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../Components/DataTable";
import Select from 'react-select';
// import { colourOptions } from '../data';
import { MdDelete } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Spinner,
} from "react-bootstrap";
import styles from './rootsettings.module.css';
import {
    rolesCreate,
    rolesGetAll,
    rolesUpdate,
    rolesDelete,
} from "../../store/actions/rolesAction";
import { getPaginatedRecordNumber } from "../../utils/helpers";
import { permissionsGetAll } from "../../store/actions/permissionsAction";

const initialFormState = {
    name: "",
    guard_name: null,
    permission_ids: [],
};

const PAGE_MODES = {
    edit: "edit",
    add: "add",
};
export default function Roles() {
    const dispatch = useDispatch();
    const [mode, setMode] = useState(PAGE_MODES.add);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialFormState);
    const resetFields = () => setData(initialFormState);

    const { rolesList, permissionsList } = useSelector((state) => ({
        rolesList: state.roles.rolesList,
        permissionsList: state.permissions.permissionsList,
    }));

    const options = permissionsList.map(permission => ({
        value: permission.id,
        label: permission.name
    }))

    const columns = [
        {
            name: "ID",
            selector: (_, index) => {
                return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
            },
        },
        {
            name: "Roles Name",
            selector: (row) => row.name,
        },
        {
            name: "Guard Name",
            selector: (row) => row.guard_name,
        },
        {
            name: "Permissions",
            selector: (row) => {
                const permissionString = row.permissions.reduce((acc, curr) => {
                    return acc += curr.name + ', '
                }, '');
                return permissionString.substring(0, permissionString.length - 2);
            },
        },
        {
            cell: (singleRowData, index) => (
                <div>
                    <BiPencil
                        className={styles.actionIcon}
                        onClick={() => {
                            setMode(PAGE_MODES.edit);
                            setData({
                                id: singleRowData.id,
                                name: singleRowData.name,
                                // guard_name: singleRowData.guard_name,
                                permission_ids: singleRowData.permission_ids,
                            });
                        }}
                    />
                    <MdDelete
                        className={styles.actionIcon}
                        onClick={() => {
                            dispatch(
                                rolesDelete({ id: singleRowData.id }, () =>
                                    dispatch(rolesGetAll())
                                )
                            );
                        }}
                    />
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    useEffect(() => {
        setLoading(true);
        dispatch(permissionsGetAll());
        dispatch(
            rolesGetAll(
                null,
                () => setLoading(false),
                () => setLoading(false)
            )
        );
    }, []);

    function handleData(e) {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        const permission_ids = data.permission_ids.map(pId => pId.value);
        if (mode === PAGE_MODES.add) {
            dispatch(
                rolesCreate(
                    { ...data, permission_ids },
                    () => {
                        setIsSubmitting(false);
                        resetFields();
                        dispatch(rolesGetAll());
                    },
                    () => setIsSubmitting(false)
                )
            );
        } else if (mode === PAGE_MODES.edit) {
            dispatch(
                rolesUpdate(
                    { ...data, permission_ids },
                    () => {
                        setIsSubmitting(false);
                        resetFields();
                        dispatch(rolesGetAll());
                    },
                    () => setIsSubmitting(false)
                )
            );
        }
        setMode(PAGE_MODES.add)
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Container fluid>
                    <Row>
                        <Col md={10} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                                <Form.Label>Role Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Role Name"
                                    value={data.name}
                                    onChange={handleData}
                                />
                            </Form.Group>

                            <Form.Group className={styles.divDivision}>
                                <Form.Label>Guard Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    // name="guard_name"
                                    placeholder="Web"
                                    // value={data.guard_name}
                                    // onChange={handleData}
                                    disabled={true}
                                />
                            </Form.Group>
                            <Form.Group className={styles.divDivision1}>
                                <Form.Label>Permission Name</Form.Label>
                                {/* <Form.Select name="permission_ids" value={data.permission_ids} onChange={handleData}>
                                    <option value="" disabled>--Select--</option>
                                    {permissionsList.map(permission => {
                                        return <option value={permission.id}>{permission.name}</option>
                                    })}
                                </Form.Select> */}


                                <Select
                                    isMulti
                                    name="colors"
                                    options={options}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={newValues => {
                                        setData(prev => ({
                                            ...prev,
                                            permission_ids: newValues,
                                        }))
                                    }}
                                    value={data.permission_ids}
                                />

                            </Form.Group>

                        </Col>
                        <Col md={2} className="d-flex justify-content-end">
                            <Form.Group
                                className={styles.formCareerEnquirieSub2}
                            >
                                <Button
                                    type="submit"
                                    className={styles.formShowButton}
                                >
                                    {isSubmitting ? (
                                        <Spinner
                                            animation="border"
                                            className={styles.signInLoader}
                                        />
                                    ) : mode === PAGE_MODES.add ? (
                                        "Create"
                                    ) : (
                                        "Update"
                                    )}
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Form>
            {
                loading ? (
                    <p>Loading.....</p>
                ) : (
                    <div style={{ paddingLeft: 15 }}>
                        <DataTable columns={columns} rows={rolesList} />
                    </div>
                )
            }
        </>
    )
}
