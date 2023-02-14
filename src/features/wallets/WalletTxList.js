import { Col, Table } from 'react-bootstrap';
import { Fragment, useState } from 'react';

import TxInfoModal from '../transactions/TxInfoModal';

const WalletTxList = ({ transactions, handleInfoClick }) => {
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
        <Table variant='dark' borderless hover responsive>
          <tbody>
            {transactions.map(transaction => {
              return (
                <Fragment key={transaction._id}>
                  <tr
                    className='d-flex justify-content-between'
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
                </Fragment>
              )
            })}
          </tbody>
            <TxInfoModal
              show={modalShow}
              onHide={handleModalHide}
              tx={selectedTx}
              key={'tx'}
              handleInfoClick={handleInfoClick}
            />
        </Table>
      </Col>
    </>
  );
}

export default WalletTxList;
