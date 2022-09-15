import React, { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Components/Layout";
import CustomTabs from "../../Components/Tabs";

import HeadOffice from "./HeadOffice";
import Candidate from "./Candidate";
import Qualification from "./Qualification";
import BranchMaster from "./BranchMaster";
import Country from "./Country";
import EmployeeMaster from "./EmployeeMaster";
import CollegeUniversity from "./College-University";

import styles from './rootsettings.module.css';

const HEADOFFICE_TABS = [
    { key: "headoffice", title: "Head Office" },
    { key: "country", title: "Country" },
    { key: "qualification", title: "Qualification" },
    { key: "candidate", title: "Candidate" },
    { key: "college-university", title: "College/University" },
    { key: "branch-master", title: "Branch Master" },
    { key: "employee-master", title: "Employee master" },
];

const DYNAMIC_COMPONENTS = {
    "headoffice": HeadOffice,
    "country": Country,
    "qualification": Qualification,
    "candidate": Candidate,
    'college-university': CollegeUniversity,
    'branch-master': BranchMaster,
    'employee-master': EmployeeMaster,
}

const RootSettings = () => {
    let { id: selectedTab } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const possibleTabs = HEADOFFICE_TABS.map(tab => tab.key.toLowerCase());

    if (!selectedTab || !possibleTabs.includes(selectedTab.toLowerCase())) {
        return (
            <h1>The page you are looking for does not exists</h1>
        )
    }

    const DynamicComponent = DYNAMIC_COMPONENTS[selectedTab];

    return (
        <Layout>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div className={styles.cardview}>
                            <CustomTabs
                                tabs={HEADOFFICE_TABS}
                                activeKey={selectedTab}
                                onTabSelect={(key) => {
                                    navigate("/settings/" + key);
                                }}
                            >
                                {/* <InputFields fields={Input_Fields} /> */}
                            </CustomTabs>
                            <DynamicComponent />
                        </div>
                    </Col>
                </Row>

            </Container>
        </Layout>


    );
};

export default RootSettings;
