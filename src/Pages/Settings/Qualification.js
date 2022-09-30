import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../Components/DataTable";
import { MdDelete } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import styles from "./rootsettings.module.css";
import {
  qualificationCreate,
  qualificationGetAll,
  qualificationUpdate,
  qualificationDelete,
} from "../../store/actions/qualificationAction";
import {
  getPaginatedRecordNumber,
  resetReactHookFormValues,
} from "../../utils/helpers";

// import * as yup from "yup";
import { useForm } from "react-hook-form";
import { NamePattern } from "../../Components/validation";
import Skeleton from "../../Components/Skeleton";
// import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

const initialFormState = {
  name: "",
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};

// const validationSchema = yup.object({
//   name: yup.string().required("Required"),
// });

export default function Qualification() {
  // const resolver = useYupValidationResolver(validationSchema);

  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const { qualificationList } = useSelector((state) => state.qualification);

  const columns = [
    {
      name: "ID",
      selector: (_, index) => {
        return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
      },
    },
    {
      name: "Qualification",
      selector: (row) => row.name,
    },
    {
      cell: (singleRowData, index) => (
        <div>
          <BiPencil
            className={styles.actionIcon}
            onClick={() => {
              setMode(PAGE_MODES.edit);
              resetReactHookFormValues(
                { name: singleRowData.name, id: singleRowData.id },
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
                qualificationDelete({ id: singleRowData.id }, () =>
                  dispatch(
                    qualificationGetAll(
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
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
    setLoading(true);
    dispatch(
      qualificationGetAll(
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
        qualificationCreate(
          data,
          () => {
            setIsSubmitting(false);
            reset();
            dispatch(
              qualificationGetAll(
                null,
                () => setLoading(false),
                () => setLoading(false)
              )
            );
          },
          () => setIsSubmitting(false)
        )
      );
    } else if (mode === PAGE_MODES.edit) {
      dispatch(
        qualificationUpdate(
          data,
          () => {
            setIsSubmitting(false);
            reset();
            dispatch(
              qualificationGetAll(
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
                  Qualification <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Qualification"
                  {...register("name", {
                    required: true,
                    pattern: NamePattern(),
                  })}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex justify-content-end">
              <Form.Group className={styles.formCareerEnquirieSub2}>
                <Button
                  type="submit"
                  disabled={!isDirty || !isValid}
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
      {loading ? (
        <div className="text-center">
          <Skeleton />
        </div>
      ) : (
        <div className="dataTableRow">
          <DataTable columns={columns} rows={qualificationList} />
        </div>
      )}
    </>
  );
}
