import React from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'

export const Navigation: React.FC = () => (
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <NavItem>
        {' '}
        <Link className="nav-link" to="/">
          Home
        </Link>{' '}
      </NavItem>
      <NavItem>
        {' '}
        <Link className="nav-link" to="/about">
          About
        </Link>{' '}
      </NavItem>
      <NavItem>
        {' '}
        <Link className="nav-link" to="/register">
          Register
        </Link>{' '}
      </NavItem>
      <NavItem>
        {' '}
        <Link className="nav-link" to="/profile">
          Profile
        </Link>{' '}
      </NavItem>
    </Nav>
  </Navbar>
)
