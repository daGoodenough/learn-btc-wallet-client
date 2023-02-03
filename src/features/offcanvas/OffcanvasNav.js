import { Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';

import OffCanvasList from './OffCanvasList';

const OffcanvasNav = () => {
  return (
    <>
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
            <Nav.Link href="#action2">Keys</Nav.Link>
            <OffCanvasList listType={"key"} />
            <Nav.Link>Wallets</Nav.Link>
            <OffCanvasList listType={"wallet"} />
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </>
  );
}

export default OffcanvasNav;
