import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { createWallet } from '../wallets/walletSlice';
import { createRawP2pkh } from '../../utils/bitcoind/rawTransactions';

const CreateTxModal = (props) => {
  const dispatch = useDispatch();
  const { address } = props;
  const userAddrs = useSelector(state => state.wallets);
  const keyPair = useSelector(state => {
   return state.keys.find(key => key._id === address.keys[0]);
  })
  const [recipientAddr, setRecipientAddr] = useState('')
  const [selectedUtxo, setSelectedUtxo] = useState({});
  const [selectedFee, setSelectedFee] = useState('');
  const [value, setValue] = useState(0);

  const handleTxCreate = async () => {
    const utxo = address.transactions.find(transaction => transaction._id === selectedUtxo);

    const transaction = await createRawP2pkh({
      address: address.address,
      WIFs: [keyPair.wif],
      utxoId: utxo.txid,
      fee: selectedFee,
      network: 'regtest',
      vout: utxo.vout,
      scriptPubKey: utxo.scriptPubKey,
      value,
      recipientAddr,
    })
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Send from</Form.Label>
              <Form.Control value={address.address} disabled />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Send to</Form.Label>
              <Form.Select onChange={(e) => setRecipientAddr(e.target.value)}>
                <option value={''}>Address</option>
                {userAddrs.map(address => <option value={address.address}>{address.address}</option>)}
                <option value={'random'}>Random Address</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>UTXO selection</Form.Label>
              <Form.Select onChange={(e) => setSelectedUtxo(e.target.value)}>
                <option value={''}>Pick UTXO to spend:</option>
                {address.transactions.map(utxo => {
                  return <option value={utxo._id}>{utxo.amount}</option>
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Amount (sats)</Form.Label>
                <Form.Control onChange={(e) => setValue(e.target.value)} placeholder='Sats are whole numbers' type='text' pattern="\d*"/>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Fee</Form.Label>
              <Form.Select onChange={(e) => setSelectedFee(e.target.value)}>
                <option value={''}>Choose fee rate</option>
                <option value={1}>1 sat/vbyte (slow)</option>
                <option value={3}>3 sat/vbyte (medium)</option>
                <option value={5}>5 sat/vbyte (fast)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Network</Form.Label>
                <Form.Control value={"regtest"} disabled/>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleTxCreate}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTxModal;
