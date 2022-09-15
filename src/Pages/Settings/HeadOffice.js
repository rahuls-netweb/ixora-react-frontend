import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Components/Layout";
import DataTable from "../../Components/DataTable";
import { MdDelete } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import {
  Container,
  Row,
  Col,
  Tab,
  Tabs,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import styles from "./setting.module.css";
import { useNavigate } from "react-router-dom";
import {
  headOfficeCreate,
  headOfficeGetAll,
  headOfficeUpdate,
  headOfficeDelete,
} from "../../store/actions/headOfficeAction";
import { getPaginatedRecordNumber } from "../../utils/helpers";

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

export default function HeadOffice() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialFormState);
  const resetFields = () => setData(initialFormState);

  const { headOfficeList } = useSelector((state) => state.headOffice);

  const columns = [
    {
      name: "ID",
      selector: (row, index) => {
        return getPaginatedRecordNumber({ page: 1, per_page: 8, index });
      },
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
      cell: (singleRowData, index) => (
        <div>
          <BiPencil
            className={styles.actionIcon}
            onClick={() => {
              console.log(singleRowData, "singleRowData");
              console.log(index, "index");
              setMode(PAGE_MODES.edit);
              setData({
                id: singleRowData.id,
                name: singleRowData.name,
                email: singleRowData.email,
                phone: singleRowData.phone,
                address: singleRowData.address,
              });
            }}
          />
          <MdDelete
            className={styles.actionIcon}
            onClick={() => {
              console.log(singleRowData, "singleRowData");
              dispatch(
                headOfficeDelete({ id: singleRowData.id }, () =>
                  dispatch(headOfficeGetAll())
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
    dispatch(
      headOfficeGetAll(
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
        headOfficeCreate(
          data,
          () => {
            setIsSubmitting(false);
            resetFields();
            dispatch(headOfficeGetAll());
          },
          () => setIsSubmitting(false)
        )
      );
    } else if (mode === PAGE_MODES.edit) {
      dispatch(
        headOfficeUpdate(
          data,
          () => {
            setIsSubmitting(false);
            resetFields();
            dispatch(headOfficeGetAll());
          },
          () => setIsSubmitting(false)
        )
      );
    }
  }

  const [key, setKey] = useState("headoffice");

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className={styles.cardview}>
              <Tabs
                defaultActiveKey="headoffice"
                id="fill-tab-example"
                className={"tabs-Content " + styles.tabsContent}
                fill
                activeKey={key}
                onSelect={(key) => {
                  setKey(key);
                  navigate("/settings/" + key);
                }}
              >
                <Tab eventKey="headoffice" title="Head Office">
                  <div className={styles.tablecardViewMain}>
                    <Form onSubmit={handleSubmit}>
                      <Container fluid>
                        <Row>
                          <Col md={10} className={styles.customColumn}>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Head Office Name</Form.Label>
                              <Form.Control
                                type="text"
                                name="name"
                                placeholder="Head Office Name"
                                value={data.name}
                                onChange={handleData}
                              />
                            </Form.Group>

                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={handleData}
                              />
                            </Form.Group>
                            <Form.Group className={styles.divDivision}>
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
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
                          </Col>
                          <Col md={2} className="d-flex justify-content-end">
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
                  </div>
                  {loading ? (
                    <p>Loading.....</p>
                  ) : (
                    <div style={{ paddingLeft: 15 }}>
                      <DataTable columns={columns} rows={headOfficeList} />
                    </div>
                  )}
                </Tab>
                <Tab eventKey="country" title="Country">
                  <div className={styles.tablecardViewMain}>Harman</div>
                </Tab>
                <Tab eventKey="qualification" title="Qualification">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="candidate" title="Candidate">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="college-university" title="College/University">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="branch-master" title="Branch Master">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="employee-master" title="Employee master">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}