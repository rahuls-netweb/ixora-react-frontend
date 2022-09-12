import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { Container, Row, Col, Tab, Tabs, Table, Button } from "react-bootstrap";
import styles from "./setting.module.css";
import { useNavigate } from "react-router-dom";

export default function BranchMaster() {
  const [data, setData] = useState([]);
  const [text, setText] = useState();
  const navigate = useNavigate();
  const [key, setKey] = useState("BranchMaster");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addData = () => {
    if (text !== "") {
      const newData = [
        ...data,
        {
          title: text,
        },
      ];
      setData(newData);
      setText("");
    }
  };
  const editTask = () => {};
  const deleteTask = (index) => {
    const newdata = [...data];
    newdata.splice(index, 1);
    setData(newdata);
  };

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className={styles.cardview}>
              <Tabs
                defaultActiveKey="BranchMaster"
                id="fill-tab-example"
                className={"tabs-Content " + styles.tabsContent}
                fill
                activeKey={key}
                onSelect={(key) => {
                  setKey(key);
                  navigate("/settings/" + key);
                }}
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
                  <div className={styles.tablecardViewMain}>
                    <h3>Qualification</h3>
                  </div>
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
