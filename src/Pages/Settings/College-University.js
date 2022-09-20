
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
import { getPaginatedRecordNumber } from "../../utils/helpers";

const initialFormState = {
  collage_name: "",
  country_id: "",
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};

export default function HeadOffice() {

  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialFormState);
  const resetFields = () => setData(initialFormState);

  const { collegeList } = useSelector((state) => state.college);

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
      name: "Country Id",
      selector: (row) => row.country_id,
    },
    {
      cell: (singleRowData, index) => (
        <div>
          <BiPencil
            className={styles.actionIcon}
            onClick={() => {
              setMode(PAGE_MODES.edit);
              setData({
                id: singleRowData.id,
                collage_name: singleRowData.collage_name,
                country_id: singleRowData.country_id,
              });
            }}
          />
          <MdDelete
            className={styles.actionIcon}
            onClick={() => {
              dispatch(
                collegeDelete({ id: singleRowData.id }, () =>
                  dispatch(collegeGetAll())
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
      collegeGetAll(
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
        collegeCreate(
          data,
          () => {
            setIsSubmitting(false);
            resetFields();
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
            resetFields();
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
      <Form onSubmit={handleSubmit}>
        <Container fluid>
          <Row>
            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>College Name</Form.Label>
                <Form.Control
                  type="text"
                  name="collage_name"
                  placeholder="Head Office Name"
                  value={data.collage_name}
                  onChange={handleData}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label> Country Code</Form.Label>
                <Form.Control
                  type="number"
                  name="country_id"
                  placeholder="country id"
                  value={data.country_id}
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
