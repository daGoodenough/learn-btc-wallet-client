import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { signout } from '../features/auth/authSlice';
import KeyInfoModal from '../features/keys/KeyInfoModal';
import CreateKeyModal from '../features/keys/CreateKeyModal';
import CreateWalletModal from '../features/wallets/CreateWalletModal';

const TopNav = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);
  const { keys, wallets } = useSelector((state) => state);
  const [keyCreateModalShow, setKeyCreateModalShow] = useState(false);
  const [keyInfoModalShow, setKeyInfoModalShow] = useState(false);
  const [walletCreateModalShow, setWalletCreateModalShow] = useState(false);
  const [selectedKey, setSelectedKey] = useState({});

  const handleSignout = () => {
    dispatch(signout())
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
          <Navbar.Brand href="#home">Learn BTC Wallet</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse className='justify-content-end'>
            {
              username ? (
                <>
                  <NavDropdown menuVariant='dark' title="Keys">
                    {keys.map(key => {
                      return <NavDropdown.Item onClick={() => handleKeyClick(key)}>{key.keyName}</NavDropdown.Item>
                    })}
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => setKeyCreateModalShow(true)}
                    >
                      + Create Key
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown menuVariant='dark' title="Addresses">
                    {wallets.map(wallet => {
                      return (
                        <NavDropdown.Item
                          as={Link}
                          to={`wallet/${wallet._id}`}
                        >
                          {wallet.address}
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
