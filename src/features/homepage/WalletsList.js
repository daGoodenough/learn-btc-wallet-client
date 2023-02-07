import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const WalletsList = () => {
  const navigate = useNavigate();
  const { wallets } = useSelector(state => state);

  const handleWalletClick = (walletId) => {
    console.log(walletId)
    navigate(`/wallet/${walletId}`)
  }

  return (
    <>
      <h3>Wallets</h3>
      <Table variant='dark' hover responsive>
        <tbody>
          {wallets.map(wallet => {
            return (
              <tr onClick={() => handleWalletClick(wallet._id)}>
                <td>{wallet.address}</td>
                <td>{wallet.keys.map(key => key)}</td>
                <td>{wallet.type}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default WalletsList;
