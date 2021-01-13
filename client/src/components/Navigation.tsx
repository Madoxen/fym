import React from 'react'
import { Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

export const Navigation: React.FC = () => (
  <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
    <Navbar.Brand><Link to="/" >Fymate.co</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Link className="nav-link" to="/" >Home</Link>
        <Link className="nav-link" to="/profile">Profile</Link>
        <Link className="nav-link" to="/addpost">Add Post</Link>
      </Nav>
      <Nav>
        <Link className="nav-link" to="/login">Log in </Link>
        <Link className="nav-link" to="/register">Register</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)