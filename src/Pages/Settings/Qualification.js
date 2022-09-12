import React from "react";
import Layout from "../../Components/Layout";
import { Container, Row, Col, Tab, Tabs, Table } from "react-bootstrap";
import styles from "./setting.module.css";

export default function Qualification() {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className={styles.cardview}>
              <Tabs
                defaultActiveKey="HeadOffice"
                id="fill-tab-example"
                className={"tabs-Content " + styles.tabsContent}
                fill
              >
                <Tab eventKey="HeadOffice" title="Head Office">
                  <div className={styles.tablecardViewMain}>
                    <h1>harman</h1>
                  </div>
                </Tab>
                <Tab eventKey="Country" title="Country">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="Qualification" title="Qualification">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="Candidate" title="Candidate">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="College/University" title="College/University">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="BranchMaster" title="Branch Master">
                  <div className={styles.tablecardViewMain}></div>
                </Tab>
                <Tab eventKey="Employee master" title="Employee master">
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
