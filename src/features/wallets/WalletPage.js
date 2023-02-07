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
          <h3>Wallet name</h3>
        </Col>
        <Col md={6} sm={12}>
          <h4>{wallet?.address}</h4>
        </Col>
      </Row>
      <Row>
        <div>Keys:</div>
        <WalletKeyList keyIds={wallet?.keys}/>
      </Row>
      <Button>Create Transaction</Button>
      <Button onClick={handleFundClick}>Fund Wallet</Button>
    </Container>
  );
}

export default WalletPage;
