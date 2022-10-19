import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../Components/DataTable";
import { MdDelete, MdRestore } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import Skeleton from "../../Components/Skeleton";
import styles from "./rootsettings.module.css";
import Help, { PhoneText, EmailText } from "../../Components/Help";
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
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import ConfirmPrompt from "../../Components/PopUp/ConfirmPrompt";
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
const validationSchema = yup.object({
  name: yup
    .string()
    .required("Enter a valid Name")
    .matches(/^[a-z]/gi, {
      message: "Enter a valid Name",
    }),
  email: yup
    .string()
    .email("Enter a valid Email")
    .required("Enter a valid Email"),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, { message: "Enter a valid Phone Number" })
    .min(10, "Phone range 10-14 digits")
    .max(14, "Phone range 10-14 digits"),
});
export default function HeadOffice() {
  const dispatch = useDispatch();
  const resolver = useYupValidationResolver(validationSchema);
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [singleRowData, setSingleRowData] = useState();
  const [action, setAction] = useState("");
  const [order, setOrder] = useState(null);
  const [filterInputs, setFilterInputs] = useState({
    fname: "",
    femail: "",
    fnumber: "",
  });
  // const [filterData, setFilterData] = useState("withtrashed");
  const { headOfficeList } = useSelector((state) => state.headOffice);
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
      // selector: (_, index) => {
      //   return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
      // },
      selector: (row) => row.id,
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
      name: "Action",
      cell: (singleRowData, index) => (
        <div>
          <BiPencil
            title="Edit Data"
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
          {!singleRowData.deleted_at ? (
            <MdDelete
              title="Delete Data"
              className={styles.actionIcon}
              onClick={() => {
                setModalShow(true);
                setAction("delete");
                setSingleRowData(singleRowData);
              }}
            />
          ) : (
            <MdRestore
              title="Restore Data"
              className={styles.actionIcon}
              onClick={() => {
                setAction("restore");
                setModalShow(true);
                setSingleRowData(singleRowData);
              }}
            />
          )}
        </div>
      ),
      button: true,
    },
  ];
  useEffect(() => {
    setLoading(true);
    dispatch(
      headOfficeGetAll(
        { action: "withtrashed" },
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
      headOfficeDelete({ id: singleRowData.id, action }, () =>
        dispatch(
          headOfficeGetAll(
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
            setLoading(false);
            reset();
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
  function onFormFilterSubmit(e) {
    e.preventDefault();
    console.log(headOfficeList);
    console.log(filterInputs);

    headOfficeList.filter((record) => {
      if (filterInputs.fname) {
        if (
          record.name.toLowerCase().includes(filterInputs.fname.toLowerCase())
        ) {
          console.log(record, "data Found with name");
        }
      } else if (
        filterInputs.femail &&
        record.email &&
        record.email.toLowerCase().includes(filterInputs.femail.toLowerCase())
      ) {
        console.log(record, "data Found with email");
      } else if (
        record.phone &&
        filterInputs.fnumber &&
        record.phone === filterInputs.fnumber
      ) {
        console.log(record, "data Found with number");
      }
    });
    // setFilteredData(newList);
    // console.log(newList);
    // setDateTo("");
    // setDateFrom("");
  }
  const filter = (e) => {
    // setFilterData(e.target.value);
    dispatch(
      headOfficeGetAll(
        { action: e.target.value },
        null,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
    setOrder(null);
  };
  const listOrdering = (e) => {
    if (e.target.value === "Newest") {
      // let data = ;

      console.log("newest", order);
      setOrder([...headOfficeList].sort((a, b) => b.id - a.id));
    } else {
      setOrder([...headOfficeList].sort((a, b) => a.id - b.id));
      console.log("oldest", order);
      // setOrder(data);
    }
  };
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
                  autoComplete="off"
                  placeholder="Head Office Name"
                  {...register("name")}
                />
                <Form.Label className="errorMessage">
                  {" "}
                  {errors.name && errors.name.message}
                </Form.Label>
              </Form.Group>
              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Email <span className="reqruiredFields">*</span>
                </Form.Label>
                <Help text={EmailText()} />
                <Form.Control
                  type="email"
                  autoComplete="off"
                  placeholder="Email"
                  {...register("email")}
                />
                <Form.Label className="errorMessage">
                  {" "}
                  {errors.email && errors.email.message}
                </Form.Label>
              </Form.Group>
              <Form.Group className={styles.divDivision}>
                <Form.Label>
                  Phone Number <span className="reqruiredFields">*</span>
                </Form.Label>
                <Help text={PhoneText()} />
                <Form.Control
                  type="number"
                  className="typeNum"
                  autoComplete="off"
                  placeholder="Phone Number"
                  {...register("phone")}
                  minLength="10"
                />
                <Form.Label className="errorMessage">
                  {" "}
                  {errors.phone && errors.phone.message}
                </Form.Label>
              </Form.Group>
              <Form.Group className={styles.divDivision}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Address"
                  {...register("address")}
                />
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
      <Form onSubmit={onFormFilterSubmit}>
        <Container fluid>
          <Row>
            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>Head Office Name</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Head Office Name"
                  value={filterInputs.fname}
                  onChange={(e) => {
                    setFilterInputs({
                      ...filterInputs,
                      fname: e.target.value,
                      femail: "",
                      fnumber: "",
                    });
                  }}
                />
                <Form.Label></Form.Label>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Email"
                  value={filterInputs.femail}
                  onChange={(e) => {
                    setFilterInputs({
                      ...filterInputs,
                      femail: e.target.value,
                      fname: "",
                      fnumber: "",
                    });
                  }}
                />
                <Form.Label></Form.Label>
              </Form.Group>
              <Form.Group className={styles.divDivision}>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  placeholder="Phone Number"
                  value={filterInputs.fnumber}
                  onChange={(e) => {
                    setFilterInputs({
                      ...filterInputs,
                      fnumber: e.target.value,
                      femail: "",
                      fname: "",
                    });
                  }}
                />
                <Form.Label></Form.Label>
              </Form.Group>
              <Form.Group>
                <Form.Label></Form.Label>
                <Form.Select style={{ marginTop: "7px" }} onChange={filter}>
                  <option value="withtrashed">All</option>
                  <option value="null">Active</option>
                  <option value="trashed">Inactive</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label></Form.Label>
                <Form.Select
                  style={{ marginTop: "7px" }}
                  onChange={listOrdering}
                >
                  <option value="Oldest">Oldest</option>
                  <option value="Newest">Newest</option>
                  {/* <option value="">Inactive</option> */}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col
              md={2}
              className="d-flex justify-content-end"
              style={{ paddingRight: 0 }}
            >
              <Form.Group className={styles.formCareerEnquirieSub2}>
                <Button type="submit" className="formShowButton">
                  Filter
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
      <ConfirmPrompt
        mode={action}
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
          <DataTable columns={columns} rows={order ? order : headOfficeList} />
        </div>
      )}
    </>
  );
}
