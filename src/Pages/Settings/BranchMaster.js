import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../Components/DataTable";
import { MdDelete, MdRestore } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Skeleton from "../../Components/Skeleton";
import styles from "./rootsettings.module.css";
import { v4 as uuidv4 } from "uuid";
import {
  branchMasterCreate,
  branchMasterGetAll,
  branchMasterUpdate,
  branchMasterDelete,
} from "../../store/actions/branchMasterAction";
import { headOfficeGetAll } from "../../store/actions/headOfficeAction";

import {
  getPaginatedRecordNumber,
  resetReactHookFormValues,
} from "../../utils/helpers";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

import Help, { PhoneText, EmailText } from "../../Components/Help";
import ConfirmPrompt from "../../Components/PopUp/ConfirmPrompt";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  headoffice_id: "",
  branch_code: "",
  opening_time: "",
  closing_time: "",
  lunch_time: "",
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Enter a valid Name")
    .matches(/^[a-z]/gi, {
      message: "Enter a valid Name",
    }),
  email: yup
    .string()
    .email("Enter a valid Email")
    .required("Enter a valid Email"),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, { message: "Enter a valid Phone Number" })
    .min(10, "Phone range 10-14 digits")
    .max(14, "Phone range 10-14 digits"),
});

export default function BranchMaster() {
  const resolver = useYupValidationResolver(validationSchema);
  const [action, setAction] = useState("");
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [singleRowData, setSingleRowData] = useState();

  function cancelUser() {
    reset();
    setMode(PAGE_MODES.add);
  }

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    resolver,
    mode: "onBlur",
    defaultValues: initialFormState,
  });

  const { branchMasterList, headOfficeList } = useSelector((state) => ({
    branchMasterList: state.branchMaster.branchMasterList,
    headOfficeList: state.headOffice.headOfficeList,
  }));

  const columns = [
    {
      name: "ID",
      selector: (_, index) => {
        return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
      },
    },

    {
      name: "Branch code",
      selector: (row) => row.branch_code,
    },

    {
      name: "Branch Name",
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
      name: "Address",
      selector: (row) => row.address,
    },

    {
      name: "Action",
      cell: (singleRowData, index) => (
        <div>
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
                  address: singleRowData.address,
                  headoffice_id: singleRowData.headoffice_id,
                  branch_code: singleRowData.branch_code,
                  opening_time: singleRowData.opening_time,
                  closing_time: singleRowData.closing_time,
                  lunch_time: singleRowData.lunch_time,
                },
                setValue
              );
            }}
          />
          {!singleRowData.deleted_at ? (
            <MdDelete
              title="Delete Data"
              className={styles.actionIcon}
              onClick={() => {
                setModalShow(true);
                setAction("delete");
                setSingleRowData(singleRowData);
              }}
            />
          ) : (
            <MdRestore
              title="Restore Data"
              className={styles.actionIcon}
              onClick={() => {
                setAction("restore");
                setModalShow(true);
                setSingleRowData(singleRowData);
              }} />
          )}
        </div>
      ),
      button: true,
    },
  ];

  useEffect(() => {
    setLoading(true);
    dispatch(headOfficeGetAll());
    dispatch(
      branchMasterGetAll(
        null,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, []);
  const deleteData = () => {
    reset();
    setLoading(true);
    setMode(PAGE_MODES.add);
    dispatch(
      branchMasterDelete({ id: singleRowData.id, action }, () =>
        dispatch(
          branchMasterGetAll(
            null,
            () => setLoading(false),
            () => setLoading(false)
          )
        )
      )
    );
    setModalShow(false);
  };
  function onFormSubmit(data) {
    setLoading(true);
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        branchMasterCreate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add);
            reset();
            dispatch(
              branchMasterGetAll(
                null,
                () => setLoading(false),
                () => setLoading(false)
              )
            );
          },
          () => {
            setIsSubmitting(false);
            setLoading(false);
            reset();
          }
        )
      );
    } else if (mode === PAGE_MODES.edit) {
      dispatch(
        branchMasterUpdate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add);
            reset();
            dispatch(
              branchMasterGetAll(
                null,
                () => setLoading(false),
                () => setLoading(false)
              )
            );
          },
          () => {
            setIsSubmitting(false);
            setLoading(false);
            reset();
          }
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
                  Branch Name <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  autoComplete="off"
                  placeholder="Branch Name"
                  {...register("name")}
                />
                <Form.Label className="errorMessage">
                  {" "}
                  {errors.name && errors.name.message}
                </Form.Label>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Email <span className="reqruiredFields">*</span>
                  <Help text={EmailText()} />
                </Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  {...register("email")}
                />
                <Form.Label className="errorMessage">
                  {" "}
                  {errors.email && errors.email.message}
                </Form.Label>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Phone</Form.Label>
                <Help text={PhoneText()} />
                <Form.Control
                  type="number"
                  autoComplete="off"
                  placeholder="Phone"
                  {...register("phone")}
                />
                <Form.Label className="errorMessage">
                  {" "}
                  {errors.phone && errors.phone.message}
                </Form.Label>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Address"
                  {...register("address", { required: true })}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Headoffice Name <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Select {...register("headoffice_id", { required: true })}>
                  <option value="" disabled>
                    --Select--
                  </option>
                  {headOfficeList.map((headoffice) => {
                    return (
                      <option key={uuidv4()} value={headoffice.id}>
                        {headoffice.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Branch Code <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Branch Code"
                  {...register("branch_code", { required: true })}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Opening Time <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="time"
                  min="09:00"
                  max="18:00"
                  placeholder="Opening Time"
                  {...register("opening_time", { required: true })}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Closing Time <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="time"
                  min="09:00"
                  max="18:00"
                  placeholder="Closing Time"
                  {...register("closing_time", { required: true })}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Lunch Time <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="time"
                  min="09:00"
                  max="18:00"
                  placeholder="Lunch Time"
                  {...register("lunch_time", { required: true })}
                />
                <Form.Label className="errorMessage"> </Form.Label>
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
                  className="formShowButton"
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
                {mode === PAGE_MODES.edit ? (
                  <Button className="formShowButton" onClick={cancelUser}>
                    Cancel
                  </Button>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
      <ConfirmPrompt
        mode={action}
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirmed={() => {
          deleteData();
        }}
      />
      {loading ? (
        <div className="dataTableRow">
          <Skeleton />
        </div>
      ) : (
        <div className="dataTableRow">
          <DataTable columns={columns} rows={branchMasterList} />
        </div>
      )}
    </>
  );
}
