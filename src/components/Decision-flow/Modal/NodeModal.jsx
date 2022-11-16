// import React, { useState } from 'react';
// import { Form, Button, Modal } from "react-bootstrap";


// function Model() {
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     return (
//         <>
//             <Button variant="secondary" onClick={handleShow}>
//                 Add Node
//             </Button>
//             <Modal
//                 size="lg"
//                 show={show}
//                 onHide={handleClose}
//                 aria-labelledby="contained-modal-title-lg-vcenter"
//                 centered
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>New Node</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Node Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Node Name"
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }


// export default Model;