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
  collegeCreate,
  collegeGetAll,
  collegeUpdate,
  collegeDelete,
} from "../../store/actions/collegeAction";

import { getPaginatedRecordNumber, resetReactHookFormValues } from "../../utils/helpers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
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
  collage_name: yup.string().required("Required"),
  country_id: yup.string().required("Required"),
});

export default function HeadOffice() {

  const resolver = useYupValidationResolver(validationSchema);
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { collegeList } = useSelector((state) => state.college);
  const { countryList } = useSelector((state) => state.country);

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
              resetReactHookFormValues({
                "collage_name": singleRowData.collage_name,
                "country_id": singleRowData.country_id,
                id: singleRowData.id
              }, setValue);
            }}
          />
          <MdDelete
            className={styles.actionIcon}
            onClick={() => {
              reset();
              setMode(PAGE_MODES.add);
              dispatch(
                collegeDelete({ id: singleRowData.id }, () =>
                  dispatch(collegeGetAll())
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

    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        collegeCreate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add)
            reset();
            dispatch(collegeGetAll());
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
            setMode(PAGE_MODES.add)
            dispatch(collegeGetAll());
          },
          () => setIsSubmitting(false)
        )
      );
    }
    setMode(PAGE_MODES.add)
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Container fluid>
          <Row>
            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>College Name  <span className="reqruiredFields">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="College Name"
                  {...register("collage_name")}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label> Country Name  <span className="reqruiredFields">*</span></Form.Label>

                <Form.Select  {...register("country_id")}>
                  <option value="" disabled>--Select--</option>
                  {countryList.map(country => {
                    return <option value={country.id}>{country.name}</option>
                  })}
                </Form.Select>
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
            <DataTable columns={columns} rows={collegeList} />
          </div>
        )
      }
    </>
  )
}