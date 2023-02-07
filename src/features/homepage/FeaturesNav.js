import { Nav } from 'react-bootstrap';
import { useState } from 'react';

const FeaturesNav = ({activeTab, changeNavTab}) => {
  return (
    <Nav
      justify
      variant='tabs'
      className="justify-content-center mb-3 mt-3"
      activeKey={activeTab}
      onSelect={(selectedKey) => changeNavTab(selectedKey)}
    >
      <Nav.Item>
        <Nav.Link className='feature-nav' eventKey='addresses'>
          Addresses
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className='feature-nav' eventKey='keys'>
          Keys
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className='feature-nav' eventKey='transactions'>
          Transactions
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default FeaturesNav;
