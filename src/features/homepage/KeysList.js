import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import KeyInfoModal from '../keys/KeyInfoModal';

const KeysList = () => {
  const { keys } = useSelector(state => state);
  const [modalShow, setModalShow] = useState(false);
  const [selectedKey, setSelectedKey] = useState({});

  const handleKeyClick = (key) => {
    setModalShow(!modalShow);
    setSelectedKey(key);
  };

  const handleModalHide = () => {
    setModalShow(false);
    setSelectedKey({});
  };

  if (!keys || keys.length === 0) {
    return <h5 className='text-center'>No keys... create one to get started</h5>
  }

  return (
    <Table responsive>
      <tbody>
        {keys.map(key => {
          return (
            <>
              <tr onClick={() => handleKeyClick(key)}>
                <td className='key-name'>{key.keyName}</td>
                <td>{key.publicKey}</td>
              </tr>
                <KeyInfoModal
                  show={modalShow}
                  onHide={handleModalHide}
                  keyPair={selectedKey}
                  key={key._id}
                />
            </>
          )
        })}
      </tbody>
    </Table>
  );
}

export default KeysList;
