import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { signout } from '../features/auth/authSlice';
import KeyInfoModal from '../features/keys/KeyInfoModal';
import CreateKeyModal from '../features/keys/CreateKeyModal';
import CreateWalletModal from '../features/wallets/CreateWalletModal';
import { changeLearnModal } from '../features/learn/learnSlice';

const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth);
  const { keys, wallets } = useSelector((state) => state);
  const [keyCreateModalShow, setKeyCreateModalShow] = useState(false);
  const [keyInfoModalShow, setKeyInfoModalShow] = useState(false);
  const [walletCreateModalShow, setWalletCreateModalShow] = useState(false);
  const [selectedKey, setSelectedKey] = useState({});

  const handleSignout = () => {
    dispatch(signout());
    navigate('/');
    window.location.reload();
  }

  const handleKeyInfoModalHide = () => {
    setKeyInfoModalShow(false);
    setSelectedKey({});
  }

  const handleKeyClick = (key) => {
    setSelectedKey(key);
    setKeyInfoModalShow(true);
  }

  return (
    <>
      <Navbar variant="dark" expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to={'/'}>Learn BTC Wallet</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className='justify-content-end'>
              <Nav.Item className='nav-learn' as={Link} to={'/learn'}>Learn</Nav.Item>
              <NavDropdown  menuVariant='dark' title='Guides'>
                <NavDropdown.Item onClick={() => dispatch(changeLearnModal({modalShow: true, topic: 'intro'}))}>Getting Started</NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch(changeLearnModal({modalShow: true, topic: 'step2'}))}>Step 2</NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch(changeLearnModal({modalShow: true, topic: 'step3'}))}>Step 3</NavDropdown.Item>

              </NavDropdown>
            {
              username ? (
                <>
                  <NavDropdown menuVariant='dark' title="Keys">
                    {keys.map((key, index) => {
                      return <NavDropdown.Item key={index} onClick={() => handleKeyClick(key)}>{key.keyName}</NavDropdown.Item>
                    })}
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => setKeyCreateModalShow(true)}
                    >
                      + Create Key
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown menuVariant='dark' title="Addresses">
                    {wallets.map((wallet, index) => {
                      return (
                        <NavDropdown.Item
                          as={Link}
                          to={`wallet/${wallet._id}`}
                          key={index}
                        >
                          {wallet.walletName || 'Address Name'}
                        </NavDropdown.Item>
                      );
                    })}
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => setWalletCreateModalShow(true)}
                    >
                      + Create Address
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown menuVariant='dark' title={username} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={handleSignout}>
                      Signout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <CreateKeyModal
                    show={keyCreateModalShow}
                    onHide={() => setKeyCreateModalShow(false)}
                  />
                  <CreateWalletModal
                    show={walletCreateModalShow}
                    onHide={() => setWalletCreateModalShow(false)}
                  />
                  <KeyInfoModal
                    show={keyInfoModalShow}
                    onHide={() => handleKeyInfoModalHide()}
                    keyPair={selectedKey}
                  />
                </>
              ) : (
                <Nav>
                  <Nav.Link className="nav-login" as={Link} to={'/login'}>Login</Nav.Link>
                </Nav>
              )
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNav;
