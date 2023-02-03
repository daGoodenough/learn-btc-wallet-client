import { useSelector } from "react-redux";

const OffCanvasListItem = ({ item, itemType, placeholder }) => {
  console.log(item, placeholder);
  if(placeholder) {
    return (
      <button className="offcanvas-list-item">+ Create a {itemType}</button>
    )
  };

  const itemName = item.address || item.keyName

  return (
    <button className="offcanvas-list-item">{itemName}</button>
  );
}

export default OffCanvasListItem;

