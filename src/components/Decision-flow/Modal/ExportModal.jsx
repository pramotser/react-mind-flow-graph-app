import React, { useState } from 'react';
import { Form, Button, Modal } from "react-bootstrap";

var JSONExport = ""

export const setTextJSONExport = (JSONFlowData) =>{
    console.log(JSONFlowData)
    JSONExport = JSONFlowData
}

function ExportModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Export JSON
            </Button>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-lg-vcenter"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Export JSON</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" value={JSONExport} rows={3} disabled={true} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ExportModal;