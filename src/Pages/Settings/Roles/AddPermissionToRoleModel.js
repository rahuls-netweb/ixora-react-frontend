import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import styles from '../rootsettings.module.css';
import { useDispatch, useSelector } from "react-redux";
import { permissionsCreate, permissionsGetAll, } from "../../../store/actions/permissionsAction";


export default function AddPermissionToRoleModel({ roleName = '' }) {

    const { permissionsList } = useSelector((state) => state.permissions);
    console.log(permissionsList, '7777');
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const resetFields = () => setName("");

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
    function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(
            permissionsCreate(
                { name },
                () => {
                    setIsSubmitting(false);
                    resetFields();
                    dispatch(permissionsGetAll());
                },
                () => setIsSubmitting(false)
            )
        );

        // setMode(PAGE_MODES.add)
    }
    return (
        <Container fluid style={{ paddingLeft: 0 }}>
            <Row>
                <Col md={12} className={styles.customColumn}>
                    <Form onSubmit={handleSubmit} className="w-100">
                        <Form.Group className={styles.permissionDivision}>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Create New Permission"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Button
                                type="submit"
                            >
                                {isSubmitting ?
                                    <Spinner
                                        animation="border"
                                        className={styles.signInLoader}
                                    />
                                    : "Create"
                                }
                            </Button>
                        </Form.Group>
                    </Form>

                </Col>
                <Col md={12} className={styles.customColumn} style={{ marginTop: '15px' }}>
                    {
                        loading ? (
                            <div className="text-center">
                                <Spinner animation="border"
                                    className={styles.signInLoader}
                                />
                            </div>
                        ) : (
                            <ul className={styles.customUL}>
                                {permissionsList.map(el =>
                                    <li><input type="checkbox" /> {el.name}</li>
                                )
                                }
                            </ul>


                        )
                    }
                </Col>
                <Col md={12} className="d-flex justify-content-end" >
                    <Button
                        type="submit"
                        className={styles.themeColor}
                    >
                        {isSubmitting ?
                            <Spinner
                                animation="border"
                                className={styles.signInLoader}
                            />
                            : `Add Permissions to ${roleName}`
                        }
                    </Button>

                </Col>
            </Row>


        </Container >
    )
}