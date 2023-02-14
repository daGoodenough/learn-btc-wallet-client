import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { InfoCircle } from 'react-bootstrap-icons';
import { changeLearnModal } from '../learn/learnSlice';

const FeaturesNav = ({ activeTab, changeNavTab }) => {
  const dispatch = useDispatch();

  const handleInfoClick = (topic) => {
    dispatch(changeLearnModal({ modalShow: true, topic }));
  };

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
          Addresses <InfoCircle
            color='#0d6efd'
            onClick={() => handleInfoClick('address')}
          />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className='feature-nav' eventKey='keys'>
          Keys
          <InfoCircle
            color='#0d6efd'
            onClick={() => handleInfoClick('key')}
          />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className='feature-nav' eventKey='transactions'>
          Transactions
          <InfoCircle
            color='#0d6efd'
            onClick={() => handleInfoClick('transaction')}
          />
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default FeaturesNav;
