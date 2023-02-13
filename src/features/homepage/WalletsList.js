import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const WalletsList = () => {
  const navigate = useNavigate();
  const { wallets } = useSelector(state => state);

  if(!wallets || wallets.length === 0) {
    return <h5 className='text-center'>No addresses... create one to get started</h5>
  }

  const handleWalletClick = (walletId) => {
    console.log(walletId)
    navigate(`/wallet/${walletId}`)
  }

  return (
    <>
      <Table variant='dark' hover responsive>
        <tbody>
          {wallets.map((wallet) => {
            return (
              <tr key={wallet._id} onClick={() => handleWalletClick(wallet._id)}>
                <td className='address-name'>{wallet.walletName || 'name'}</td>
                <td>{wallet.address}</td>
                <td className='address-type'>{wallet.type}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default WalletsList;
