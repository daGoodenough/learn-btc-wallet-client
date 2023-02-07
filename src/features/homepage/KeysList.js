import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import KeyInfoModal from '../keys/KeyInfoModal';

const KeysList = () => {
  const { keys } = useSelector(state => state);
  const [modalShow, setModalShow] = useState(false);

  if (!keys) {
    return <div>No Keys</div>
  }

  return (
    <Table responsive>
      <tbody>
        {keys.map(key => {
          return (
            <tr onClick={() => setModalShow(!modalShow)}>
              <td>{key.keyName}</td>
              <td>{key.publicKey}</td>
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
  );
}

export default KeysList;
