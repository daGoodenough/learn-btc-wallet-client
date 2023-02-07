import { Table, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const WalletKeyList = ({ keyIds }) => {
  const userKeys = useSelector(state => state.keys);
  const addrKeys = keyIds?.map(keyId => userKeys.find(key => key._id === keyId));

  if (!addrKeys || addrKeys.length === 0) {
    return (<></>)
  };
  return (
    <Col>
    <Table variant='dark' borderless>
      <tbody>
        {addrKeys.map(key => {
          console.log(key)
          return (
            <tr className='d-flex justify-content-between' key={key._id}>
              <td className='key-name'>
                <div>
                  {key.keyName}
                </div>
              </td>
              <td>
                <div className='pub-key'>
                  {key.publicKey}
                </div>
                <div className='sub-descriptor'>Pub Key</div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    </Col>
  );
}

export default WalletKeyList;
