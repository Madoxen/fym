import React, { useState, useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAccessToken } from '../features/auth/selectors'

export const Navigation: React.FC = () => {
  const [isLogin, setIsLogin] = useState<string>("")
  const acc = useSelector(getAccessToken)
  useEffect(() => {
    setIsLogin(acc)
  }, [acc])

  return (
    <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
      <Navbar.Brand><Link to="/" >Fymate.co</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/" >Home</Link>
          {isLogin === "" ? null : <Link className="nav-link" to="/profile">Profile</Link>}
          {isLogin === "" ? null : <Link className="nav-link" to="/addpost">Add Post</Link>}
        </Nav>
        <Nav>
          <Link className="nav-link" to="/login">Log in </Link>
          <Link className="nav-link" to="/register">Register</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )

}