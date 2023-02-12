import { Container, Button, Row, Col, ToastContainer, Toast } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useState } from 'react';

import { fundWallet } from './walletSlice';
import WalletKeyList from './WalletKeyList';
import WalletTxList from './WalletTxList';
import CreateTxModal from '../transactions/CreateTxModal';

const WalletPage = () => {
  const dispatch = useDispatch();
  const { walletId } = useParams();
  const { wallets } = useSelector(state => state);
  const wallet = wallets.find(wallet => wallet._id === walletId);
  const [modalShow, setModalShow] = useState(false)
  const [toastMessage, setToastMessage] = useState({newBalance: null, error: null});
  const [toastShow, setToastShow] = useState(false);

  if (!wallet) {
    return <h2 className='text-center'>Wallet not found...</h2>
  }

  const handleFundClick = async () => {
    dispatch(fundWallet(wallet._id,
      (newBalance, error) => {
          setToastMessage({newBalance, error})
          setToastShow(true);
      }
    ));
  }

  return (
    <>
    <Container className='mt-2 wallet-container'>
      <Row className='text-center'>
        <h3>{wallet.walletName || 'Address Name'}</h3>
      </Row>
      <Row className='mt-3'>
        <Col xs={8}>
          <div className='wallet-page-address-container'>
            <div className='sub-descriptor'>Address</div>
            <h4 className='wallet-page-address'>{wallet?.address}</h4>
          </div>
        </Col>
        <Col xs={4}>
          <div className='wallet-balance'>
            {(wallet.balance * 1e8).toLocaleString()} sats
          </div>
        </Col>
      </Row>
      <Row xs="auto" className='justify-content-between mt-2'>
        <Col>
          <Button onClick={() => setModalShow(true)}>Create Transaction</Button>
        </Col>
        <Col>
          <Button onClick={handleFundClick}>Fund Address</Button>
        </Col>
      </Row>
      <Row>
        <div className='section-title'>Keys</div>
        <div className='section-subtitle'>Key pairs used in this address</div>
        {wallet?.keys ? <WalletKeyList keyIds={wallet.keys} /> : <div>No Keys</div>}
      </Row>

      <Row>
        <div className='section-title'>UTXOs</div>
        <div className='section-subtitle'>Unspent transactions to this address</div>
        {wallet?.transactions ? <WalletTxList transactions={wallet.transactions} /> : <div>No Keys</div>}
      </Row>
      <CreateTxModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        address={wallet}
      />
    </Container>
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
              toastMessage.error &&
              <div className='broadcast-error'>Failed to fund wallet</div>
            }
            {
              toastMessage.newBalance && 
              "Wallet Funded & 1 Block Mined"
            }
          </Toast.Header>
          <Toast.Body>
            {toastMessage.error ?
              <div >{toastMessage.error.response.data}</div> :
              (<>
                <div><strong>New Balance: </strong>  {(toastMessage.newBalance * 1e8).toLocaleString()} sats</div>
                <div><strong>Previous Balance:</strong> {(toastMessage.newBalance * 1e8 - 1e8).toLocaleString()} sats</div>
              </>)
            }
          </Toast.Body>
        </Toast>
      </ToastContainer>
      </>
  );
}

export default WalletPage;
