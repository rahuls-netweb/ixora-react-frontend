
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
import { getPaginatedRecordNumber } from "../../utils/helpers";

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


export default function Country() {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialFormState);
  const resetFields = () => setData(initialFormState);

  const { countryList } = useSelector((state) => state.country);

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
              setData({
                id: singleRowData.id,
                name: singleRowData.name,
                code: singleRowData.code,
                flag_image: singleRowData.flag_image,
              });
            }}
          />
          <MdDelete
            className={styles.actionIcon}
            onClick={() => {
              dispatch(
                countryDelete({ id: singleRowData.id }, () =>
                  dispatch(countryGetAll())
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
      countryGetAll(
        null,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  }, []);

  function handleData(e, type = null) {
    if (type === null) {
      const name = e.target.name;
      const value = e.target.value;
      setData({ ...data, [name]: value });
    } else if (type === 'image') {
      const [file] = e.target.files;
      setData(prev => {
        return {
          ...prev,
          flag_image: file
        }
      })
    }

  }


  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        countryCreate(
          data,
          () => {
            setIsSubmitting(false);
            resetFields();
            dispatch(countryGetAll());
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
            resetFields();
            dispatch(countryGetAll());
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
                <Form.Label>Country Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Country Name"
                  value={data.name}
                  onChange={handleData}
                />
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Country Code</Form.Label>
                <Form.Control
                  type="number"
                  name="code"
                  placeholder="Country Code"
                  value={data.code}
                  onChange={handleData}
                />
              </Form.Group>
              {/* <Form.Group className={styles.divDivision}>
                <Form.Label>Country Flag</Form.Label>
                <Form.Control
                  type="file"
                  name="flag"
                  accept="image/*"
                  placeholder="Country Flag"
                  onChange={(e) => handleData(e, "image")}
                />
              </Form.Group> */}

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
            <DataTable columns={columns} rows={countryList} />
          </div>
        )
      }
    </>
  );
}
