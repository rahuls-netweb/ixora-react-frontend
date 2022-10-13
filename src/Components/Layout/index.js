import Header from "../Header";
import SideBar from "../SideBar";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./index.module.css";

export default function Layout() {
  return (
    <Container fluid className="containerNavbar">
      <Row>
        <Col md={12}>
          <Header />
        </Col>
      </Row>
      <div className="d-flex">
        <SideBar />
        <Container fluid className={styles.custContainer}>
          <Row className={styles.custRow}>
            <Col md={12} className={styles.custColumn}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}
