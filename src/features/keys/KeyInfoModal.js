import { Modal, Row, Form, Col } from 'react-bootstrap';

const KeyInfoModal = (props) => {
  const {keyPair} = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title id="contained-modal-title-vcenter">
          {keyPair?.keyName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Private Key</Form.Label>
          <Form.Control
            as="textarea"
            value={keyPair?.privateKey}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Public Key</Form.Label>
          <Form.Control
            as="textarea"
            value={keyPair?.publicKey}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>WIF</Form.Label>
          <Form.Control
            as="textarea"
            value={keyPair?.wif}
            disabled
          />
        </Form.Group>
        <Row className='justify-content-between text-center'>
          <Form.Group as={Col} md={3} sm={12}className="mb-3">
            <Form.Label>Compressed?</Form.Label>
            <Form.Control
              value={keyPair?.isCompressed}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md={3} sm={12} className="mb-3">
            <Form.Label>Network</Form.Label>
            <Form.Control
              value={keyPair?.network}
              disabled
            />
          </Form.Group>
        </Row>
      </Modal.Body>
      <Modal.Footer className='justify-content-around'>
        Click on any field to learn more.
      </Modal.Footer>
    </Modal >
  );
}

export default KeyInfoModal;
