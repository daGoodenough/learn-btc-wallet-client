import { useSelector } from "react-redux";

import OffCanvasListItem from './OffCanvasListItem';

const OffCanvasList = ({ listType }) => {
  const { wallets } = useSelector((state) => state);
  const { keys } = useSelector((state) => state);

  const mapItemsToList = (items) => {
    if (items) {
      return items.map((item) => {
        return <OffCanvasListItem key={item._id} item={item} itemType={listType}/>;
      });
    };
    return null;
  }

  let listItems;
  if (listType === 'wallet') {
    listItems = mapItemsToList(wallets);
  };
  if (listType === 'key') {
    listItems = mapItemsToList(keys);
  };

  return (
    <>
      {listItems}
      <OffCanvasListItem itemType={listType} key={listType} placeholder={true} />
    </>
  );
}

export default OffCanvasList;