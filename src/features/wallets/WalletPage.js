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
      <Row className='text-center'>
        <h3>Address name</h3>
      </Row>
      <Row className='mt-5'>
        <Col md={6} sm={12}>
          <div className='wallet-page-address-container'>
            <h4 className='wallet-page-address'>{wallet?.address}</h4>
            <div className='sub-descriptor'>Address</div>
          </div>
        </Col>
        <Col md={6} sm={12}>
          <div className='wallet-balance'>
            {wallet.balance || '0 Satoshis'}

          </div>
        </Col>
      </Row>
      <Row>
        <div className='section-title'>Keys</div>
        <div className='section-subtitle'>Key pairs used in this address</div>
        {wallet?.keys ? <WalletKeyList keyIds={wallet.keys} /> : <div>No Keys</div>}
      </Row>
      <Row xs="auto" className='justify-content-between'>
        <Col>
          <Button>Create Transaction</Button>
        </Col>
        <Col>
          <Button onClick={handleFundClick}>Fund Address</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default WalletPage;
