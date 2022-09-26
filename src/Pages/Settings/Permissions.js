import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../Components/DataTable";
import { MdDelete, MdInfo } from "react-icons/md";
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
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

const initialFormState = {
  name: "",
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};

const validationSchema = yup.object({
  name: yup.string().required("Required"),
});

export default function Permissions() {
  const resolver = useYupValidationResolver(validationSchema);
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const target = useRef(null);

  const { permissionsList } = useSelector((state) => state.permissions);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isDirty, isValid },
    reset,
  } = useForm({
    resolver,
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
      name: "Permission Name",
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
                {
                  id: singleRowData.id,
                  name: singleRowData.name,
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
          () => setIsSubmitting(false)
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
                  Permission Name <span className="reqruiredFields">*</span>{" "}
                </Form.Label>
                <div style={{ display: "flex" }}>
                  <Form.Control
                    type="text"
                    placeholder="Permission Name"
                    {...register("name")}
                  />
                  {/* toolTip Start */}
                  <Button
                    variant="primary"
                    ref={target}
                    onClick={() => setShow(!show)}
                  >
                    <MdInfo />
                  </Button>
                  <Overlay
                    target={target.current}
                    show={show}
                    placement="right"
                  >
                    {({
                      placement,
                      arrowProps,
                      show: _show,
                      popper,
                      ...props
                    }) => (
                      <div
                        {...props}
                        style={{
                          position: "absolute",
                          backgroundColor: "rgba(255, 100, 100, 0.85)",
                          margin: "0px 5px",
                          padding: "2px 20px",
                          color: "white",
                          borderRadius: 3,
                          ...props.style,
                        }}
                      >
                        Name_Permission
                      </div>
                    )}
                  </Overlay>
                  {/* ToolTip Ends */}
                </div>
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
          <DataTable columns={columns} rows={permissionsList} />
        </div>
      )}
    </>
  );
}
