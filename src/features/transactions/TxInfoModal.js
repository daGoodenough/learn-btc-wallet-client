import { Modal, Row, Form, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { fetchDecodedTx } from '../../utils/bitcoind/rawTransactions';

const TxInfoModal = (props) => {
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const decoded = await fetchDecodedTx(props.tx.txid);
        if (decoded) {
          setTransaction(decoded);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTx();
  }, [props.tx]);

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {
        Object.keys(transaction).length === 0 ?
          (
            <Modal.Body>
              Could not find transaction
            </Modal.Body>
          ) :
          (
            <><Modal.Header closeButton closeVariant='white'>
              <Modal.Title id="contained-modal-title-vcenter">
                {transaction?.txid}
              </Modal.Title>
            </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Form.Group as={Col} md={4} xs={6}>
                      <Form.Label>Block Height</Form.Label>
                      <Form.Control value={transaction.blockheight}/>
                    </Form.Group>
                    <Form.Group as={Col} md={4} xs={6}>
                      <Form.Label>Confrimations</Form.Label>
                      <Form.Control value={transaction.confirmations}/>
                    </Form.Group>
                    <Form.Group as={Col} md={4} xs={6}>
                      <Form.Label>Virtual Size</Form.Label>
                      <Form.Control value={transaction.decoded.vsize}/>
                    </Form.Group>
                  </Row>
                  <Row className='tx-info-inputs'>
                    {transaction.decoded.vin.map((input, index) => {
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
                    transaction.decoded.vout.map((output, index) => {
                      return (
                        <>
                          <Row className='tx-info-outputs'>
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
              </Modal.Body>
              <Modal.Footer className='justify-content-around'>
                Click on any field to learn more.
              </Modal.Footer>
            </>
            )};
    </Modal >
  );
}

export default TxInfoModal;
