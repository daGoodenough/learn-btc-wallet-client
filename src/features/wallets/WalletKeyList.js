import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const WalletKeyList = ({ keyIds }) => {
  const userKeys = useSelector(state => state.keys);
  const addrKeys = keyIds?.map(keyId => userKeys.find(key => key._id === keyId));

  if (!addrKeys || addrKeys.length === 0) {
    return (<></>)
  };
  return (
    <Table borderless responsive>
      <tbody >
        {addrKeys.map(key => {
          console.log(key)
          return (
            <tr className='d-flex justify-content-between' key={key._id}>
              <td>{key.keyName}</td>
              <td>
                <div className='pub-key-td'>Pub Key</div>
                {key.publicKey}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  );
}

export default WalletKeyList;
