import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../Components/DataTable";
import { MdDelete } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import styles from "./rootsettings.module.css";
import {
  collegeCreate,
  collegeGetAll,
  collegeUpdate,
  collegeDelete,
} from "../../store/actions/collegeAction";

import {
  getPaginatedRecordNumber,
  resetReactHookFormValues,
} from "../../utils/helpers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Skeleton from "../../Components/Skeleton";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

const initialFormState = {
  collage_name: "",
  country_id: "",
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};

const validationSchema = yup.object({
  collage_name: yup.string().required("Enter a valid Name").matches(/^[a-z]/gi, {
    message: 'Enter a valid Name'
  }),

});

export default function HeadOffice() {
  const resolver = useYupValidationResolver(validationSchema);
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { collegeList } = useSelector((state) => state.college);
  const { countryList } = useSelector((state) => state.country);

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

  const columns = [
    {
      name: "ID",
      selector: (_, index) => {
        return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
      },
    },
    {
      name: "College Name",
      selector: (row) => row.collage_name,
    },
    {
      name: "Country Name",
      selector: (row) => row.country_name,
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
                  collage_name: singleRowData.collage_name,
                  country_id: singleRowData.country_id,
                  id: singleRowData.id,
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
                collegeDelete({ id: singleRowData.id }, () =>
                  dispatch(
                    collegeGetAll(
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
      collegeGetAll(
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
        collegeCreate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add);
            reset();
            dispatch(
              collegeGetAll(
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
        collegeUpdate(
          data,
          () => {
            setIsSubmitting(false);
            reset();
            setMode(PAGE_MODES.add);
            dispatch(
              collegeGetAll(
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
                  College Name <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="College Name"
                  {...register("collage_name")}
                />
                <Form.Label className="errorMessage">  {errors.collage_name && errors.collage_name.message}</Form.Label>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  {" "}
                  Country Name <span className="reqruiredFields">*</span>
                </Form.Label>

                <Form.Select {...register("country_id", { required: true })}>
                  <option value="" disabled>
                    --Select--
                  </option>
                  {countryList.map((country) => {
                    return <option value={country.id}>{country.name}</option>;
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex justify-content-end" style={{ paddingRight: 0 }}>
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
                {mode === PAGE_MODES.edit ?
                  <Button
                    className="formShowButton"
                    onClick={cancelUser}
                  >
                    Cancel
                  </Button> : null}
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
          <DataTable columns={columns} rows={collegeList} />
        </div>
      )}
    </>
  );
}
