import Layout from "../../Components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import styles from './dashboard.module.css'
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const obj = [{
    header5: '125',
    header6: 'CCID assigned',
    icon: <MdDashboard />
},
{
    header5: '126',
    header6: 'TTID assigned',
    icon: <MdDashboard />
},
{
    header5: '127',
    header6: 'Visitor assigned',
    icon: <MdDashboard />
},
{
    header5: '128',
    header6: 'Telephonic assigned',
    icon: <MdDashboard />
},
{
    header5: '129',
    header6: 'Request for merging',
    icon: <MdDashboard />
},
{
    header5: '130',
    header6: 'Approval for Merging',
    icon: <MdDashboard />
},
{
    header5: '131',
    header6: 'List of merged inquires',
    icon: <MdDashboard />
},]

export default function Dashboard() {
    const navigate = useNavigate()
    const handleClick = (value) => {
        console.log(value, "value")
        if (value === "125") {
            navigate("/career-enquiry")
        } else {

        }
    }
    return (
        <Layout>
            <Container fluid>
                <Row>
                    {
                        obj.map(val =>
                            <Col lg={6} xl={4} className={styles.colSetting} onClick={() => { handleClick(val.header5) }}>
                                <div className={styles.commonContainer} >
                                    <div>
                                        <h5>{val.header5}</h5>
                                        <h6>{val.header6}</h6>
                                    </div>
                                    <div className={styles.iconDiv}>
                                        {val.icon}
                                    </div>
                                </div>
                            </Col>)
                    }

                </Row>
            </Container>

        </Layout>
    );
}