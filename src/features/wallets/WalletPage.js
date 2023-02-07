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

  const handleFundClick = () => {
    dispatch(fundWallet(wallet.address))
  }

  return (
    <Container className='mt-5 wallet-container'>
      <Row>
        <Col md={6} sm={12}>
          <h3>Wallet name: {wallet.balance || '0 Satoshis'}</h3>
        </Col>
        <Col md={6} sm={12}>
          <h4 className='wallet-page-address'>{wallet?.address}</h4>
          <div className='sub-descriptor'>Address</div>
        </Col>
      </Row>
      <Row>
        <div>Keys:</div>
        {wallet?.keys ? <WalletKeyList keyIds={wallet.keys} /> : <div>No Keys</div>}
      </Row>
      <Row xs="auto" className='justify-content-between'>
        <Col>
          <Button>Create Transaction</Button>
        </Col>
        <Col>
          <Button onClick={handleFundClick}>Fund Wallet</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default WalletPage;
