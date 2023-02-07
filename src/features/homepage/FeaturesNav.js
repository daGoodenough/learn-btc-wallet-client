import { Nav } from 'react-bootstrap';
import { useState } from 'react';

const FeaturesNav = ({activeTab, changeNavTab}) => {
  return (
    <Nav
      justify
      variant='tabs'
      className="justify-content-center"
      activeKey={activeTab}
      onSelect={(selectedKey) => changeNavTab(selectedKey)}
    >
      <Nav.Item>
        <Nav.Link eventKey='addresses'>
          Addresses
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='keys'>
          Keys
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey='transactions'>
          Transactions
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default FeaturesNav;
