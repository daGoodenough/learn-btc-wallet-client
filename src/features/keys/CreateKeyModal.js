import { Modal, Button, Form, Row, Col, Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { generatePrivKey, generatePubKey } from './keyUtils';
import { saveKeyPair } from './keySlice';
import { InfoCircle } from 'react-bootstrap-icons';
import { changeLearnModal } from '../learn/learnSlice';

const CreateKeyModal = (props) => {
  const dispatch = useDispatch();
  const [privKey, setPrivKey] = useState({});
  const [pubKey, setPubKey] = useState({ compressed: '', uncompressed: '' });
  const [compressed, setCompressed] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [keyName, setKeyName] = useState('');
  const [errorMessages, setErrorMessages] = useState({})

  useEffect(() => {
    setPubKey({ compressed: '', uncompressed: '' });
    setCompressed(true);
    setKeyName('');
    setErrorMessages({});
    setPrivKey('');
    setActivePage(1);
  }, [props.show]);


  const pagenationItems = [1, 2, 3].map(number => {
    return (
      <Pagination.Item onClick={() => handlePageChange(number)} key={number} active={number === activePage}>
        {number}
      </Pagination.Item>
    );
  });

  const handleInfoClick = (topic) => {
    dispatch(changeLearnModal({ modalShow: true, topic }));
  };

  const handleGeneratePrivKeyClick = async (e) => {
    e.preventDefault();

    const privKeyObject = await generatePrivKey();

    setPrivKey(privKeyObject);
    setPubKey({ compressed: '', uncompressed: '' })
  };

  const handleGeneratePubKeyClick = async (e) => {
    e.preventDefault();
    if (!privKey) {
      return setErrorMessages({ privKey: 'You must first generate a Private Key' })
    }

    const pubKeyResponse = await generatePubKey(privKey.privateKey);

    setPubKey(pubKeyResponse);
    setErrorMessages({});
  };

  const handleKeySave = () => {
    if (!keyName) {
      return setErrorMessages({ keyName: "You must create a key name." });
    }
    const { privateKey } = privKey;

    const publicKey = compressed ?
      pubKey.compressed :
      pubKey.uncompressed;

    const wif = compressed ?
      privKey.wifCompressed :
      privKey.wifUncompressed;

    dispatch(saveKeyPair(keyName, privateKey, wif, publicKey, compressed, () => {
      props.onHide();
      dispatch(changeLearnModal({modalShow: true, topic: 'step2'}));
    }));
    setErrorMessages({});
  };

  const handlePageChange = (number) => {
    if (activePage === 1) {
      if (!(pubKey.compressed && pubKey.uncompressed)) {
        return setErrorMessages({ pubKey: 'You are required to generate a public key' });
      };
    };

    if (activePage === 2 && number === 3 && !keyName) {
      return setErrorMessages({ keyName: "You must name your key." })
    }
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
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a Key Pair
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Step 1: Generate a Private Key</h5>
          <Form>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Private Key
                  <InfoCircle
                    color='#0d6efd'
                    onClick={() => handleInfoClick('privateKey')}
                  />
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={privKey.privateKey}
                  disabled
                />
                <div className='modal-error-message'>{errorMessages.privKey}</div>
              </Form.Group>
              <Col
                className="d-flex justify-content-md-center align-items-center"
                md={2} sm={12}
              >
                <button onClick={(e => handleGeneratePrivKeyClick(e))}>Generate</button>
                <InfoCircle
                  color='#0d6efd'
                  onClick={() => handleInfoClick('generatePrivateKey')}
                />
              </Col>
            </Row>
          </Form>
          <h5>Step 2: Generate Corresponding Public Key</h5>
          <Form>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Row>
                  <Form.Label as={Col}>Public Key
                    <InfoCircle
                      color='#0d6efd'
                      onClick={() => () => handleInfoClick('publicKey')}
                    />
                  </Form.Label>
                  <Col className='d-flex align-items-center'>
                    <Form.Check onChange={(e) => setCompressed(e.target.checked)} checked={compressed} type='switch' label="Compressed" />
                    <InfoCircle
                      color='#0d6efd'
                      onClick={() => handleInfoClick('compressed')}
                    />
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
                <InfoCircle
                  color='#0d6efd'
                  onClick={() => () => handleInfoClick('generatePublicKey')}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className='justify-content-around'>
          <Pagination size='sm'>{pagenationItems}</Pagination>
          <Button onClick={() => handlePageChange(2)}>Next</Button>
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
            Name Your Key
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

          </Form>
        </Modal.Body>
        <Modal.Footer className='justify-content-around'>
          <Pagination size='sm'>{pagenationItems}</Pagination>
          <Button onClick={() => handlePageChange(3)}>Next</Button>
        </Modal.Footer>
      </Modal >
    );
  };
  if (activePage === 3) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm and Save
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Key Name</Form.Label>
                <Form.Control
                  disabled
                  value={keyName}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>
                  Private Key
                  <InfoCircle
                    color='#0d6efd'
                    onClick={() => handleInfoClick('privateKey')}
                  />
                </Form.Label>
                <Form.Control
                  as="textarea"
                  value={privKey.privateKey}
                  disabled
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>
                  WIF
                  <InfoCircle
                    color='#0d6efd'
                    onClick={() => handleInfoClick('wif')}
                  />
                </Form.Label>
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
                  <Form.Label>
                    Public Key
                    <InfoCircle
                      color='#0d6efd'
                      onClick={() => handleInfoClick('publicKey')}
                    />
                  </Form.Label>
                </Row>
                <Form.Control
                  value={compressed ? pubKey.compressed : pubKey.uncompressed}
                  as='textarea'
                  disabled
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className='justify-content-around'>
          <Pagination size='sm'>{pagenationItems}</Pagination>
          <Button onClick={handleKeySave}>Save Key</Button>
        </Modal.Footer>
      </Modal >
    );
  }
}

export default CreateKeyModal;
