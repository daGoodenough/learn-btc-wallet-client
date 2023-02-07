

const WalletListItem = ({wallet, navigate}) => {
  return (
    <tr onClick={() => navigate(wallet._id)}>
      <td>{wallet.address}</td>
      <td>{wallet.keys.map(key => key)}</td>
      <td>{wallet.type}</td>
    </tr>
  );
}

export default WalletListItem;
