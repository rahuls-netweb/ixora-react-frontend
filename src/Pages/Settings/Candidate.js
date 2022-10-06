import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../Components/DataTable";
import { MdDelete } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import styles from "./rootsettings.module.css";
import {
  categoryCreate,
  categoryGetAll,
  categoryUpdate,
  categoryDelete,
} from "../../store/actions/categoryAction";
import {
  getPaginatedRecordNumber,
  resetReactHookFormValues,
} from "../../utils/helpers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { NamePattern } from "../../Components/validation";
import Skeleton from "../../Components/Skeleton";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
const initialFormState = {
  category_name: "",
  status: "1",
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};

const validationSchema = yup.object({

  category_name: yup.string().required("Enter a valid Name").matches(/^[a-z]/gi, {
    message: 'Enter a valid Name'
  }),
});

export default function Candidate() {
  const resolver = useYupValidationResolver(validationSchema);
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { categoryList } = useSelector((state) => state.category);

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
      name: "Category Name",
      selector: (row) => row.category_name,
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
                  category_name: singleRowData.category_name,
                  id: singleRowData.id,
                },
                setValue
              );
            }}
          />
          <MdDelete
            className={styles.actionIcon}
            onClick={() => {
              console.log('Delete selectedTab', singleRowData.id);
              reset();
              setLoading(true);
              setMode(PAGE_MODES.add);
              dispatch(
                categoryDelete({ id: singleRowData.id }, () =>
                  dispatch(
                    categoryGetAll(
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
      categoryGetAll(
        null,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, []);

  async function onFormSubmit(data) {
    setLoading(true);
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        categoryCreate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add);
            reset();
            dispatch(
              categoryGetAll(
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
        categoryUpdate(
          data,
          () => {
            setIsSubmitting(false);
            reset();
            setMode(PAGE_MODES.add);
            dispatch(
              categoryGetAll(
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
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Container fluid>
          <Row>
            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Category Name <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category Name"
                  {...register("category_name")}
                />
                <Form.Label className="errorMessage">  {errors.category_name && errors.category_name.message}</Form.Label>
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
          <DataTable columns={columns} rows={categoryList} />
        </div>
      )}
    </>
  );
}
