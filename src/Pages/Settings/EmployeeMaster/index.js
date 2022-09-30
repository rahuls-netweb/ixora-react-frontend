import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../Components/DataTable";
import { MdDelete } from "react-icons/md";
import { BiPencil, BiPlus } from "react-icons/bi";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import styles from "../rootsettings.module.css";
import AddBranchesToUser from './AddBranchesToUser'
import Help from '../../../Components/Help';
import {
  employeeMasterCreate,
  employeeMasterGetAll,
  employeeMasterUpdate,
  employeeMasterDelete,
} from "../../../store/actions/employeeMasterAction";

import {
  getPaginatedRecordNumber,
  resetReactHookFormValues,
} from "../../../utils/helpers";
import { useForm } from "react-hook-form";
import {
  EmailPattern,
  NamePattern,
  PhonePattern,
} from "../../../Components/validation";
import PopUP from "../../../Components/PopUp";
import Skeleton from "../../../Components/Skeleton";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  password_confirmation: "",
  report_time: null,
  report_time_from: "",
  report_time_to: "",
  lunch_from: "",
  lunch_to: "",
  status: 1,
  is_admin: 0,
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};
export default function HeadOffice() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { employeeMasterList } = useSelector((state) => state.employeeMaster);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const handleShow = (user) => {
    setSelectedRole(user);
    setShow(true);
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: initialFormState,
  });

  const columns = [
    {
      name: "ID",
      selector: (_, index) => {
        return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
      },
    },
    {
      name: "Head Office Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Report Time",
      selector: (row) => row.report_time_from,
    },
    {
      cell: (singleRowData, index) => (
        <div>
          {!singleRowData.is_admin ? (
            <BiPlus
              title={`Add Branch to ${singleRowData.name}`}
              className={styles.actionIcon}
              onClick={() => handleShow(singleRowData)}
            />

          ) : null}
          <BiPencil
            className={styles.actionIcon}
            onClick={() => {
              setMode(PAGE_MODES.edit);
              resetReactHookFormValues(
                {
                  id: singleRowData.id,
                  name: singleRowData.name,
                  email: singleRowData.email,
                  phone: singleRowData.phone,
                  password: singleRowData.password,
                  password_confirmation: singleRowData.password_confirmation,
                  report_time_from: singleRowData.report_time_from,
                  report_time_to: singleRowData.report_time_to,
                  lunch_from: singleRowData.lunch_from,
                  lunch_to: singleRowData.lunch_to,
                },
                setValue
              );
            }}
          />

          {!singleRowData.is_admin ? (
            <MdDelete
              className={styles.actionIcon}
              onClick={() => {
                reset();
                setMode(PAGE_MODES.add);
                dispatch(
                  employeeMasterDelete({ id: singleRowData.id }, () =>
                    dispatch(employeeMasterGetAll())
                  )
                );
              }}
            />
          ) : null}
        </div>
      ),
      button: true,
    },
  ];

  useEffect(() => {
    setLoading(true);
    dispatch(
      employeeMasterGetAll(
        null,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, []);

  function onFormSubmit(data) {
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        employeeMasterCreate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add);
            reset();
            dispatch(
              employeeMasterGetAll()
            );
          },
          () => setIsSubmitting(false)
        )
      );
    } else if (mode === PAGE_MODES.edit) {
      dispatch(
        employeeMasterUpdate(
          data,
          () => {
            setIsSubmitting(false);
            reset();
            setMode(PAGE_MODES.add);
            dispatch(employeeMasterGetAll());
          },
          () => setIsSubmitting(false)
        )
      );
    }
    setMode(PAGE_MODES.add);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Container fluid>
          <Row>
            <Col md={12} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  User Name <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="User Name"
                  {...register("name", {
                    required: true,
                    pattern: NamePattern(),
                  })}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Email <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  {...register("email", {
                    pattern: EmailPattern(),
                    required: true,
                  })}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  autoComplete="off"
                  type="tel"
                  placeholder="Phone"
                  {...register(
                    "phone"
                    , { minLength: 10, maxLength: 15, required: true }
                  )}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Password <span className="reqruiredFields">*</span>
                  <Help text="min 8 character is required" />
                </Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  {...register("password", { required: true, minLength: 8 })}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Confirm Password <span className="reqruiredFields">*</span>
                  <Help text="same Password" />
                </Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  placeholder="Confirm Password"
                  {...register("password_confirmation", {
                    required: true,
                    minLength: 8,
                  })}
                />
              </Form.Group>
            </Col>

            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>Report Time From</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Report Time From"
                  {...register("report_time_from")}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Report Time To</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Report Time To"
                  {...register("report_time_to")}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Lunch From</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Lunch From"
                  {...register("lunch_from")}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Lunch To </Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Lunch To"
                  {...register("lunch_to")}
                />
              </Form.Group>
            </Col>

            <Col
              md={2}
              className="d-flex justify-content-end"
              style={{ paddingRight: 0 }}
            >
              <Form.Group className={styles.formCareerEnquirieSub2}>
                <Button
                  type="submit"
                  className={styles.formShowButton}
                  disabled={!isDirty || !isValid}
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
      {loading ? (
        <div className="dataTableRow" >
          <Skeleton />
        </div>
      ) : (
        <div className="dataTableRow">
          <DataTable columns={columns} rows={employeeMasterList} />
        </div>
      )}

      {show && (
        <PopUP show={show} hide={handleClose} size="xl">
          <AddBranchesToUser user={selectedRole} />
        </PopUP>
      )}
    </>
  );
}
