
import React, { useEffect } from 'react';
import Select from 'react-select';
import styles from "./careerEnquiry.module.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { headOfficeGetAll } from "../../store/actions/headOfficeAction";
import { getEmployeesByBranchId } from "../../store/actions/employeeMasterAction";
import { assignEnquiryToEmployee } from "../../store/actions/careerAction";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

const validationSchema = yup.object({
    branch: yup.object().required("Enter a Branch Name"),
    employee: yup.object().required("Enter a Employee Name")
});

export default function AssignUserToStudent({ student }) {
    console.log(student.id, "student Id");
    const resolver = useYupValidationResolver(validationSchema);
    const dispatch = useDispatch();
    const { branchMasterList, userListByBranch } = useSelector((state) => ({
        branchMasterList: state.branchMaster.branchMasterList,
        userListByBranch: state.employeeMaster.userListByBranch,
    }));
    useEffect(() => {
        dispatch(headOfficeGetAll());

    }, []);


    const options = branchMasterList.map((branch) => {
        return {
            value: branch.id.toString(),
            label: branch.name,
        };
    });
    const options1 = userListByBranch.map((employee) => {
        return {
            value: employee.id.toString(),
            label: employee.name,
        };
    });
    const {
        handleSubmit,
        control,
        formState: { errors, isDirty, isValid },
        reset,
        getValues,
        setValue,
        watch,
    } = useForm({
        resolver,
        mode: "onChange",
        defaultValues: {
            branch: "",
            employee: ""
        }
    });
    const { branch: { value: branchId } } = getValues();
    // console.log(getValues(), "Values22314")
    const selectedBranch = watch("branch");

    useEffect(() => {
        if (selectedBranch) {
            setValue("employee", "")
            dispatch(getEmployeesByBranchId({ branchId }));
        }
    }, [selectedBranch]);


    function onFormSubmit(data) {
        reset();
        dispatch(
            assignEnquiryToEmployee(
                {
                    enquiry_id: student.id,
                    branch_id: data.branch.value,
                    user_id: data.employee.value,
                },
                () => {
                    reset();
                },

            )
        );
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
                                    const { value, onChange, onBlur } = field;

                                    return (
                                        <Select isClearable options={options} value={value} onChange={onChange} onBlur={onBlur} />
                                    );
                                }}
                            />
                            <Form.Label className="errorMessage">
                                {errors.branch && errors.branch.message}
                            </Form.Label>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group >
                            <Form.Label>Employees</Form.Label>
                            <Controller
                                name={"employee"}
                                control={control}
                                render={({ field: { value, onChange, onBlur } }) => {
                                    return (
                                        <Select isClearable
                                            options={options1}
                                            value={value} onChange={(value => {

                                                onChange(value);
                                            })} onBlur={onBlur} />
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
                            <Button className="formShowButton" disabled={!isDirty || !isValid} type="submit">Assign</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </Form>
    )

}