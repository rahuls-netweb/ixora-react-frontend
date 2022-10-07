
import React, { useEffect } from 'react';
import Select from 'react-select';
import styles from "./careerEnquiry.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { headOfficeGetAll } from "../../store/actions/headOfficeAction";
import { employeeMasterGetAll } from "../../store/actions/employeeMasterAction";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

const validationSchema = yup.object({
    branch: yup.string().required("Enter a Branch Name"),
    employee: yup.string().required("Enter a Employee Name")
});

export default function AssignUserToStudent({ student }) {

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
            value: branch.id,
            label: branch.name,
        };
    });
    const options1 = employeeMasterList.map((user) => {
        return {
            value: user.id,
            label: user.name,
        };
    });
    const {
        handleSubmit,
        register,
        formState: { errors, isDirty, isValid },
        reset
    } = useForm({
        resolver,
        mode: "onBlur"
    });

    function onFormSubmit(data) {
        console.log(data, "data data 11 111 111");
        reset();
    }
    return (
        <Form className={styles.popForm} onSubmit={handleSubmit(onFormSubmit)} >
            <Container fluid>
                <Row className='justify-content-end'>
                    <Col md={12} className={styles.customColumn1}>
                        <Form.Group cla ssName={styles.divDivision}>
                            <Form.Label className='text-nowrap'> Student Name : {student.first_name} </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={6} className={styles.customBranchCol}>
                        <Form.Group >
                            <Form.Label>Branch</Form.Label>
                            <Select isClearable options={options}   {...register("branch")} />
                            <Form.Label className="errorMessage">
                                {errors.branch && errors.branch.message}
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Employees</Form.Label>
                            <Select isClearable options={options1}   {...register("employee")} />
                            <Form.Label className="errorMessage">
                                {errors.employee && errors.employee.message}
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group >
                            <Button className="formShowButton" disabled={!isDirty || !isValid} type="submit">Assign</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </Form>
    )

}