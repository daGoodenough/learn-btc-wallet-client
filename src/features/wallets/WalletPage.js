import { Container, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import { fundWallet } from './walletSlice';
import WalletKeyList from './WalletKeyList';

const WalletPage = () => {
  const dispatch = useDispatch();
  const { walletId } = useParams();
  const { wallets } = useSelector(state => state);
  const wallet = wallets.find(wallet => wallet._id === walletId);

  if(!wallet) {
    return <h2 className='text-center'>Wallet not found...</h2>
  }

  const handleFundClick = () => {
    dispatch(fundWallet(wallet.address))
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
            {'0'} sats
          </div>
        </Col>
      </Row>
      <Row xs="auto" className='justify-content-between mt-2'>
        <Col>
          <Button>Create Transaction</Button>
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
        <div className='section-title'>Transactions</div>
        <div className='section-subtitle'>UTXOs associated with address</div>
        {wallet?.keys ? <WalletKeyList keyIds={wallet.keys} /> : <div>No Keys</div>}
      </Row>
    </Container>
  );
}

export default WalletPage;
