import './test-decision.scss';
import { useState } from "react";
import ReactFlow, { Controls, Background } from 'reactflow';
import {
    Form,
    Row,
    Col,
    Accordion
} from 'react-bootstrap'
import { useLocation } from "react-router-dom";

import Sidebar from "../../components/layout/sidebar/Sidebar";
import Navbar from "../../components/layout/navbar/Navbar";
import LoadingScreen from "../../components/layout/loading/LoadingScreen";



const rootStyle = {
    flexGrow: 6,
    height: '100%',
    width: '100%',
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    borderRadius: 10
};

const contentStyle = {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "pink",
    backdropFilter: "saturate(180%) blur(20px)",
    transition: "left 0.4s ease-out, opacity 0.4s ease-out"
};

const TestDecision = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    const setLoadingPages = (loading) => {
        setLoading(loading)
    }

    return (
        <div className="pages-wrapper">
            <LoadingScreen loading={loading} />
            <Sidebar />
            <div className="content-wrapper">
                <Navbar />
                <div style={rootStyle}>
                    <div style={contentStyle}>
                        <ReactFlow>
                            <div className="content-in-flow">
                                <div className="content-wrapper">
                                    <div className="content">
                                        <div className="title-content" >
                                            <h1>Decision</h1>
                                        </div>
                                        <Accordion defaultActiveKey={[]} style={{ marginLeft: '0px' }}>
                                            <Accordion.Item eventKey="0" style={{ marginLeft: '0px' }}>
                                                <Accordion.Header style={{ marginLeft: '0px' }}>
                                                    <div className="title-content">
                                                        Flow Description
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    <Form >
                                                        <Row className="mb-3">
                                                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                                                <Form.Label>Flow ID</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="flowId"
                                                                    placeholder="Flow ID"
                                                                    value={'flowId'}
                                                                    disabled={true}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                                                <Form.Label>Flow Name</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="flowName"
                                                                    placeholder="Flow Name"
                                                                    value={'flowName'}
                                                                    disabled={true}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                                                <Form.Label>Result Param</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="resultParam"
                                                                    placeholder="Result Param"
                                                                    value={'resultParam'}
                                                                    disabled={true}
                                                                />
                                                            </Form.Group>
                                                        </Row>
                                                    </Form>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                            <Background />
                            <Controls />
                        </ReactFlow>
                        {/* <DecisionFlow /> */}
                    </div>
                </div>
            </div>
        </div>


    );
};

export default TestDecision;
