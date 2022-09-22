import Header from "../Header";
import SideBar from "../SideBar";
import { Container, Row, Col } from "react-bootstrap";
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
        <Container fluid style={{ paddingRight: 0 }}>
          <Row>
            <Col md={12}>{children}</Col>
          </Row>
        </Container>
      </div>
    </Container>
  );
}
