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
                size="lg"
                show={props.showModalExport}
                onHide={props.onCloseModalExport}
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
                            <Form.Control as="textarea" value={jsonData} rows={3} disabled={true} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onCloseModalExport}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalExport;