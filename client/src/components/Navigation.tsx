import React from 'react'
import { Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const Navigation: React.FC = () => (
  <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
    <Navbar.Brand href="/">Fymate.co</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link href="/addpost">Add Post</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="/login">Log in </Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)