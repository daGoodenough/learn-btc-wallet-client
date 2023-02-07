import { Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import CreateKeyModal from '../keys/CreateKeyModal';
import CreateWalletModal from '../wallets/CreateWalletModal';

const ButtonsCreate = () => {
  const [addrModalShow, setAddrModalShow] = useState(false);
  const [keyModalShow, setKeyModalShow] = useState(false);

  return (
    <>
      <Row className='justify-content-around'>
        <Button
          onClick={() => setAddrModalShow(true)}
          md={1} xs={5}
          className='btn-create'
          as={Col}
        >
          + Address
        </Button>
        <Button
          onClick={() => setKeyModalShow(true)}
          md={1} xs={5}
          className='btn-create'
          as={Col}
        >
          + Key
        </Button>
      </Row>
      <CreateKeyModal
        show={keyModalShow}
        onHide={() => setKeyModalShow(false)}
      />
      <CreateWalletModal
        show={addrModalShow}
        onHide={() => setAddrModalShow(false)}
      />
    </>
  );
}

export default ButtonsCreate;
