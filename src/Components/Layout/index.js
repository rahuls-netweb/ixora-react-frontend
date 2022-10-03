import Header from "../Header";
import SideBar from "../SideBar";
import { Container, Row, Col } from "react-bootstrap";
import styles from './index.module.css'
export default function Layout({ children }) {
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
            <Col md={12} className={styles.custColumn}>{children}</Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}
