import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import WalletListItem from './WalletListItem';

const WalletsList = () => {
  const navigate = useNavigate();
  const { wallets } = useSelector(state => state);

  const handleWalletClick = (walletId) => {
    console.log(walletId)
    navigate(`/wallet/${walletId}`)
  }

  const walletListItems = wallets.map(wallet => {
    return (
      <WalletListItem
        navigate={handleWalletClick}
        key={wallet._id}
        wallet={wallet}
      />
    );
  })

  return (
    <>
      <h3>Wallets</h3>
      <Table hover>
        <tbody>
          {walletListItems}
        </tbody>
      </Table>
    </>
  );
}

export default WalletsList;
