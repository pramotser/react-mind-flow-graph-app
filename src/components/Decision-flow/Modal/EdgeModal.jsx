import { Modal, Button, Form } from 'react-bootstrap'

function ModalEdge(props) {
    console.log(props.showModalEdge);
    return (
        <>
            <Modal
                size="lg"
                show={props.showModalEdge}
                onHide={props.cModal}
                aria-labelledby="contained-modal-title-lg-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Condition Edge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Edge Id</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Node Name"
                                value={props.idEdge}
                                disabled
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.cModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.cModal}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>






            {/* <Modal size="lg"
                aria-labelledby="contained-modal-title-vcenter" centered show={props.showModalEdge} onHide={props.cModal}>

                <Modal.Header closeButton>
                    <Modal.Title>Condition Edge</Modal.Title>
                </Modal.Header>


                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit Edge Id: {props.idEdge}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Edge Id: {props.idEdge} </div>
                    <div style={{ color: 'red' }} >Source Node: {props.sourceNode} </div>
                    <div style={{ color: 'Blue' }} >Target Node: {props.targetNode} </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.cModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.cModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}

export default ModalEdge;


