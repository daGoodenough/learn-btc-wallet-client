import { Col, Table } from 'react-bootstrap';
import { useState } from 'react';

import TxInfoModal from '../transactions/TxInfoModal';

const WalletTxList = ({ transactions }) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedTx, setSelectedTx] = useState({});

  const handleTxClick = (key) => {
    setModalShow(!modalShow);
    setSelectedTx(key);
  };

  const handleModalHide = () => {
    setModalShow(false);
    setSelectedTx({});
  };

  return (
    <>
      <Col>
        <Table variant='dark' borderless hover>
          <tbody>
            {transactions.map(transaction => {
              return (
                <>
                  <tr
                    className='d-flex justify-content-between'
                    key={transaction._id}
                    onClick={() => handleTxClick(transaction)}
                  >
                    <td>
                      <div>
                        {transaction.txid}
                      </div>
                    </td>
                    <td>
                      <div>
                        {transaction.amount}
                      </div>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
            <TxInfoModal
              show={modalShow}
              onHide={handleModalHide}
              tx={selectedTx}
              key={'tx'}
            />
        </Table>
      </Col>
    </>
  );
}

export default WalletTxList;
