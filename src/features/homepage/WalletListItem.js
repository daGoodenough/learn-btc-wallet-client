

const WalletListItem = ({wallet}) => {
  return (
    <tr>
      <td>{wallet.address}</td>
      <td>{wallet.keys.map(key => key)}</td>
      <td>{wallet.type}</td>
    </tr>
  );
}

export default WalletListItem;
