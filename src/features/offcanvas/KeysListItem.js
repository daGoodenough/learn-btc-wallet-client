import { useSelector } from "react-redux";

const KeysListItem = ({ keyId, keyPair, placeholder }) => {
  const keyName = keyPair?.keyName || "+ Create a Key Pair";

  return (
    <button className="key-list-item">{keyName}</button>
  );
}

export default KeysListItem;

