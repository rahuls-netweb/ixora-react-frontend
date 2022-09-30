import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../../Components/DataTable";
import { MdDelete } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import styles from "../rootsettings.module.css";
import stylesIndex from './index.module.css'
import {
    countryCreate,
    countryGetAll,
    countryUpdate,
    countryDelete,
} from "../../../store/actions/countryAction";

import {
    getPaginatedRecordNumber,
    resetReactHookFormValues,
} from "../../../utils/helpers";

import { useForm, Controller } from "react-hook-form";



import Flags from "country-flag-icons/react/3x2";
import ReactSelect, { components } from "react-select";

import countries from "./countries.json";
import Skeleton from "../../../Components/Skeleton";


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
        countryCode: el.dial_code
    };
});

const { Option } = components;


export default function Country() {


    const [selectedCountry, setSelectedCountry] = useState('');
    const country = "US";
    const Flag = Flags[country.toUpperCase()];

    console.log(selectedCountry, "selectedCountry")

    const IconOption = (props) => {
        const {
            data: { label, icon: Icon, countryCode }
        } = props;
        return (
            <Option  {...props}>
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
                            <span className={stylesIndex.inputFieldIcon} ><selectedOptionFlag.icon className="small" /></span>
                            <span className={stylesIndex.countryCode}>{selectedOptionFlag.countryCode}</span>
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

    const { countryList } = useSelector((state) => state.country);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { isDirty, isValid },
        reset,
    } = useForm({
        // resolver,
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
            name: "Country Name",
            selector: (row) => row.name,
        },
        {
            name: "Country Code",
            selector: (row) => row.code,
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
                                    code: singleRowData.code,
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
                                countryDelete({ id: singleRowData.id }, () =>
                                    dispatch(
                                        countryGetAll(
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
            countryGetAll(
                null,
                () => setLoading(false),
                () => setLoading(false)
            )
        );
    }, []);

    function onFormSubmit(data) {
        console.log(data);
        return;
        setLoading(true);
        setIsSubmitting(true);
        if (mode === PAGE_MODES.add) {
            dispatch(
                countryCreate(
                    data,
                    () => {
                        setIsSubmitting(false);
                        setMode(PAGE_MODES.add);
                        reset();
                        dispatch(
                            countryGetAll(
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
                countryUpdate(
                    data,
                    () => {
                        setIsSubmitting(false);
                        setMode(PAGE_MODES.add);
                        reset();
                        dispatch(
                            countryGetAll(
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
                                    Country Name <span className="reqruiredFields">*</span>
                                </Form.Label>
                                <ReactSelect
                                    className="countryInputFieldOptions"
                                    defaultValue={options[0]}
                                    value={selectedCountry}
                                    options={options}
                                    components={{ Option: IconOption, ValueContainer: ValueContainer }}
                                    onChange={(values) => {
                                        setSelectedCountry(values);
                                    }}
                                />
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
                    <Skeleton />
                </div>
            ) : (
                <div className="dataTableRow">
                    <DataTable columns={columns} rows={countryList} />
                </div>
            )}
        </>
    );
}
