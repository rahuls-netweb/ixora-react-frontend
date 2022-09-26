
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
  countryCreate,
  countryGetAll,
  countryUpdate,
  countryDelete,
} from "../../store/actions/countryAction";

import { getPaginatedRecordNumber, resetReactHookFormValues } from "../../utils/helpers";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const initialFormState = {
  name: "",
  code: "",
  flag_image: null,
  status: "1",
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  // code: yup.number().required("Required"),
});

export default function Country() {
  const [code, setCode] = useState('91');
  const resolver = useYupValidationResolver(validationSchema);
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);


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
      name: "Country Name",
      selector: (row) => row.name,
    },
    {
      name: "Country Code",
      selector: (row) => row.code,
    },
    // {
    //   name: "Country Flag",
    //   selector: (row) => row.flag_image,
    // },
    {
      cell: (singleRowData, index) => (
        <div>
          <BiPencil
            className={styles.actionIcon}
            onClick={() => {
              setMode(PAGE_MODES.edit);
              resetReactHookFormValues({
                id: singleRowData.id,
                name: singleRowData.name,
                code: singleRowData.code,
              }, setValue);
            }}
          />
          <MdDelete
            className={styles.actionIcon}
            onClick={() => {
              reset();
              setLoading(true)
              setMode(PAGE_MODES.add);
              dispatch(
                countryDelete({ id: singleRowData.id }, () =>
                  dispatch(countryGetAll(
                    null,
                    () => setLoading(false),
                    () => setLoading(false)
                  ))
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
      countryGetAll(
        null,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, []);



  function onFormSubmit(data) {

    setLoading(true)
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        countryCreate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add)
            reset();
            dispatch(countryGetAll(
              null,
              () => setLoading(false),
              () => setLoading(false)
            ));
          },
          () => setIsSubmitting(false)
        )
      );
    } else if (mode === PAGE_MODES.edit) {
      dispatch(
        countryUpdate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add)
            reset();
            dispatch(countryGetAll(
              null,
              () => setLoading(false),
              () => setLoading(false)
            ));
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
                <Form.Label>Country Name  <span className="reqruiredFields">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Country Name"
                  {...register('name')}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Country Code  <span className="reqruiredFields">*</span></Form.Label>

                <PhoneInput
                  country={'in'}
                  placeholder="Enter phone number"
                  onChange={value => setValue("code", value)}
                  inputProps={{
                    disabled: true,
                  }}
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
            <DataTable columns={columns} rows={countryList} />
          </div>
        )
      }
    </>
  );
}
