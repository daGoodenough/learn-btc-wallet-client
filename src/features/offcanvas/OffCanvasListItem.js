import { useSelector } from "react-redux";
import { useState } from 'react';
import { NavDropdown } from "react-bootstrap";

import CreateKeyModal from '../keys/CreateKeyModal';
import CreateWalletModal from '../wallets/CreateWalletModal';

const OffCanvasListItem = ({ item, itemType, placeholder }) => {
  const [modalShow, setModalShow] = useState(false)

  if (placeholder) {
    return (
      <>
        <button className="offcanvas-list-item" onClick={() => setModalShow(true)}>+ Create a {itemType}</button>
        {itemType === 'key' &&
          <CreateKeyModal
            key={itemType}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        }
        {
          itemType === 'wallet' &&
          <CreateWalletModal
            key={itemType}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        }
      </>
    )
  };

  const itemName = item.address || item.keyName

  return (
    <NavDropdown.Item >{itemName}</NavDropdown.Item>
  );
}

export default OffCanvasListItem;

