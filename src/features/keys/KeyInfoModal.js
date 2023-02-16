import { Modal, Row, Form, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { changeLearnModal } from '../learn/learnSlice';
import { InfoCircle } from 'react-bootstrap-icons';

const KeyInfoModal = (props) => {
  const dispatch = useDispatch();
  const { keyPair } = props;

  const handleInfoClick = (topic) => {
    dispatch(changeLearnModal({ modalShow: true, topic }))
  }
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
          <Form.Label>
            Private Key
            <InfoCircle
              color='#0d6efd'
              onClick={() => handleInfoClick('privateKey')}
            />
          </Form.Label>
          <Form.Control
            as="textarea"
            value={keyPair?.privateKey || ''}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Public Key
            <InfoCircle
              color='#0d6efd'
              onClick={() => handleInfoClick('publicKey')}
            />
          </Form.Label>
          <Form.Control
            as="textarea"
            value={keyPair?.publicKey}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            WIF
            <InfoCircle
              color='#0d6efd'
              onClick={() => handleInfoClick('wif')}
            />
          </Form.Label>
          <Form.Control
            as="textarea"
            value={keyPair?.wif}
            disabled
          />
        </Form.Group>
        <Row className='justify-content-between text-center'>
          <Form.Group as={Col} md={3} sm={12} className="mb-3">
            <Form.Label>
              Compressed?
              <InfoCircle
                color='#0d6efd'
                onClick={() => handleInfoClick('compressed')}
              />
            </Form.Label>
            <Form.Control
              value={keyPair?.isCompressed}
              disabled
            />
          </Form.Group>
          <Form.Group as={Col} md={3} sm={12} className="mb-3">
            <Form.Label>
              Network
              <InfoCircle
                color='#0d6efd'
                onClick={() => handleInfoClick('network')}
              />
            </Form.Label>
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
