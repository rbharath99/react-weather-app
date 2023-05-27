import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="md">
            <Navbar.Brand>Weather App</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default NavigationBar