import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../Components/DataTable";
import { MdDelete, MdRestore } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import styles from "../rootsettings.module.css";
import stylesIndex from "./index.module.css";
import {
  countryCreate,
  countryGetAll,
  countryUpdate,
  countryDelete,
} from "../../../store/actions/countryAction";

import { getPaginatedRecordNumber } from "../../../utils/helpers";

import { useForm } from "react-hook-form";

import Flags from "country-flag-icons/react/3x2";
import ReactSelect, { components } from "react-select";

import countries from "./countries.json";
import Skeleton from "../../../Components/Skeleton";
import ConfirmPrompt from "../../../Components/PopUp/ConfirmPrompt";

const initialFormState = {
  name: "",
  code: "91",
  flag_image: null,
  status: "1",
};

const PAGE_MODES = {
  edit: "edit",
  add: "add",
};

const options = countries.map((el) => {
  return {
    value: el.code,
    label: el.name,
    icon: Flags[el.code.toUpperCase()],
    countryCode: el.dial_code,
  };
});

const { Option } = components;

export default function Country() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState("");
  const country = "US";

  function cancelUser() {
    setSelectedCountry("");
    setMode(PAGE_MODES.add);
  }

  const IconOption = (props) => {
    const {
      data: { label, icon: Icon, countryCode },
    } = props;
    return (
      <Option {...props}>
        <Icon className={stylesIndex.inputFieldIcon} />
        {label} {countryCode}
      </Option>
    );
  };

  const ValueContainer = ({ children, ...props }) => {
    const selectedOptionFlag = props.options.find((element) => {
      return element.value === selectedCountry?.value;
    });

    return (
      components.ValueContainer && (
        <components.ValueContainer {...props}>
          {!!children && selectedOptionFlag && (
            <>
              <span className={stylesIndex.inputFieldIcon}>
                <selectedOptionFlag.icon className="small" />
              </span>
              <span className={stylesIndex.countryCode}>
                {selectedOptionFlag.countryCode}
              </span>
            </>
          )}
          {children}
        </components.ValueContainer>
      )
    );
  };

  const dispatch = useDispatch();
  const [mode, setMode] = useState(PAGE_MODES.add);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reqruiredFields, setreqruiredFields] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [singleRowData, setSingleRowData] = useState();
  const [action, setAction] = useState("");

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

    {
      name: "Action",
      cell: (singleRowData, index) => (
        <div>
          <BiPencil
            className={styles.actionIcon}
            onClick={() => {
              setMode(PAGE_MODES.edit);
              setSelectedCountry({
                id: singleRowData.id,
                label: singleRowData.name,
                value: singleRowData.code,
              });
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
              }} />
          )}
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

  const deleteData = () => {
    setLoading(true);
    setMode(PAGE_MODES.add);
    dispatch(
      countryDelete({ id: singleRowData.id, action }, () =>
        dispatch(
          countryGetAll(
            null,
            () => setLoading(false),
            () => setLoading(false)
          )
        )
      )
    );
    setModalShow(false);
  };

  function onFormSubmit(e) {
    e.preventDefault();

    const data = {
      id: selectedCountry.id,
      name: selectedCountry.label,
      code: selectedCountry.value,
    };

    setLoading(true);
    setIsSubmitting(true);
    if (mode === PAGE_MODES.add) {
      dispatch(
        countryCreate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add);
            setSelectedCountry("");
            dispatch(
              countryGetAll(
                null,
                () => setLoading(false),
                () => setLoading(false)
              )
            );
          },
          () => {
            setIsSubmitting(false);
            setLoading(false);
            setSelectedCountry("");
          }
        )
      );
    } else if (mode === PAGE_MODES.edit) {
      dispatch(
        countryUpdate(
          data,
          () => {
            setIsSubmitting(false);
            setMode(PAGE_MODES.add);
            setSelectedCountry("");
            dispatch(
              countryGetAll(
                null,
                () => setLoading(false),
                () => setLoading(false)
              )
            );
          },
          () => {
            setIsSubmitting(false);
            setLoading(false);
            setSelectedCountry("");
          }
        )
      );
    }
    setMode(PAGE_MODES.add);
  }

  return (
    <>
      <Form onSubmit={onFormSubmit}>
        <Container fluid>
          <Row>
            <Col md={10} className={styles.customColumn}>
              <Form.Group className={styles.divDivision3}>
                <Form.Label>
                  Country Name <span className="reqruiredFields">*</span>
                </Form.Label>
                <ReactSelect
                  className="countryInputFieldOptions"
                  defaultValue={options[0]}
                  value={selectedCountry}
                  options={options}
                  components={{
                    Option: IconOption,
                    ValueContainer: ValueContainer,
                  }}
                  onBlur={() => {
                    setError("Enter country name");
                  }}
                  onChange={(values) => {
                    setError("");
                    setSelectedCountry((prev) => {
                      if (typeof prev === "string") {
                        return values;
                      }
                      return {
                        ...prev,
                        ...values,
                      };
                    });
                  }}
                />
                <Form.Label className="errorMessage"> {error}</Form.Label>
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
                  disabled={selectedCountry === null}
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
      {loading ? (
        <div className="dataTableRow">
          <Skeleton />
        </div>
      ) : (
        <div className="dataTableRow">
          <DataTable columns={columns} rows={countryList} />
        </div>
      )}

      <ConfirmPrompt
        mode={action}
        show={modalShow}
        onHide={() => setModalShow(false)}
        onConfirmed={() => {
          deleteData();
        }}
      />
    </>
  );
}
