import { useSelector } from "react-redux";

import KeysListItem from './KeysListItem';

const KeysList = () => {
  const { keys } = useSelector((state) => state);

  if (keys) {
    const keyListItems = keys.map((key) => {
      return <KeysListItem key={key.id} keyId={key.id} keyPair={key}/>
    });

    return (
      <>
        {keyListItems}
        <KeysListItem key={0} placeholder/>
      </>
    )
  };

  return (
    <>
      <KeysListItem key={0} placeholder/>
    </>
  );
}

export default KeysList;