import { Navbar, Container, Nav, NavDropdown, Offcanvas } from 'react-bootstrap';
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
    <Navbar variant="dark" expand="xs" collapseOnSelect>
      <Container>
        <div>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Brand href="#home">Learn BTC Wallet</Navbar.Brand>
        </div>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-sm`}
          aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown
                title="Dropdown"
                id={`offcanvasNavbarDropdown-expand-sm`}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
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
