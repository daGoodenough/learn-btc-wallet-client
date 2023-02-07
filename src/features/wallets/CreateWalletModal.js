import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import {createWallet} from './walletSlice';

const CreateWalletModal = (props) => {
  const dispatch = useDispatch();
  const { keys } = useSelector(state => state);
  const [numAddrs, setNumAddrs] = useState('single');
  const [walletKeys, setWalletKeys] = useState('');
  const [addrType, setAddrType] = useState('');

  const handleWalletCreate = () => {
    dispatch(createWallet(addrType, walletKeys));
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
          Create Wallet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col} md={6} sm={12}
              onChange={(e) => setNumAddrs(e.target.value)}
            >
              <h5>Step 1: Single or Multi?</h5>
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
              />
            </Form.Group>
            <Form.Group
              as={Col} md={6} sm={12}
              onChange={(e) => setWalletKeys(e.target.value)}
            >
              <h5>Step 2: Key(s)</h5>
              <Form.Select aria-label="select keys">
                <option>Choose which key pair to use</option>
                {keys.map(key => <option value={key._id}>{key.keyName}</option>)}
              </Form.Select>
            </Form.Group>

          </Row>
          <Row>
            <Form.Group
              as={Col} md={6} sm={12}
              onChange={(e) => setAddrType(e.target.id)}
            >
              <h5>Step 3: Address Type</h5>
              <Form.Check
                inline
                label="p2pkh"
                name="addr-type"
                type='radio'
                id='p2pkh'
              />
            </Form.Group>
            <Form.Group as={Col} md={6} sm={12}>
              <h5>Step 4: Name your wallet</h5>
              <Form.Control type='text' />
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
