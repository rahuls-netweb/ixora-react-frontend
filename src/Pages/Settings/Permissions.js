import React, { useState, useEffect, useRef } from "react";
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
  Overlay,
} from "react-bootstrap";
import styles from "./rootsettings.module.css";
import {
  permissionsCreate,
  permissionsGetAll,
  permissionsUpdate,
  permissionsDelete,
} from "../../store/actions/permissionsAction";
import {
  getPaginatedRecordNumber,
  resetReactHookFormValues,
} from "../../utils/helpers";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { NamePattern } from "../../Components/validation";
import Help from "../../Components/Help";
import Skeleton from "../../Components/Skeleton";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import ConfirmPrompt from "../../Components/PopUp/ConfirmPrompt";

const initialFormState = {
  name: "",
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
});

export default function Permissions() {
  const resolver = useYupValidationResolver(validationSchema);
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [singleRowData, setSingleRowData] = useState();
  const [show, setShow] = useState(false);
  const target = useRef(null);

  function cancelUser() {
    reset();
    setMode(PAGE_MODES.add);
  }

  const { permissionsList } = useSelector((state) => state.permissions);

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
      name: "Permission Name",
      selector: (row) => row.name,
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
                },
                setValue
              );
            }}
          />

          <MdDelete
            title="Delete Data"
            className={styles.actionIcon}
            onClick={() => {
              setModalShow(true);
              setSingleRowData(singleRowData);
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
      permissionsGetAll(
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
      permissionsDelete({ id: singleRowData.id }, () =>
        dispatch(
          permissionsGetAll(
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
    setLoading(false);
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        permissionsCreate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add);
            reset();
            dispatch(
              permissionsGetAll(
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
        permissionsUpdate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add);
            reset();
            dispatch(
              permissionsGetAll(
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
            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Permission Name <span className="reqruiredFields">*</span>
                  <Help text="Ex:- Module_PermissionType" />
                </Form.Label>

                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Permission Name"
                  {...register("name")}
                />
                <Form.Label className="errorMessage">
                  {" "}
                  {errors.name && errors.name.message}
                </Form.Label>
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
          <DataTable columns={columns} rows={permissionsList} />
        </div>
      )}
    </>
  );
}
