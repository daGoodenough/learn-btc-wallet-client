import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

import { generatePrivKey, generatePubKey } from './keyUtils';

const CreateKeyModal = (props) => {
  const [privKey, setPrivKey] = useState('');
  const [pubKey, setPubKey] = useState('');
  const [compressed, setCompressed] = useState(true);

  const handleGeneratePrivKeyClick = async (e) => {
    e.preventDefault();
    const privKeyObject = await generatePrivKey();
    setPrivKey(privKeyObject.privateKey);
    setPubKey('')
  }

  const handleGeneratePubKeyClick = async (e) => {
    e.preventDefault();

    const pubKeyResponse = await generatePubKey(privKey, compressed);
    setPubKey(pubKeyResponse);
  } ;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a Key Pair
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Step 1: Generate a Private Key</h4>
        <Form>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Private Key</Form.Label>
              <Form.Control
                as="textarea"
                value={privKey}
                disabled
              />
            </Form.Group>
            <Col
              className="d-flex justify-content-md-center align-items-center"
              md={2} sm={12}
            >
              <button onClick={(e => handleGeneratePrivKeyClick(e))}>Generate</button>
            </Col>
          </Row>
        </Form>
        <h4>Step 2: Generate Corresponding Public Key</h4>
        <Form>
          <Row>
            <Form.Group as={Col} className="mb-3">
              <Row>
                <Form.Label as={Col}>Public Key</Form.Label>
                <Col>
                
                  <Form.Check onChange={(e) => setCompressed(e.target.checked)} checked={compressed}  type='switch' label="Compressed" />
                </Col>
              </Row>
              <Form.Control
                value={pubKey}
                as='textarea'
                disabled
              />
            </Form.Group>
            <Col
              className="d-flex justify-content-md-center align-items-center"
              md={2} sm={12}
            >
              <button onClick={(e) => handleGeneratePubKeyClick(e)}>Generate</button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal >
  );
}

export default CreateKeyModal;
