import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { useState } from 'react';

const TransactionsList = () => {
  const {wallets} = useSelector(state => state);
  const txes = wallets.reduce((txArray, wallet) => {
    wallet.transactions.forEach(tx => txArray.push(tx))
    return txArray;
  }, []);

  if (!wallets || wallets.length === 0) {
    return <div>Create a wallet to get started</div>
  }

  if(!txes || txes.length === 0) {
    return <div>No Transactions... select a wallet to create a transaction</div>
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
