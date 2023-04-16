import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
      <Navbar collapseOnSelect expand="lg" bg="warning" variant="dark">
      <Container>
        <Navbar.Brand ><Link className='fs-3 fw-bold text-decoration-none text-white' to="/">Learning Validation</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link ><Link className='text-decoration-none fs-5 text-white fw-semibold' to="/">Home</Link></Nav.Link>
            <Nav.Link ><Link className='text-decoration-none fs-5 text-white fw-semibold' to="/user">Users</Link></Nav.Link>
            <Nav.Link ><Link className='text-decoration-none fs-5 text-white fw-semibold' to="/admin">Admin</Link></Nav.Link>
           
          </Nav>
          <Nav>
            <Nav.Link ><Link to="/register"><button className='btn btn-primary'>Register</button></Link></Nav.Link>
            <Nav.Link >
              <Link to="/login"><button className='btn btn-success'>Login</button></Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
};

export default Header;