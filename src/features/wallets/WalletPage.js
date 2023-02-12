import { Container, Button, Row, Col } from 'react-bootstrap';
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

  if(!wallet) {
    return <h2 className='text-center'>Wallet not found...</h2>
  }

  const handleFundClick = () => {
    dispatch(fundWallet(wallet._id))
  }

  return (
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
  );
}

export default WalletPage;
