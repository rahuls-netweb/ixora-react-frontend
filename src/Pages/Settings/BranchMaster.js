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
  branchMasterCreate,
  branchMasterGetAll,
  branchMasterUpdate,
  branchMasterDelete,
} from "../../store/actions/branchMasterAction";
import { headOfficeGetAll } from "../../store/actions/headOfficeAction";
import { getPaginatedRecordNumber } from "../../utils/helpers";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  headoffice_id: "",
  branch_code: "",
  opening_time: "",
  closing_time: "",
  lunch_time: "",
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};

export default function BranchMaster() {

  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialFormState);

  const resetFields = () => setData(initialFormState);

  const { branchMasterList, headOfficeList } = useSelector((state) => ({
    branchMasterList: state.branchMaster.branchMasterList,
    headOfficeList: state.headOffice.headOfficeList,
  }));

  const columns = [
    {
      name: "ID",
      selector: (_, index) => {
        return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
      },
    },

    {
      name: "Branch Name",
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
    // {
    //   name: "Headoffice Id",
    //   selector: (row) => row.headoffice_id,
    // },
    {
      name: "Branch code",
      selector: (row) => row.branch_code,
    },
    // {
    //   name: "Opening Time",
    //   selector: (row) => row.opening_time,
    // },
    // {
    //   name: "Closing Time",
    //   selector: (row) => row.closing_time,
    // },
    // {
    //   name: "Lunch Time",
    //   selector: (row) => row.lunch_time,
    // },
    {
      cell: (singleRowData, index) => (
        <div>
          <BiPencil
            className={styles.actionIcon}
            onClick={() => {
              setMode(PAGE_MODES.edit);
              setData({
                id: singleRowData.id,
                name: singleRowData.name,
                email: singleRowData.email,
                phone: singleRowData.phone,
                address: singleRowData.address,
                headoffice_id: singleRowData.headoffice_id,
                branch_code: singleRowData.branch_code,
                opening_time: singleRowData.opening_time,
                closing_time: singleRowData.closing_time,
                lunch_time: singleRowData.lunch_time,
              });
            }}
          />
          <MdDelete
            className={styles.actionIcon}
            onClick={() => {
              dispatch(
                branchMasterDelete({ id: singleRowData.id }, () =>
                  dispatch(branchMasterGetAll())
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
    dispatch(headOfficeGetAll());
    dispatch(
      branchMasterGetAll(
        null,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, []);

  function handleData(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        branchMasterCreate(
          data,
          () => {
            setIsSubmitting(false);
            resetFields();
            dispatch(branchMasterGetAll());
          },
          () => setIsSubmitting(false)
        )
      );
    } else if (mode === PAGE_MODES.edit) {
      dispatch(
        branchMasterUpdate(
          data,
          () => {
            setIsSubmitting(false);
            resetFields();
            dispatch(branchMasterGetAll());
          },
          () => setIsSubmitting(false)
        )
      );
    }
    setMode(PAGE_MODES.add)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container fluid>
          <Row>
            <Col md={12} className={styles.customColumn}>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Branch Name  <span className="reqruiredFields">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Branch Name"
                  value={data.name}
                  onChange={handleData}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Email  <span className="reqruiredFields">*</span></Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={handleData}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={data.phone}
                  onChange={handleData}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={data.address}
                  onChange={handleData}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Headoffice Name  <span className="reqruiredFields">*</span></Form.Label>
                <Form.Select name="headoffice_id" value={data.headoffice_id} onChange={handleData}>
                  <option value="" disabled>--Select--</option>
                  {headOfficeList.map(headoffice => {
                    return <option value={headoffice.id}>{headoffice.name}</option>
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>Branch Code  <span className="reqruiredFields">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="branch_code"
                  placeholder="Branch Code"
                  value={data.branch_code}
                  onChange={handleData}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Opening Time  <span className="reqruiredFields">*</span></Form.Label>
                <Form.Control
                  type="time"
                  name="opening_time"
                  placeholder="Opening Time"
                  value={data.opening_time}
                  onChange={handleData}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Closing Time  <span className="reqruiredFields">*</span></Form.Label>
                <Form.Control
                  type="time"
                  name="closing_time"
                  placeholder="Closing Time"
                  value={data.closing_time}
                  onChange={handleData}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Lunch Time  <span className="reqruiredFields">*</span></Form.Label>
                <Form.Control
                  type="time"
                  name="lunch_time"
                  placeholder="Lunch Time"
                  value={data.lunch_time}
                  onChange={handleData}
                />
              </Form.Group>
            </Col>

            <Col md={2} className="d-flex justify-content-end" style={{ paddingRight: 0 }}>
              <Form.Group
                className={styles.formCareerEnquirieSub2}
              >
                <Button
                  type="submit"
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
      {
        loading ? (
          <div className="text-center">
            <Spinner animation="border"
              className={styles.signInLoader}
            />
          </div>

        ) : (
          <div style={{ paddingLeft: 15 }}>
            <DataTable columns={columns} rows={branchMasterList} />
          </div>

        )
      }
    </>
  )
}
