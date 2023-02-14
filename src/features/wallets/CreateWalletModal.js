import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { createWallet } from './walletSlice';
import { InfoCircle } from 'react-bootstrap-icons';
import { changeLearnModal } from '../learn/learnSlice';

const CreateWalletModal = (props) => {
  const dispatch = useDispatch();
  const { keys } = useSelector(state => state);
  const [numAddrs, setNumAddrs] = useState('');
  const [walletKeys, setWalletKeys] = useState('');
  const [addrType, setAddrType] = useState('');
  const [addrName, setAddrname] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setNumAddrs('');
    setWalletKeys('');
    setAddrType('');
    setAddrname('');
    setFormErrors('');
  }, [props.show]);

  const handleInfoClick = (topic) => {
    dispatch(changeLearnModal({ modalShow: true, topic }));
  };

  const handleWalletCreate = () => {
    const errorsObj = {};
    if (!numAddrs) {
      errorsObj.numAddrs = "Select an option";
    }
    if (!walletKeys) {
      errorsObj.walletKeys = "Select a key";
    }
    if (!addrType) {
      errorsObj.addrType = "Choose address type";
    }
    if (!addrName || addrName.length > 20) {
      errorsObj.addrName = "Address name must be less than 20 characters"
      if (!addrName) {
        errorsObj.addrName = "Name your address";
      };
    }

    setFormErrors(errorsObj);

    if (numAddrs && walletKeys && addrType && addrName) {
      dispatch(createWallet(addrType, walletKeys, addrName));
      setFormErrors({});
    }
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
          Create Address
          <InfoCircle
            color='#0d6efd'
            onClick={() => handleInfoClick('address')}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col} md={6} sm={12}
              onChange={(e) => setNumAddrs(e.target.value)}
            >
              <h5>
                Step 1: Single or Multi?
                <InfoCircle
                  color='#0d6efd'
                  onClick={() => handleInfoClick('singleOrMulti')}
                />
              </h5>
              <Form.Check
                inline
                label="Single Signature"
                value='single'
                name='single-or-multi'
                type='radio'
              />
              <Form.Check
                inline
                label="Multipile Signatures"
                value='multi'
                name='single-or-multi'
                type='radio'
                disabled
              />
              <div className='modal-error-message'>{formErrors.numAddrs}</div>
            </Form.Group>
            <Form.Group
              as={Col} md={6} sm={12}
              onChange={(e) => setWalletKeys(e.target.value)}
            >
              <h5>Step 2: Key(s)
                <InfoCircle
                  color='#0d6efd'
                  onClick={() => handleInfoClick('singleOrMulti')}
                />
              </h5>
              <Form.Select aria-label="select keys">
                <option>Choose which key pair to use</option>
                {
                  (keys.length > 0) &&
                  keys.map(key => <option key={key._id} value={key._id}>{key.keyName}</option>)
                }
                {
                  (keys.length === 0 || !keys) &&
                  <option>No keys available</option>
                }
              </Form.Select>
              <div className='modal-error-message'>{formErrors.walletKeys}</div>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col} md={6} sm={12}
              onChange={(e) => setAddrType(e.target.id)}
            >
              <h5>
                Step 3: Address Type
                <InfoCircle
                  color='#0d6efd'
                  onClick={() => handleInfoClick('addressTypes')}
                />
              </h5>
              <Form.Check
                inline
                label="p2pkh"
                name="addr-type"
                type='radio'
                id='p2pkh'
              />
              <Form.Check
                inline
                label="p2sh"
                name="addr-type"
                type='radio'
                id='p2sh'
                disabled
              />
              <Form.Check
                inline
                label="p2ms"
                name="addr-type"
                type='radio'
                id='p2ms'
                disabled
              />
              <Form.Check
                inline
                label="p2wpkh"
                name="addr-type"
                type='radio'
                id='p2wpkh'
                disabled
              />
              <Form.Check
                inline
                label="p2wsh"
                name="addr-type"
                type='radio'
                id='p2wsh'
                disabled
              />
              <div className='modal-error-message'>{formErrors.addrType}</div>
            </Form.Group>
            <Form.Group as={Col} md={6} sm={12}>
              <h5>Step 4: Name your wallet</h5>
              <Form.Control
                onChange={(e) => setAddrname(e.target.value)}
                value={addrName}
                type='text'
              />
              <div className='modal-error-message'>{formErrors.addrName}</div>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleWalletCreate}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateWalletModal;
