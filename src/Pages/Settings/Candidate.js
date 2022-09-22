import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../Components/DataTable";
import { MdDelete } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import styles from './rootsettings.module.css';
import {
  categoryCreate,
  categoryGetAll,
  categoryUpdate,
  categoryDelete,
} from "../../store/actions/categoryAction";
import { getPaginatedRecordNumber, resetReactHookFormValues } from "../../utils/helpers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
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
  category_name: yup.string().required("Required"),
});

export default function Candidate() {
  const resolver = useYupValidationResolver(validationSchema);
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { categoryList } = useSelector((state) => state.category);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
    resolver, mode: "onChange", defaultValues: initialFormState
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
              resetReactHookFormValues({ "category_name": singleRowData.category_name, id: singleRowData.id }, setValue);
            }}
          />
          <MdDelete
            className={styles.actionIcon}
            onClick={() => {
              reset();
              setMode(PAGE_MODES.add);
              dispatch(
                categoryDelete({ id: singleRowData.id }, () =>
                  dispatch(categoryGetAll())
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
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        categoryCreate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add)
            reset();
            dispatch(categoryGetAll());
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
            setMode(PAGE_MODES.add)
            dispatch(categoryGetAll());
          },
          () => setIsSubmitting(false)
        )
      );
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onFormSubmit)} >
        <Container fluid>
          <Row>
            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>Category Name  <span className="reqruiredFields">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category Name"
                  {...register("category_name")}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex justify-content-end">
              <Form.Group
                className={styles.formCareerEnquirieSub2}
              >
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
      {
        loading ? (
          <div className="text-center">
            <Spinner animation="border"
              className={styles.signInLoader}
            />
          </div>
        ) : (
          <div style={{ paddingLeft: 15 }}>
            <DataTable columns={columns} rows={categoryList} />
          </div>
        )
      }
    </>
  )
}

