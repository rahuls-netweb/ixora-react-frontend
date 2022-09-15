import React, { Fragment } from "react";
import { Col, Form } from "react-bootstrap";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import styles from "./DynamicForm.module.css";

function DynamicForm(props) {
  console.log(props);
  const handleInputChange = (index, event) => {
    props.handleInputChange(index, event);
  };
  const handleRemoveFields = (index) => {
    props.handleRemoveFields(index);
  };
  const handleAddFields = () => {
    props.handleAddFields();
  };
  return (
    <>
      {props.data.map((data, index, arr) => {
        return (
          <Fragment key={`${data}~${index}`}>
            <Col md={12} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>Country</Form.Label>
                <Form.Select
                  name="country"
                  onChange={(event) => handleInputChange(index, event)}
                >
                  <option>Select</option>
                  <option>CANADA</option>
                  <option>INDIA</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>University</Form.Label>
                <Form.Select
                  name="university"
                  onChange={(event) => handleInputChange(index, event)}
                >
                  <option>Select</option>
                  <option>University1</option>
                  <option>University2</option>
                  <option>University3</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Course</Form.Label>
                <Form.Control
                  name="course"
                  onChange={(event) => handleInputChange(index, event)}
                  value={data.course}
                  type="text"
                  placeholder="Confirmed contact number"
                />
              </Form.Group>
            </Col>
            <Col md={12} className={styles.customColumn}>
              <Form.Group className={styles.divDivision}>
                <Form.Label>In take </Form.Label>
                <Form.Select
                  name="intake"
                  onChange={(event) => handleInputChange(index, event)}
                >
                  <option>Select</option>
                  <option>Jan</option>
                  <option>Feb</option>
                  <option>Mar</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className={styles.divDivision}>
                <Form.Label>Course Link</Form.Label>
                <Form.Control
                  name="courseLink"
                  value={data.courseLink}
                  type="text"
                  placeholder="Link"
                  onChange={(event) => handleInputChange(index, event)}
                />
              </Form.Group>
              <Form.Group
                className={styles.divDivision}
                style={{ marginTop: "50px" }}
              >
                <FaMinusCircle
                  onClick={() => handleRemoveFields(index)}
                  hidden={arr.length - 1 === index ? true : false}
                />
                <FaPlusCircle
                  onClick={() => handleAddFields(index)}
                  hidden={arr.length - 1 === index ? false : true}
                />
              </Form.Group>
            </Col>
          </Fragment>
        );
      })}
    </>
  );
}

export default DynamicForm;
