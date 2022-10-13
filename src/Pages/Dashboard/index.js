import { Container, Row, Col } from "react-bootstrap";
import styles from "./dashboard.module.css";
// import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const adminLogin = user.user.is_admin;

  const navigate = useNavigate();
  const handleClick = (value) => {
    if (value === "125") {
      navigate("/career-enquiry");
    } else if (value === "126") {
      navigate("/ttid-enquiry");
    } else if (value === "127") {
      navigate("/visitor-enquiry");
    } else if (value === "128") {
      navigate("/telephonic-enquiry");
    } else if (value === "129") {
      navigate("/settings");
    } else {
      navigate("/dashboard");
    }
  };

  const obj = [
    {
      id: uuidv4(),
      header5: "125",
      header6: adminLogin ? "Career Enquiry" : "CCID Assigned",
      icon: <img src="/img/careerEnquirysvg.svg" alt="Career Enquiry" />,
    },
    {
      id: uuidv4(),
      header5: "126",
      header6: adminLogin ? "TTID Enquiry" : "TTID Assigned",
      icon: <img src="/img/ttidEnquirysvg.svg" alt="TTID Enquiry" />,
    },
    {
      id: uuidv4(),
      header5: "127",
      header6: adminLogin ? "Visitor Enquiry" : "Visitor Assigned",
      icon: <img src="/img/visitorEnquirysvg.svg" alt="Visitor Enquiry" />,
    },
    {
      id: uuidv4(),
      header5: "128",
      header6: adminLogin ? "Telephonic Enquiry" : "Telephonic Assigned",
      icon: (
        <img src="/img/telephonicEnquirysvg.svg" alt="Telephonic Enquiry" />
      ),
    },
    {
      id: uuidv4(),
      header5: "129",
      header6: "Request for merging",
      icon: <img src="/img/mergingrequestsvg.svg" alt="Merging Request" />,
    },
    {
      id: uuidv4(),
      header5: "130",
      header6: "Approval for Merging",
      icon: <img src="/img/mergingApprovalsvg.svg" alt="Merging Approval" />,
    },
    {
      id: uuidv4(),
      header5: "131",
      header6: "List of merged Enquires",
      icon: <img src="/img/mergedEnquirysvg.svg" alt="Mereged Inquiry" />,
    },
  ];

  return (
    <Container fluid>
      <Row>
        {obj.map((val) => (
          <Col
            lg={6}
            xl={4}
            className={styles.colSetting}
            onClick={() => {
              handleClick(val.header5);
            }}
            key={uuidv4()}
          >
            <div className={styles.commonContainer}>
              <div key={val.id}>
                <h5>{val.header5}</h5>
                <h6>{val.header6}</h6>
              </div>
              <div className={styles.iconDiv}>{val.icon}</div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
