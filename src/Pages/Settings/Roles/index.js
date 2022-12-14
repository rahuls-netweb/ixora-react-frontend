import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PopUP from "../../../Components/PopUp";
import AddPermissionToRoleModel from "./AddPermissionToRoleModel";
import ViewPermissionToRoleModel from "./ViewPermissionToRoleModel";
import DataTable from "../../../Components/DataTable";

import { MdDelete } from "react-icons/md";
import { BiPencil, BiPlus } from "react-icons/bi";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import styles from "../rootsettings.module.css";
import {
  rolesCreate,
  rolesGetAll,
  rolesUpdate,
  rolesDelete,
} from "../../../store/actions/rolesAction";
import { permissionsGetAll } from "../../../store/actions/permissionsAction";
import {
  getPaginatedRecordNumber,
  resetReactHookFormValues,
} from "../../../utils/helpers";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { NamePattern } from "../../../Components/validation";
import Skeleton from "../../../Components/Skeleton";
import { useYupValidationResolver } from "../../../hooks/useYupValidationResolver";
import ConfirmPrompt from "../../../Components/PopUp/ConfirmPrompt";

const initialFormState = {
  name: "",
  guard_name: null,
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

export default function Roles() {
  const resolver = useYupValidationResolver(validationSchema);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseOnClick = (newShow) => setShow(newShow);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
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

  const { rolesList } = useSelector((state) => ({
    // permissionsList: state.permissions.permissionsList,
    rolesList: state.roles.rolesList,
  }));

  const [selectedRole, setSelectedRole] = useState(null);
  const handleShow = (role) => {
    setSelectedRole(role);
    setShow(true);
  };
  const handleShow1 = (role) => {
    setSelectedRole(role);
    setShow1(true);
  };

  const columns = [
    {
      name: "ID",
      selector: (_, index) => {
        return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
      },
    },
    {
      name: "Roles Name",
      selector: (row) => row.name,
    },
    {
      name: "Guard Name",
      selector: (row) => row.guard_name,
    },
    {
      name: "Permissions",
      selector: (row) => (
        <div onClick={() => handleShow1(row)}>
          <span className="formShowViewButton">View All </span>
        </div>
      ),
    },
    {
      name: "Action",
      cell: (singleRowData, index) => (
        <div>
          <BiPlus
            title={`Add permission to ${singleRowData.name}`}
            className={styles.actionIcon}
            onClick={() => handleShow(singleRowData)}
          />
          <BiPencil
            title="Edit Role"
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
    dispatch(permissionsGetAll());
    dispatch(
      rolesGetAll(
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
      rolesDelete({ id: singleRowData.id }, () =>
        dispatch(
          rolesGetAll(
            null,
            () => setLoading(false),
            () => setLoading(false)
          )
        )
      )
    );
    setModalShow(false);
  };
  async function onFormSubmit(data) {
    setLoading(true);
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        rolesCreate(
          data,
          () => {
            setIsSubmitting(false);
            reset();
            setMode(PAGE_MODES.add);
            dispatch(
              rolesGetAll(
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
        rolesUpdate(
          data,
          () => {
            setIsSubmitting(false);
            reset();
            setMode(PAGE_MODES.add);
            dispatch(
              rolesGetAll(
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
    reset();
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
                  Role Name <span className="reqruiredFields">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Role Name"
                  {...register("name")}
                />
                <Form.Label className="errorMessage">
                  {" "}
                  {errors.name && errors.name.message}
                </Form.Label>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Guard Name</Form.Label>
                <Form.Control type="text" placeholder="Web" disabled={true} />
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
          <DataTable columns={columns} rows={rolesList} />
        </div>
      )}

      {show && (
        <PopUP show={show} hide={handleClose} size="xl">
          <AddPermissionToRoleModel showPopup={handleCloseOnClick} role={selectedRole} />
        </PopUP>
      )}
      {show1 && (
        <PopUP show={show1} hide={handleClose1} size="lg">
          <ViewPermissionToRoleModel role={selectedRole} />
        </PopUP>
      )}
    </>
  );
}
