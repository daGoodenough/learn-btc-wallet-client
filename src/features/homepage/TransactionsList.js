import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { useState } from 'react';

const TransactionsList = () => {
  const {wallets} = useSelector(state => state);

  if (!wallets || wallets.length === 0) {
    return <h5 className='text-center'>Create a wallet to get started</h5>
  };

  const txes = wallets.reduce((txArray, wallet) => {
    wallet.transactions.forEach(tx => txArray.push(tx))
    return txArray;
  }, []);

  if(!txes || txes.length === 0) {
    return <h5 className='text-center'>No Transactions... select a wallet to create a transaction</h5>
  }

  return (
    <>
      <Table responsive>
        <tbody>
          {txes.map(tx => {
            return (
              <tr>
                <td>{tx.status}</td>
                <td>{tx.recipient}</td>
                <td>{tx.value}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TransactionsList;
