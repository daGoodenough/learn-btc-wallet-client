import { Table, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import KeyInfoModal from '../keys/KeyInfoModal';

const WalletKeyList = ({ keyIds }) => {
  const userKeys = useSelector(state => state.keys);
  const addrKeys = keyIds?.map(keyId => userKeys.find(key => key._id === keyId));
  const [modalShow, setModalShow] = useState(false);

  if (!addrKeys || addrKeys.length === 0) {
    return (<>No Keys</>)
  };
  return (
    <>
      <Col>
        <Table variant='dark' borderless hover>
          <tbody>
            {addrKeys.map(key => {
              return (
                <tr
                  className='d-flex justify-content-between'
                  key={key._id}
                  onClick={() => setModalShow(!modalShow)}
                >
                  <td className='key-name'>
                    <div>
                      {key.keyName}
                    </div>
                  </td>
                  <td>
                    <div className='pub-key'>
                      {key.publicKey}
                    </div>
                    <div className='sub-descriptor'>Pub Key</div>
                  </td>
                  <KeyInfoModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    keyPair={key}
                    key={key._id}
                  />
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Col>
    </>
  );
}

export default WalletKeyList;
