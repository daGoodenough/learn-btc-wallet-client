import { Modal, Button, Form, Row, Col, Pagination } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { generatePrivKey, generatePubKey } from './keyUtils';
import { saveKeyPair } from './keySlice';

const CreateKeyModal = (props) => {
  const dispatch = useDispatch();
  const [privKey, setPrivKey] = useState({});
  const [pubKey, setPubKey] = useState({ compressed: '', uncompressed: '' });
  const [compressed, setCompressed] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [keyName, setKeyName] = useState('');
  const [errorMessages, setErrorMessages] = useState({})

  const pagenationItems = [1, 2].map(number => {
    return (
      <Pagination.Item onClick={() => handlePageChange(number)} key={number} active={number === activePage}>
        {number}
      </Pagination.Item>
    );
  });

  const handleGeneratePrivKeyClick = async (e) => {
    e.preventDefault();

    const privKeyObject = await generatePrivKey();

    setPrivKey(privKeyObject);
    setPubKey({ compressed: '', uncompressed: '' })
  };

  const handleGeneratePubKeyClick = async (e) => {
    e.preventDefault();

    const pubKeyResponse = await generatePubKey(privKey.privateKey);

    setPubKey(pubKeyResponse);
    setErrorMessages({});
  };

  const handleKeySave = () => {
    if(!keyName) {
      return setErrorMessages({keyName: "You must create a key name."});
    }
    const { privateKey } = privKey.privateKey;

    const publicKey = compressed ?
      pubKey.compressed :
      pubKey.uncompressed;

    const wif = compressed ?
      privKey.wifCompressed :
      privKey.wifUncompressed;

    dispatch(saveKeyPair(keyName, privateKey, wif, publicKey));
    setErrorMessages({});
  };

  const handlePageChange = (number) => {
    if (activePage === 1) {
      if (!(pubKey.compressed && pubKey.uncompressed)) {
       return setErrorMessages({ pubKey: 'You are required to generate a public key' });
      };
    };
    setActivePage(number);
    setErrorMessages({});
  };

  if (activePage === 1) {
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
                  value={privKey.privateKey}
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
                    <Form.Check onChange={(e) => setCompressed(e.target.checked)} checked={compressed} type='switch' label="Compressed" />
                  </Col>
                </Row>
                <Form.Control
                  value={compressed ? pubKey.compressed : pubKey.uncompressed}
                  as='textarea'
                  disabled
                />
                <div className='modal-error-message'>{errorMessages.pubKey}</div>
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
        <Modal.Footer className='justify-content-around'>
          <Pagination size='sm'>{pagenationItems}</Pagination>
          <Button onClick={() => setActivePage(2)}>Next</Button>
        </Modal.Footer>
      </Modal >
    );
  }
  if (activePage === 2) {
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
          <h4>Save Key Pair</h4>
          <Form>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Key Name</Form.Label>
                <Form.Control
                  onChange={(e) => setKeyName(e.target.value)}
                  value={keyName}
                />
                  <div className='modal-error-message'>{errorMessages.keyName}</div>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Private Key</Form.Label>
                <Form.Control
                  as="textarea"
                  value={privKey.privateKey}
                  disabled
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>WIF</Form.Label>
                <Form.Control
                  as="textarea"
                  value={compressed ? privKey.wifCompressed : privKey.wifUncompressed}
                  disabled
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Row>
                  <Form.Label as={Col}>Public Key</Form.Label>
                </Row>
                <Form.Control
                  value={compressed ? pubKey.compressed : pubKey.uncompressed}
                  as='textarea'
                  disabled
                />
              </Form.Group>
            </Row>
            <button onClick={handleKeySave}>Save Key</button>
          </Form>
        </Modal.Body>
        <Modal.Footer className='justify-content-around'>
          <Pagination size='sm'>{pagenationItems}</Pagination>
          <Button onClick={() => setActivePage(2)}>Next</Button>
        </Modal.Footer>
      </Modal >
    );
  }
}

export default CreateKeyModal;
