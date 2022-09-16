
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../Components/DataTable";
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
    permissionsCreate,
    permissionsGetAll,
    permissionsUpdate,
    permissionsDelete,
} from "../../store/actions/permissionsAction";
import { getPaginatedRecordNumber } from "../../utils/helpers";

const initialFormState = {
    name: "",
};

const PAGE_MODES = {
    edit: "edit",
    add: "add",
};

export default function Permissions() {

    const dispatch = useDispatch();
    const [mode, setMode] = useState(PAGE_MODES.add);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialFormState);
    const resetFields = () => setData(initialFormState);

    const { permissionsList } = useSelector((state) => state.permissions);

    const columns = [
        {
            name: "ID",
            selector: (_, index) => {
                return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
            },
        },
        {
            name: "Permission Name",
            selector: (row) => row.name,
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
                            });
                        }}
                    />
                    <MdDelete
                        className={styles.actionIcon}
                        onClick={() => {
                            dispatch(
                                permissionsDelete({ id: singleRowData.id }, () =>
                                    dispatch(permissionsGetAll())
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
        dispatch(
            permissionsGetAll(
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
        if (mode === PAGE_MODES.add) {
            dispatch(
                permissionsCreate(
                    data,
                    () => {
                        setIsSubmitting(false);
                        resetFields();
                        dispatch(permissionsGetAll());
                    },
                    () => setIsSubmitting(false)
                )
            );
        } else if (mode === PAGE_MODES.edit) {
            dispatch(
                permissionsUpdate(
                    data,
                    () => {
                        setIsSubmitting(false);
                        resetFields();
                        dispatch(permissionsGetAll());
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
                                <Form.Label>Permission Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Permission Name"
                                    value={data.name}
                                    onChange={handleData}
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
                        <DataTable columns={columns} rows={permissionsList} />
                    </div>
                )
            }
        </>
    )
}
