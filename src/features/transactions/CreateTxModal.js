import { Modal, Button, Form, Row, Col, Toast, ToastContainer } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { InfoCircle } from 'react-bootstrap-icons';

import { createRawP2pkh, broadcastTransaction } from '../../utils/bitcoind/rawTransactions';
import { Fragment } from 'react';
import { fetchUserWallets } from '../wallets/walletSlice';

const CreateTxModal = (props) => {
  const dispatch = useDispatch();
  const { address, handleInfoClick } = props;
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
  const [toastShow, setToastShow] = useState(false);
  const [broadcasted, setBroadcasted] = useState({ txid: '', value: null })
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    setModalPage(1);
    setRecipientAddr('');
    setSelectedUtxo('');
    setValue(0);
    setTransaction({});
    setErrors({});
  }, [props.show]);
  
  const handleTxCreate = async () => {
    try {
      const utxo = address.transactions.find(transaction => transaction._id === selectedUtxo);
      const errorObj = {};
      if ((utxo?.amount * 1e8) < Number(value)  + (Number(selectedFee) * 226)) {
        errorObj.amount = "The amount you are sending must be less than the UTXO value combined with the fee";
      };
      if (Number.isNaN(parseInt(value))){
        errorObj.amount = "Satoshis are whole numbers";
      }
      if (!recipientAddr || !selectedUtxo || !selectedFee || !value) {
        errorObj.general = "Make sure all fields are filled";
      }
      setErrors(errorObj);

      if (Object.keys(errorObj).length === 0) {

        const transaction = await createRawP2pkh({
          address: address.address,
          WIFs: [keyPair.wif],
          utxoId: utxo.txid,
          fee: selectedFee,
          network: 'regtest',
          vout: utxo.vout,
          scriptPubKey: utxo.scriptPubKey,
          value: Math.round(value),
          recipientAddr,
        });
        setTransaction(transaction);
        setModalPage(2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBroadcast = async () => {
    try {
      const txid = await broadcastTransaction(transaction.hex);


      setBroadcasted({ txid, value, error: null });

      props.onHide();

      setTimeout(() => {
        dispatch(fetchUserWallets());
        setToastShow(true);
      }, 2000);
    }
    catch (error) {
      setBroadcasted({
        txid: '',
        value: null,
        error: error.message
      });

      props.onHide();

      setTimeout(() => {
        setToastShow(true);
      }, 2000);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        dialogClassName="modal-width"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton closeVariant='white'>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalPage === 1 && 'Create Transaction'}
            {modalPage === 2 && 'Transaction info'}
            <InfoCircle
              color='#0d6efd'
              onClick={() => handleInfoClick('transaction')}
            />
          </Modal.Title>
        </Modal.Header>
        {
          modalPage === 1 &&
          (<Modal.Body>
            <Form>
              <Row>
                <Form.Group as={Col} md={6} xs={12}>
                  <Form.Label>Send from</Form.Label>
                  <Form.Control value={address.address || ''} disabled />
                </Form.Group>
                <Form.Group as={Col} md={6} xs={12}>
                  <Form.Label>Send to</Form.Label>
                  <Form.Select onChange={(e) => setRecipientAddr(e.target.value)}>
                    <option value={''}>Address</option>
                    {userAddrs.map(address => <option key={address._id} value={address.address || ''}>{address.address || ''}</option>)}
                    {/* <option value={'random'}>Random Address</option> */}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md={6} xs={12}>
                  <Form.Label>
                    UTXO selection
                    <InfoCircle
                      color='#0d6efd'
                      onClick={() => handleInfoClick('utxo')}
                    />
                  </Form.Label>
                  <Form.Select onChange={(e) => setSelectedUtxo(e.target.value)}>
                    <option value={''}>Pick UTXO to spend:</option>
                    {address?.transactions.map(utxo => {
                      return <option key={utxo._id} value={utxo._id}>{(utxo.amount * 1e8).toLocaleString()}</option>
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md={6} xs={12}>
                  <Form.Label>
                    Amount (sats)
                    <InfoCircle
                      color='#0d6efd'
                      onClick={() => handleInfoClick('balance')}
                    />
                  </Form.Label>
                  <Form.Control onChange={(e) => setValue(e.target.value)} placeholder='Sats are whole numbers' type='text' pattern="\d*" />
                  <div className='modal-error-message'>{errors.amount}</div>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md={6} xs={12}>
                  <Form.Label>
                    Fee
                    <InfoCircle
                      color='#0d6efd'
                      onClick={() => handleInfoClick('fee')}
                    />
                  </Form.Label>
                  <Form.Select onChange={(e) => setSelectedFee(e.target.value)}>
                    <option value={''}>Choose fee rate</option>
                    <option value={1}>1 sat/vbyte (slow)</option>
                    <option value={3}>3 sat/vbyte (medium)</option>
                    <option value={5}>5 sat/vbyte (fast)</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md={6} xs={12}>
                  <Form.Label>
                    Network
                    <InfoCircle
                      color='#0d6efd'
                      onClick={() => handleInfoClick('regtest')}
                    />
                  </Form.Label>
                  <Form.Control value={"regtest"} disabled />
                </Form.Group>
              </Row>
            </Form>
            <div className='modal-error-message text-center'>{errors.general}</div>
          </Modal.Body>)
        }
        {
          modalPage === 2 &&
          (<Modal.Body>
            <Form>
              <Row className='tx-info-inputs'>
                {transaction.decodedTx.vin.map((input, index) => {
                  return (
                    <Fragment key={input.txid}>
                      <h5>
                        Input {index + 1}
                        <InfoCircle
                          color='#0d6efd'
                          onClick={() => handleInfoClick('transactionInput')}
                        />
                      </h5>
                      <Form.Group as={Col} md={6}>
                        <Form.Label>
                          Input txid
                          <InfoCircle
                            color='#0d6efd'
                            onClick={() => handleInfoClick('txid')}
                          />
                        </Form.Label>
                        <Form.Control disabled value={input.txid} as='textarea' />
                      </Form.Group>
                      <Form.Group as={Col} md={6}>
                        <Form.Label>
                          Script Sig
                          <InfoCircle
                            color='#0d6efd'
                            onClick={() => handleInfoClick('scriptSig')}
                          />
                        </Form.Label>
                        <Form.Control disabled value={input.scriptSig.asm} as='textarea' />
                      </Form.Group>
                    </Fragment>
                  )
                })}
              </Row>
              {
                transaction.decodedTx.vout.map((output, index) => {
                  return (
                    <div key={output.scriptPubKey + index}>
                      <Row className='tx-info-outputs' >
                        <h5>
                          Output {index + 1}
                          <InfoCircle
                            color='#0d6efd'
                            onClick={() => handleInfoClick('transactionOutput')}
                          />
                        </h5>
                        <Form.Group md={6} as={Col}>
                          <Form.Label>Recieving Address</Form.Label>
                          <Form.Control as='textarea' value={output.scriptPubKey.address} disabled />
                        </Form.Group>
                        <Form.Group md={6} as={Col}>
                          <Form.Label>
                            Amount (sats)
                            <InfoCircle
                              color='#0d6efd'
                              onClick={() => handleInfoClick('balance')}
                            />
                          </Form.Label>
                          <Form.Control value={output.value * 1e8} disabled />
                        </Form.Group>
                        <Form.Group as={Col} md={3}>
                          <Form.Label>
                            Address Type
                            <InfoCircle
                              color='#0d6efd'
                              onClick={() => handleInfoClick('addressType')}
                            />
                          </Form.Label>
                          <Form.Control as='textarea' value={output.scriptPubKey.type} disabled />
                        </Form.Group>
                        <Form.Group as={Col} md={9}>
                          <Form.Label>
                            Locking Script
                            <InfoCircle
                              color='#0d6efd'
                              onClick={() => handleInfoClick('lockingScript')}
                            />
                          </Form.Label>
                          <Form.Control as='textarea' value={output.scriptPubKey.asm} disabled />
                        </Form.Group>
                      </Row>
                    </div>
                  );
                })
              }
              <Form.Group>
                <Form.Label>
                  Raw Transaction
                  <InfoCircle
                    color='#0d6efd'
                    onClick={() => handleInfoClick('rawTransaction')}
                  />
                </Form.Label>
                <Form.Control as='textarea' col='6' value={transaction.hex} disabled />
              </Form.Group>
            </Form>
          </Modal.Body>)
        }
        <Modal.Footer>
          {modalPage === 1 && <Button onClick={handleTxCreate}>Create</Button>}
          {modalPage === 2 && (<>
            <Button onClick={() => setModalPage(1)}>Back</Button>
            <Button onClick={() => handleBroadcast()}>Broadcast Tx</Button>
            <InfoCircle
              color='#0d6efd'
              onClick={() => handleInfoClick('broadcastTransaction')}
            />
          </>)}
        </Modal.Footer>
      </Modal>
      <ToastContainer position={'top-center'}>
        <Toast
          onClose={() => setToastShow(false)}
          show={toastShow}
          delay={5000}
          autohide
          bg='dark'
        >
          <Toast.Header className='justify-content-between'>
            {
              broadcasted.error &&
              <div className='broadcast-error'>Failed to Broadcast tx</div>
            }
            {
              broadcasted.txid &&
              "Transaction successfully broadcast"
            }
          </Toast.Header>
          <Toast.Body>
            {broadcasted.error ?
              <div >{broadcasted.error}</div> :
              (<>
                <div><strong>txid:</strong>  {broadcasted.txid}</div>
                <div><strong>Amount:</strong> {broadcasted.value} sats</div>
              </>)
            }
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default CreateTxModal;
