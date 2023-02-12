import { Table, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import KeyInfoModal from '../keys/KeyInfoModal';

const WalletKeyList = ({ keyIds }) => {
  const userKeys = useSelector(state => state.keys);

  const addrKeys = keyIds?.reduce((keys, keyId) => {
    const addrKey = userKeys.find(key => key._id === keyId);
    if (!addrKey) {
      return keys;
    };
    keys.push(addrKey);
    return keys;
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [selectedKey, setSelectedKey] = useState({});

  if (!addrKeys || addrKeys.length === 0) {
    return <h5 className='text-center'>No keys available</h5>
  };

  const handleKeyClick = (key) => {
    setModalShow(!modalShow);
    setSelectedKey(key);
  };

  const handleModalHide = () => {
    setModalShow(false);
    setSelectedKey({});
  };

  return (
    <>
      <Col>
        <Table variant='dark' borderless hover>
          <tbody>
            {addrKeys.map(key => {
              return (
                <>
                  <tr
                    className='d-flex justify-content-between'
                    key={key._id}
                    onClick={() => handleKeyClick(key)}
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
                  </tr>
                </>
              )
            })}
          </tbody>
          <KeyInfoModal
            show={modalShow}
            onHide={handleModalHide}
            keyPair={selectedKey}
          />
        </Table>
      </Col>
    </>
  );
}

export default WalletKeyList;
