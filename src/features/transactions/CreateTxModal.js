import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { createRawP2pkh, broadcastTransaction } from '../../utils/bitcoind/rawTransactions';

const CreateTxModal = (props) => {
  const dispatch = useDispatch();
  const { address } = props;
  const [modalPage, setModalPage] = useState(1);
  const userAddrs = useSelector(state => state.wallets);
  const keyPair = useSelector(state => {
    return state.keys.find(key => key._id === address.keys[0]);
  })
  const [recipientAddr, setRecipientAddr] = useState('')
  const [selectedUtxo, setSelectedUtxo] = useState({});
  const [selectedFee, setSelectedFee] = useState('');
  const [value, setValue] = useState(0);
  const [transaction, setTransaction] = useState({});

  const handleTxCreate = async () => {
    try {
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
      });
      setTransaction(transaction);
      setModalPage(2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBroadcast = async () => {
    try {
     const txid = await broadcastTransaction(transaction.hex);
    }
    catch (error) {
      console.log(error);
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
          {modalPage === 1 && 'Create Transaction'}
          {modalPage === 2 && 'Transaction info'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          modalPage === 1 &&
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
                <Form.Control onChange={(e) => setValue(e.target.value)} placeholder='Sats are whole numbers' type='text' pattern="\d*" />
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
                <Form.Control value={"regtest"} disabled />
              </Form.Group>
            </Row>
          </Form>
        }
        {
          modalPage === 2 &&
          <Form>
            <Row>
              {transaction.decodedTx.vin.map((input, index) => {
                return (
                  <>
                    <h5>Input {index + 1}</h5>
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Input txid</Form.Label>
                      <Form.Control disabled value={input.txid} as='textarea' />
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                      <Form.Label>Script Sig ASM</Form.Label>
                      <Form.Control disabled value={input.scriptSig.asm} as='textarea' />
                    </Form.Group>
                  </>
                )
              })}
            </Row>
            {
              transaction.decodedTx.vout.map((output, index) => {
                return (
                  <>
                    <Row>
                      <h5>Output {index + 1}</h5>
                      <Form.Group md={6} as={Col}>
                        <Form.Label>Recieving Address</Form.Label>
                        <Form.Control as='textarea' value={output.scriptPubKey.address} disabled />
                      </Form.Group>
                      <Form.Group md={6} as={Col}>
                        <Form.Label>Amount (sats)</Form.Label>
                        <Form.Control value={output.value * 1e8} disabled />
                      </Form.Group>
                      <Form.Group as={Col} md={3}>
                        <Form.Label>Address Type</Form.Label>
                        <Form.Control as='textarea' value={output.scriptPubKey.type} disabled />
                      </Form.Group>
                      <Form.Group as={Col} md={9}>
                        <Form.Label>Locking Script</Form.Label>
                        <Form.Control as='textarea' value={output.scriptPubKey.asm} disabled />
                      </Form.Group>
                    </Row>
                  </>
                );
              })
            }
            <Form.Group>
              <Form.Label>Raw Transaction</Form.Label>
              <Form.Control as='textarea' col='6' value={transaction.hex} disabled />
            </Form.Group>
          </Form>
        }
      </Modal.Body>
      <Modal.Footer>
        { modalPage === 1 && <Button onClick={handleTxCreate}>Create</Button>}
        { modalPage ===2 && (<>
          <Button onClick={() => setModalPage(1)}>Back</Button>
          <Button onClick={() => handleBroadcast()}>Broadcast Tx</Button>
        </>)}
      </Modal.Footer>
    </Modal>
  );
}

export default CreateTxModal;
