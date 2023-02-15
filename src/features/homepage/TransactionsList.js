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
console.log(txes);
  return (
    <>
      <Table responsive>
        <tbody>
          {txes.map(tx => {
            return (
              <tr>
                <td>
                  <div>{tx.txid}</div>
                  <div className="sub-descriptor home-txid">txid</div>
                  </td>
                <td>{(tx.amount * 1e8).toLocaleString()} sats</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TransactionsList;
