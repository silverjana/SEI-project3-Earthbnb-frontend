import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { NavDropdown } from "react-bootstrap"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Navbar classname="navbar-container">
      <Container>
        <Navbar.Brand as={Link} to='/' classname="brand">Earth BnB</Navbar.Brand>
        <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/allproperties'>All Properties</Nav.Link>
            <NavDropdown title="dropdown" className="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to='/login'>Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/register'>Register</NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/userprofile'>Profile Page</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
