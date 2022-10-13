
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from "./careerEnquiry.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { headOfficeGetAll } from "../../store/actions/headOfficeAction";
import { employeeMasterGetAll } from "../../store/actions/employeeMasterAction";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

const validationSchema = yup.object({
    // branch: yup.string().required("Enter a Branch Name"),
    // employee: yup.string().required("Enter a Employee Name")
});

export default function AssignUserToStudent({ student }) {
    const [error, setError] = useState("");
    const resolver = useYupValidationResolver(validationSchema);
    const dispatch = useDispatch();
    const { branchMasterList, employeeMasterList } = useSelector((state) => ({
        branchMasterList: state.branchMaster.branchMasterList,
        employeeMasterList: state.employeeMaster.employeeMasterList,
    }));
    useEffect(() => {
        dispatch(headOfficeGetAll());
        dispatch(employeeMasterGetAll());

    }, []);
    const options = branchMasterList.map((branch) => {
        return {
            value: branch.id.toString(),
            label: branch.name,
        };
    });
    const options1 = employeeMasterList.map((employee) => {
        return {
            value: employee.id.toString(),
            label: employee.name,
        };
    });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors, isDirty, isValid },
        reset
    } = useForm({
        resolver,
        mode: "onChange",
        defaultValues: {
            branch: "",
            employee: ""
        }
    });

    console.log(errors, ' errors ')

    function onFormSubmit(data) {
        console.log(data, "data data 11 111 111");
        reset();
    }
    return (
        <Form className={styles.popForm} onSubmit={handleSubmit(onFormSubmit)} >
            <Container fluid>
                <Row className='justify-content-end'>
                    <Col md={12} className={styles.customColumn1}>
                        <Form.Group className={styles.divDivision}>
                            <Form.Label className='text-nowrap'> Student Name : {student.first_name} </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={6} className={styles.customBranchCol}>
                        <Form.Group >
                            <Form.Label>Branch</Form.Label>
                            <Controller
                                name={"branch"}
                                control={control}
                                render={({ field }) => {
                                    const { value, onChange } = field;
                                    return (
                                        <Select isClearable options={options} value={value} onChange={(value => {
                                            setError("");
                                            onChange(value);
                                        })} onBlur={() => {
                                            setError("Please Select Branch");
                                        }} />
                                    );
                                }}
                            />
                            <Form.Label className="errorMessage"> {error}</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Employees</Form.Label>
                            <Controller
                                name={"employee"}
                                control={control}
                                render={({ field: { value, onChange } }) => {
                                    return (
                                        <Select isClearable options={options1} value={value} onChange={(value => {
                                            setError("");
                                            onChange(value);
                                        })} onBlur={() => {
                                            setError("Enter country name");
                                        }} />
                                    );
                                }}
                            />
                            <Form.Label className="errorMessage">
                                {errors.employee && errors.employee.message}
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group >
                            <Button className="formShowButton" type="submit">Assign</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </Form>
    )

}