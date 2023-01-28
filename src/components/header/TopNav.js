import { Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

const TopNav = () => {
  return (
    <Navbar variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="#home">Learn BTC Wallet</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='' id="basic-navbar-nav">
          <Nav className="me-auto navbar-right">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">+Key</Nav.Link>
            <Nav.Link href="#link">+Wallet</Nav.Link>
            <Nav.Link href="#link">+Transaction</Nav.Link>
            <NavDropdown title="Username" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Keys</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                TX History
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Wallets</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Signout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;
