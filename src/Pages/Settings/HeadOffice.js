import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../Components/DataTable";
import { MdDelete } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import styles from "./rootsettings.module.css";
import {
  headOfficeCreate,
  headOfficeGetAll,
  headOfficeUpdate,
  headOfficeDelete,
} from "../../store/actions/headOfficeAction";

import {
  getPaginatedRecordNumber,
  resetReactHookFormValues,
} from "../../utils/helpers";
// import * as yup from "yup";
import { useForm } from "react-hook-form";
// import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import {
  EmailPattern,
  NamePattern,
  PhonePattern,
} from "../../Components/validation";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  status: "1",
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};
// const validationSchema = yup.object({
//   name: yup.string().required("Required"),
// });
export default function HeadOffice() {
  const dispatch = useDispatch();
  // const resolver = useYupValidationResolver(validationSchema);
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { headOfficeList } = useSelector((state) => state.headOffice);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
    // resolver,
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
      name: "Address",
      selector: (row) => row.address,
    },
    {
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
                },
                setValue
              );
            }}
          />
          <MdDelete
            className={styles.actionIcon}
            onClick={() => {
              reset();
              setLoading(true);
              setMode(PAGE_MODES.add);
              dispatch(
                headOfficeDelete({ id: singleRowData.id }, () =>
                  dispatch(
                    headOfficeGetAll(
                      null,
                      () => setLoading(false),
                      () => setLoading(false)
                    )
                  )
                )
              );
            }}
          />
        </div>
      ),
      button: true,
    },
  ];

  useEffect(() => {
    setLoading(true);
    dispatch(
      headOfficeGetAll(
        null,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, []);

  function onFormSubmit(data) {
    setLoading(true);
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        headOfficeCreate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add);
            reset();
            dispatch(
              headOfficeGetAll(
                null,
                () => setLoading(false),
                () => setLoading(false)
              )
            );
          },
          () => {
            setIsSubmitting(false);
          }
        )
      );
    } else if (mode === PAGE_MODES.edit) {
      dispatch(
        headOfficeUpdate(
          data,
          () => {
            setIsSubmitting(false);
            reset();
            setMode(PAGE_MODES.add);
            dispatch(
              headOfficeGetAll(
                null,
                () => setLoading(false),
                () => setLoading(false)
              )
            );
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
            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Head Office Name <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Head Office Name"
                  {...register("name", {
                    pattern: NamePattern(),
                    required: true,
                  })}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    pattern: EmailPattern(),
                    required: true,
                  })}
                />
              </Form.Group>
              <Form.Group className={styles.divDivision}>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: true,
                    maxLength: 15,
                    minLength: 10,
                  })}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  {...register("address", { required: true })}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex justify-content-end">
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
        <div className="text-center">
          <Spinner animation="border" className={styles.signInLoader} />
        </div>
      ) : (
        <div style={{ paddingLeft: 15 }}>
          <DataTable columns={columns} rows={headOfficeList} />
        </div>
      )}
    </>
  );
}
