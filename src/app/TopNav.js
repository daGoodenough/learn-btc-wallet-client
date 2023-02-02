import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signout } from '../features/auth/authSlice';

const TopNav = () => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);

  const handleSignout = () => {
    dispatch(signout())
  }

  return (
    <Navbar variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="#home">Learn BTC Wallet</Navbar.Brand>
        {
          username ? (
            <NavDropdown title={username} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Keys</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                TX History
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Wallets</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignout}>
                Signout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav>
              <Nav.Link className="nav-login" as={Link} to={'/login'}>Login</Nav.Link>
            </Nav>
          )
        }
      </Container>
    </Navbar>
  );
}

export default TopNav;
