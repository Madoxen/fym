import React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export const SideBarProfile: React.FC = () => (
    // <Navbar bg="primary" className="flex-column" variant="dark">
    <Nav variant="pills" defaultActiveKey="/profile" className="flex-column">
        <NavItem>   <Link className="nav-link" to="/profile/edit">Edit</Link> </NavItem>
        <NavItem>   <Link className="nav-link" to="/profile/post">Post</Link> </NavItem>
    </Nav>
    // </Navbar>
)
