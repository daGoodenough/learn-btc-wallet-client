import {Table} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import WalletListItem from './WalletListItem';

const WalletsList = () => {
  const {wallets} = useSelector(state => state);
  console.log(wallets);
  const walletListItems = wallets.map(wallet => {
    return <WalletListItem key={wallet._id} wallet={wallet}/>
  })

  return (
    <>
    <h3>Wallets</h3>
    <Table>
      <tbody>
      {walletListItems}
      </tbody>
    </Table>
    </>
  );
}

export default WalletsList;
