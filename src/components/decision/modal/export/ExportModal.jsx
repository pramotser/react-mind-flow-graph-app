import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'

import './ExportModal.css'

function ModalExport(props) {
    const [jsonData, setJsonData] = useState("")

    useEffect(() => {
        setJsonData(props.jsonData)
    }, [props])

    return (
        <>
            <Modal
                size="xl"
                show={props.showModalExport}
                onHide={props.onCloseModalExport}
                backdrop="static"
                aria-labelledby="contained-modal-title-lg-vcenter"
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
                            <Form.Control style={{ height: 400 }} as="textarea" value={jsonData} rows={3} disabled={true} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={props.onCloseModalExport}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalExport;